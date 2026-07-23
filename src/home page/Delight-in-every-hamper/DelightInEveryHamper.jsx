import React from "react";
import { GiCupcake } from "react-icons/gi";
import { GoVerified } from "react-icons/go";
import { TfiGift } from "react-icons/tfi";
import Heading from "../../components/reuseable/Heading";
import Card from "../../components/reuseable/Card";

const DelightInEveryHamper = () => {
  const fields = [
    {
      icon: <GiCupcake className="h-20 w-25 text-(--text-dark-green)" />,
      title: "Delightful Treats",
      description:
        "Indulge in a delightful assortment of treats that will satisfy your sweet cravings and bring joy to your taste buds.",
    },
    {
      icon: <GoVerified className="h-20 w-25 text-(--text-dark-green)" />,
      title: "Quality Assurance",
      description:
        "We take pride in delivering hampers of the highest quality, ensuring that every item meets our strict standards for freshness and excellence.",
    },
    {
      icon: <TfiGift className="h-20 w-25 text-(--text-dark-green)" />,
      title: "Thoughtful Presentation",
      description:
        "Each hamper is thoughtfully curated and beautifully presented, making it a perfect gift for any occasion.",
    },
  ];

  return (
    <section className="mt-8 mx-auto flex flex-col gap-3 justify-center items-center">
      <Heading text="Delight in Every Hamper" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        <Card fields={fields} classname="" />
      </div>
    </section>
  );
};

export default DelightInEveryHamper;
