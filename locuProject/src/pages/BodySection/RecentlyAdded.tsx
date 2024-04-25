import AddedCards from "../../components/AddedCard";
import axios from "axios";
import { useQuery } from "react-query";

type Cards = {
  idann : string,
  image1: string,
    titre: string,
    ville: string,
    description: string,
    prix: number
};

const RecentlyAdded = () => {
   
  const { data: cards, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/recement/annonces"
      );
      return data.annonces as Cards[];
    },
    queryKey: ["cards"],
  });

  if (isLoading) {
    <div>Is Loading ...</div>;
  }
  return (
    <div className=" max-md:px-4 md:px-10 my-14">
      <h2 className="mb-12 relative w-fit title">Ajoutées récemment</h2>
      <section className="grid  max-sm:grid-cols-1 max-md:grid-cols-2 max-xl:grid-cols-3 grid-cols-4 gap-8 justify-items-center">
        {cards?.map((card) => {
          return (
            <AddedCards
              key={card.idann}
              image={card.image1}
              title={card.titre}
              ville={card.ville}
              description={card.description}
              price={card.prix}
            />
          );
        })}
        {/* <AddedCards
          image="CardApp.jpg"
          title="Residentiel type F1 2chambres et cuisine"
          address="Nairobi"
          description="Découvrez l'utilité d'un espace dédié à vos besoins de stockage. Solution idéale pour entrepoasdas asdsa dasdas d asds ad ser vos biens en toute sécurité."
          price={20000}
        />
        <AddedCards
          image="CardApp.jpg"
          title="Residentiel type F1 2chambres et cuisine"
          address="Nairobi"
          description="Découvrez l'utilité d'un espace dédié à vos besoins de stockage. Solution idéale pour entreposer vos biens en toute sécurité."
          price={20000}
        />
        <AddedCards
          image="CardApp.jpg"
          title="Residentiel type F1 2chambres et cuisine"
          address="Nairobi"
          description="Découvrez l'utilité d'un espace dédié à vos besoins de stockage. Solution idéale pour entreposer vos biens en toute sécurité."
          price={20000}
        />
        <AddedCards
          image="CardApp.jpg"
          title="Residentiel type F1 2chambres et cuisine"
          address="Nairobi"
          description="Découvrez l'utilité d'un espace dédié à vos besoins de stockage. Solution idéale pour entreposer vos biens en toute sécurité."
          price={20000}
        />
        <AddedCards
          image="CardApp.jpg"
          title="Residentiel type F1 2chambres et cuisine"
          address="Nairobi"
          description="Découvrez l'utilité d'un espace dédié à vos besoins de stockage. Solution idéale pour entreposer vos biens en toute sécurité."
          price={20000}
        />
        <AddedCards
          image="CardApp.jpg"
          title="Residentiel type F1 2chambres et cuisine"
          address="Nairobi"
          description="Découvrez l'utilité d'un espace dédié à vos besoins de stockage. Solution idéale pour entreposer vos biens en toute sécurité."
          price={20000}
        />
        <AddedCards
          image="CardApp.jpg"
          title="Residentiel type F1 2chambres et cuisine"
          address="Nairobi"
          description="Découvrez l'utilité d'un espace dédié à vos besoins de stockage. Solution idéale pour entreposer vos biens en toute sécurité."
          price={20000}
        />
        <AddedCards
          image="CardApp.jpg"
          title="Residentiel type F1 2chambres et cuisine"
          address="Nairobi"
          description="Découvrez l'utilité d'un espace dédié à vos besoins de stockage. Solution idéale pour entreposer vos biens en toute sécurité."
          price={20000}
        />
        <AddedCards
          image="CardApp.jpg"
          title="Residentiel type F1 2chambres et cuisine"
          address="Nairobi"
          description="Découvrez l'utilité d'un espace dédié à vos besoins de stockage. Solution idéale pour entreposer vos biens en toute sécurité."
          price={20000}
        />
        <AddedCards
          image="CardApp.jpg"
          title="Residentiel type F1 2chambres et cuisine"
          address="Nairobi"
          description="Découvrez l'utilité d'un espace dédié à vos besoins de stockage. Solution idéale pour entreposer vos biens en toute sécurité."
          price={20000}
        />
        <AddedCards
          image="CardApp.jpg"
          title="Residentiel type F1 2chambres et cuisine"
          address="Nairobi"
          description="Découvrez l'utilité d'un espace dédié à vos besoins de stockage. Solution idéale pour entreposer vos biens en toute sécurité."
          price={20000}
        />
        <AddedCards
          image="CardApp.jpg"
          title="Residentiel type F1 2chambres et cuisine"
          address="Nairobi"
          description="Découvrez l'utilité d'un espace dédié à vos besoins de stockage. Solution idéale pour entreposer vos biens en toute sécurité."
          price={20000}
        /> */}
      </section>
    </div>
  );
};

export default RecentlyAdded;
