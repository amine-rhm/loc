import React from 'react'
import Navbar from './heroSection/Navbar'
import MobileNav from './heroSection/MobileNav'
import axios from "axios";
import { useQuery } from "react-query";
import AdCard from './ads/AdCard';
import { getImageURL } from '../utils/image-url';
import { useParams } from 'react-router-dom';


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
    } | undefined;
    prix: number;
  };
const Advanced = () => {
    const { ville , budget,type,surface,meuble } = useParams();
    const { data: ads, isLoading } = useQuery({
        queryFn: async () => {
          const { data } = await axios.get(
            `http://localhost:3000/api/v1/avance/recherche?ville=${ville}&prix=${budget}&type=${type}&surface=${surface}&meuble=${meuble}`
          );
          console.log(data.listing)
          return data.listing as Ads[];
        },
        queryKey: ["ads"],
      });
      if (isLoading) {
        <div>Is Loading ...</div>;
      }
  return (
    <div>
        <Navbar/>
        <MobileNav/>
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
  )
}

export default Advanced