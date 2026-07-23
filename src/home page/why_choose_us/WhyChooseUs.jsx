import React from "react";
import Card from "../../components/reuseable/Card";
import CalendarIcon from "../../assets/whyChooseUs/calendar-icon.svg?react";
import DeliveryIcon from "../../assets/whyChooseUs/delivery-icon.svg?react";
import ThemeIcon from "../../assets/whyChooseUs/theme-icon.svg?react";
import Heading from "../../components/reuseable/Heading";

const WhyChooseUs = () => {
  const fields = [
    {
      icon: <CalendarIcon className="h-20 w-25 text-(--text-dark-green)" />,
      title: "Flexible Scheduling",
      description:
        "We understand that your time is valuable. That's why we offer flexible scheduling options to accommodate your busy lifestyle.",
    },
    {
      icon: <DeliveryIcon className="h-20 w-25 text-(--text-dark-green)" />,
      title: "Fast Delivery",
      description:
        "We pride ourselves on our quick and reliable delivery service, ensuring you receive your items in a timely manner.",
    },
    {
      icon: <ThemeIcon className="h-20 w-25 text-(--text-dark-green)" />,
      title: "Unique Themes",
      description:
        "Our unique themes make every experience special and memorable.",
    },
  ];

  return (
    <section className="mt-8 mx-auto flex flex-col gap-3 justify-center items-center">
      <Heading text="Why Choose Us" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        <Card fields={fields} classname="" />
      </div>
    </section>
  );
};

export default WhyChooseUs;
