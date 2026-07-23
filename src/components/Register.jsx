import React, { useState } from "react";
import Modal from "./reuseable/Modal";
import Heading from "./reuseable/Heading";
import Input from "./reuseable/Input";
import Button from "./reuseable/Button";
import { Link, useNavigate } from "react-router-dom";
import Textarea from "./reuseable/Textarea";
import axios from "axios";
import { apis } from "../apis";
import { useDispatch } from "react-redux";
import { setAdmin } from "../store/slice";
import { api } from "../axiosInstance";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post(`${apis.baseAdminUrl}register`, formData);
      console.log("This is the admin Data: ", data);
      dispatch(setAdmin(data.newAdmin));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal className={"w-[40vw]"}>
      <Heading text="Register" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-5 w-full"
      >
        <div className="flex justify-between items-center w-full gap-5">
          {/* Name */}
          <Input
            label={"Name"}
            type="text"
            id={"name"}
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className={"w-full"}
          />

          {/* Phone */}
          <Input
            label={"Phone"}
            type="text"
            id={"phone"}
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className={"w-full"}
          />
        </div>

        <div className="flex justify-between items-center gap-5 w-full">
          {/* Email Input */}
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={"w-full"}
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={"w-full"}
          />
        </div>

        {/* <Textarea
          value={formData.address}
          onChange={() => setFormData.address(e)}
        /> */}

        <div className="w-full flex flex-col items-start justify-center gap-3">
          <Button
            text="Register"
            type="submit"
            analyticsEvent="register_submitted"
          />
          <Link
            to="/login"
            className="text-(--text-dark-green) hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </form>
    </Modal>
  );
};

export default Register;
