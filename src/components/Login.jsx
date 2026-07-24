import React, { useState } from "react";
import Modal from "./reuseable/Modal";
import Heading from "./reuseable/Heading";
import Input from "./reuseable/Input";
import Button from "./reuseable/Button";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../store/slice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.data);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/admin/login`, formData);
      dispatch(setAdmin(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal>
      <Heading text="Login" />
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center gap-5 w-full"
      >
        {/* <div className="flex justify-between items-center w-full gap-5">
          <Button
            text="Email"
            type="button"
            className={`w-full ${loginType === "email" ? "bg-(--bg-gold) text-(--text-cream)" : "bg-(--bg-cream) text-(--text-dark-green)"} cursor-pointer`}
            onClick={() => setLoginType("email")}
            analyticsEvent="login_type_email_selected"
          />
          <Button
            text="Phone"
            type="button"
            className={`w-full ${loginType === "phone" ? "bg-(--bg-gold) text-(--text-cream)" : "bg-(--bg-cream) text-(--text-dark-green)"} cursor-pointer`}
            onClick={() => setLoginType("phone")}
            analyticsEvent="login_type_phone_selected"
          />
        </div> */}

        <>
          {/* Email Input */}
          <Input
            label="Email"
            name="email"
            type="text"
            id="email"
            placeholder="Enter your email"
            className={"w-full"}
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password Input */}
          <div className="flex flex-col w-full gap-2">
            <Input
              label="Password"
              name="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              className={"w-full"}
              value={formData.password}
              onChange={handleChange}
            />
            <Link className="w-full text-end hover:underline">
              Forget Password
            </Link>
          </div>
        </>
        {/* <Input
            label="Phone"
            type="text"
            id="phone"
            placeholder="Enter your phone number"
            className={"w-full"}
          /> */}

        <div className="w-full flex flex-col items-start justify-center gap-3">
          <Button text="Login" type="submit" analyticsEvent="login_submitted" />
          <Link
            to="/register"
            className="text-(--text-dark-green) hover:underline"
          >
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </Modal>
  );
};

export default Login;
