import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconActive } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getImageURL } from "../utils/image-url";



type information = {
  image : string,
  title : string,
  description : string,
  ville : string,
  price : number
}
const AddedCards = ({ image, title, ville , description, price } : information) => {
  const [Fav, setFav] = useState<boolean>(false);
  return (
    <div className="w-[260px] max-md:w-[38vw] max-lg:w-[28vw] max-sm:w-[80vw] bg-transparent  rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer cards">
      <img
        className="h-40 max-sm:h-36 rounded-t-md w-full"
        src={getImageURL(image)}
        alt="cardImage"
      />
      <div className=" px-4">
        <div className="flex justify-between items-center mt-1">
          <h4 className="w-[85%] text-nowrap overflow-hidden overflow-ellipsis">
            {title}{" "}
          </h4>
          <span onClick={(e:React.MouseEvent<HTMLSpanElement, MouseEvent>)=>setFav(!Fav)}>
            {!Fav ? (
              <HeartIcon className="text-orange h-6 " />
            ) : (
              <HeartIconActive className="text-orangeActive h-6 " />
            )}
          </span>
        </div>
        <h5 className=" font-medium text-gray-500 mt-1  mb-3"> {ville}</h5>
        <p className="text-xs text-clip h-11 overflow-hidden break-words w-full desc ">
          {description}
        </p>
        <p className="text-sm my-3 font-medium ">
          {price} <span className="text-xs">DA/mois</span>
        </p>
      </div>
    </div>
  );
};

export default AddedCards;
