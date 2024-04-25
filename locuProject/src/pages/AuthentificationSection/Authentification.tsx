/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../heroSection/Navbar";
import MobileNav from "../heroSection/MobileNav";
import LogIn from "./LogIn";
import SignIn from "./SignIn";

const Authentification = () => {
  const [hasAcc, sethasAcc] = React.useState<boolean>(true);
  return (
    <>
      <Navbar />
      <MobileNav />
      <div className="flex h-screen justify-center items-center">
        <div className=" flex h-[80vh] bg-gray-100 max-sm:m-0 max-sm:w-full w-[80%] rounded-md max-sm:flex-col max-sm:h-screen ">
          <div className=" w-[40%] max-sm:w-full max-sm:h-[30%] rounded-md h-full bg-[url('../../public/images/AuthPageImage.jpg')] bg-cover"></div>
          <section className="flex flex-col justify-center max-sm:mt-9 m-auto w-80 my-4">
            {hasAcc ? <LogIn /> : <SignIn />}
            <p className="py-6 self-center text-sm">
              {hasAcc
                ? "Vous n'avez pas de compte ?  "
                : "Vous avez déja un compte ?  "}
              <span
                className="cursor-pointer text-orange underline "
                onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                  sethasAcc(!hasAcc)
                }
              >
                {" "}
                {hasAcc ? " S'inscrire" : "Se connecter"}
              </span>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Authentification;
