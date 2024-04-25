import React from "react";
import MobileNav from "../heroSection/MobileNav";
import Navbar from "../heroSection/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import AdCard from "./AdCard";
import { getImageURL } from "../../utils/image-url";

type Ads = {
  idann: string;
  image1: string;
  titre: string;
  ville: string;
  description: string;
  surface: number;
  type: string;
  selected_data? :{
    meuble?: number ;
    type_residence?: string ;
  } ;
  prix: number;
};

const Ad = () => {
  const { data: ads, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/info/pr/annonce"
      );
      console.log(data.annonces)
      return data as Ads[];
    },
    queryKey: ["ads"],
  });

  if (isLoading) {
    <div>Is Loading ...</div>;
  }
  return (
    <div>
      <Navbar />
      <MobileNav />

      {ads?.map((ad) => {
        return (
          <AdCard
            key={ad.idann}
            image={getImageURL(ad.image1)}
            title={ad.titre}
            description={ad.description}
            type={ad.type}
            surface={ad.surface}
            meuble={ad.selected_data?.meuble}
            typeR={ad.selected_data?.type_residence}
            price={ad.prix}
            ville={ad.ville}
          />
        );
      })}
    </div>
  );
};

export default Ad;
