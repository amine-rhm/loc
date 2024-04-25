import { Bars3Icon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const [hamburger, setHamburger] = useState<boolean>(false);

  return (
    <div className="bg-white max-lg:px-8 px-16 h-16 flex items-center justify-between shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] lg:hidden relative ">
      <Link to="/">
        <img
          className=" max-lg:h-7"
          src="../../public/images/LOGO.png"
          alt="LOGO"
        />
      </Link>
      <nav>
        <div
          className="cursor-pointer"
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            setHamburger(!hamburger)
          }
        >
          {hamburger ? (
            <XCircleIcon className="h-9" />
          ) : (
            <Bars3Icon className="h-9" />
          )}
        </div>

        {hamburger && (
          <>
            <section className="px-12 z-20 absolute left-0 top-[101%] w-full h-screen bg-white pt-20 ">
              <ul className="list-none  flex flex-col gap-10 ">
                <li>Home</li>
                <li>Annonces</li>
                <li>Contact</li>
              </ul>

              <div className="mt-14 ">
                <Link to="/Auth">
                  <button className="max-sm:text-sm bg-orange  active:bg-orangeActive border-orange border-solid mr-4 btn text-white">
                    Se connecter
                  </button>
                </Link>
                <Link to="/Deposerannonce">
                  <button className=" max-sm:text-sm max-sm:mt-4 border-orange active:border-orangeActive bg-white border-solid btn">
                    Deposer une annonce
                  </button>
                </Link>
              </div>
            </section>
          </>
        )}
      </nav>
    </div>
  );
};

export default MobileNav;
