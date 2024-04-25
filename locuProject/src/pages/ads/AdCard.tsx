import React, { useState } from "react";
import Navbar from "../heroSection/Navbar";
import MobileNav from "../heroSection/MobileNav";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconActive } from "@heroicons/react/24/solid";
import { string } from "zod";


type AdProps = {
  image: string;
  title: string;
  type: string;
  description: string;
  ville: string;
  price: number;
  surface : number;
  meuble? : number;
  typeR? : string;
};
const Ad = ({ image, title, type, description, ville, price, surface, typeR, meuble }: AdProps) => {
  const [Fav, setFav] = useState<boolean>(false);
  const verif = (val: number | undefined) : string => {
      if (val === 0 ) return " Non meublé -" ;
      if (val === 1) return " Meublé -";
      return ""
  }
  return (
    <div>
      <section className="bg-greyTwo flex  m-14 w-[60vw] rounded-lg">
        <div className="w-[45%] h-[250px]">
          <img src={image} alt="AdImage" className="h-full w-full" />
        </div>

        <div className="my-6 mx-6  w-[55%]">
          <div className="flex justify-between">
            <h4 className=" w-[85%] text-nowrap overflow-hidden overflow-ellipsis">
              {title}
            </h4>
            <span
              className=" cursor-pointer"
              onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                setFav(!Fav)
              }
            >
              {!Fav ? (
                <HeartIcon className="text-orange h-7 " />
              ) : (
                <HeartIconActive className="text-orangeActive h-7 " />
              )}
            </span>
          </div>

          <h4 className="font-medium mb-2"> {type}</h4>

          <p className="font-semibold text-sm mb-2">{surface+" -"} {verif(meuble) }  {typeR} </p>

          <p className="text-xs text-clip h-11 overflow-hidden break-words w-full desc  ">
            {description}
          </p>
          <h4 className=" font-medium text-gray-500 mt-2 mb-2"> {ville}</h4>
          <p className="text-sm mt-3 font-bold float-end">
            {price} <span className="text-xs font-medium">DA/mois</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Ad;
