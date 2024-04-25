import { Link } from "react-router-dom";
import { PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Li from "../../components/Li";

const Navbar = () => {
  return (
    <div className="bg-white max-lg:px-8 px-16 h-16 flex justify-between items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] max-lg:hidden ">
      <Link to="/">
        <img className=" h-8" src="../../public/images/LOGO.png" alt="LOGO" />
      </Link>

      <ul className="list-none max-lg:hidden flex text-greyLink space-x-20">
        <li>Home</li>
        <Link className="no-underline text-greyLink" to={"/Annonces"}>
        <li>Annonces</li>
        </Link>
        <li>Contact</li>
      </ul>

      <div className="flex  ">
        <Link to="/Auth" className="no-underline">
          <div className="flex flex-col mr-8 text-greyLink ">
            <UserCircleIcon className="h-6" />
            <p className="text-sm">Connexion</p>
          </div>
        </Link>
        <Link to="/Deposerannonce" className="no-underline">
          <div className="flex flex-col text-greyLink">
            <PencilSquareIcon className="h-6" />
            <p className="text-sm">Deposer une annonce</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
