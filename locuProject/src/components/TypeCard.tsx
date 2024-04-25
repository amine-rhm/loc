import { ArrowRightIcon } from "@heroicons/react/24/outline";

type card = {
  image: string;
  title: string;
};

const TypeCard = ({ image, title } : card) => {
  return (
    <div className="w-[18vw] max-lg:w-[21vw]  max-sm:w-[70vw]  bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer overflow-clip cards card">
      <img
        className="h-28 rounded-t-md w-full"
        src={`../../public/images/CardImages/${image}`}
        alt="cardImage"
      />
      <div className="flex justify-between items-center px-4 py-2 ">
        <h4 className="font-medium">{title}</h4>
        <ArrowRightIcon className="h-4" />
      </div>
    </div>
  );
};

export default TypeCard;
