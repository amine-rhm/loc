import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-greyThree ">
      <section className="py-20  w-full  max-lg:px-8 flex max-sm:py-10 max-sm:pl-8 justify-around max-sm:flex-col ">
        <div className="flex">
          <div>
            <img
              className="h-12 max-md:h-8"
              src="../../../public/images/LOGO.png"
              alt="LOGO"
            />
            <div className="flex flex-col">
              <div className="flex mt-10 mb-4">
                <PhoneIcon className="h-5 items-center " />
                <p className="ml-3 max-md:text-xs">XX XX XX XX </p>
              </div>
              <div className="flex items-center mb-4">
                <EnvelopeIcon className="h-5" />
                <p className="ml-3 max-md:text-xs"> Locu@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="space-y-7 ml-44 max-sm:ml-10 max-md:ml-24 max-lg:ml-16 max-md:text-xs">
            <p>Fonctionnement de la plateforme</p>
            <p>Aide et assistance </p>
            <Link className="no-underline text-inherit " to={"/contactez-nous"}>
              <p className="mt-7">Nous contacter</p>
            </Link>
          </div>
        </div>
        <div className="space-y-4 max-sm:mt-7 max-sm:pl-8 max-sm:w-[40vw] flex flex-col">
          <button className="btn px-6 border-blue border-solid  bg-white">
            Se connecter
          </button>
          <button className="btn px-3 text-white bg-blue border-blue border-solid hover:bg-blueActive ">
            Abonnement
          </button>
        </div>
      </section>
      <div className="flex max-md:flex-col max-md:space-y-3 items-center justify-evenly border-solid py-1 border-2 border-t-greyActive border-w border-x-0 border-b-0 max-md:text-xs">
        <p className="mt-2">© 2024 Locu, Inc.</p>
        <p>A propos</p>
        <p>Conditions générales</p>

        <div className="space-x-4 ">
          <svg
            className="h-7 w-7 text-black stroke-2 cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
          >
            {" "}
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />{" "}
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />{" "}
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <svg
            className="h-8 w-8 text-black  stroke-2 cursor-pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
          </svg>
          <svg
            className="h-7 w-7 text-black  stroke-2 cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
          >
            {" "}
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
