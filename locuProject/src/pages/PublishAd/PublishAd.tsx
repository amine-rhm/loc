import { useState, useRef } from "react";
import MobileNav from "../heroSection/MobileNav";
import Navbar from "../heroSection/Navbar";
// import PersonalInformations from "../../components/PersonalInformations";
// import AdInformations from "../../components/AdInformations";
import { UserIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FormEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ClipboardDocumentListIcon } from "@heroicons/react/16/solid";
import data from "../../data/Data";
import wilayas from "../../data/Wilayas";

const phoneRegex = new RegExp(/^([0][567])/);

const schema = z
  .object({
    nom: z.string().min(2),
    prenom: z.string().min(2),
    email: z.string().email(),
    numTel: z
      .string()
      .regex(phoneRegex, "Numéro de téléphone invalide !")
      .length(10),
    surface: z.coerce
      .number({
        required_error: "vous devez entrer une surface",
      })
      .gt(9, "Veuillez entrer une surface superieur à 9m2"),
    prix: z.coerce
      .number({ required_error: "vous devez inscrire le prix de votre bien" })
      .gt(7000, "Veuillez inscrire un prix superieur à 7000da"),
    description: z.string().min(100),
    titre: z.string().min(1, "vous devez ajouter un titre pour votre annonce"),
    adresse: z.string().min(1, "vous devez ajouter l'adresse du bien"),
    meuble: z.enum(["oui", "non"], {
      required_error: 'veuillez choisir entre "oui" ou "non"',
    }),
    wilaya: z.string().min(1, "vous devez choisir une wilaya"),
    ville: z.string().min(1, "vous devez choisir une ville"),
  })
  .required();

type FormFields = z.infer<typeof schema>;

const PublishAd = () => {
  const [steps, setSteps] = useState<string>("1");
  const [commune, setCommune] = useState<string>("");
  const [wil, setWil] = useState<string>("");
  let [isOpen, setIsOpen] = useState(false);
  let [isOn, setIsOn] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const myRef = useRef<HTMLDivElement>(null);
  const myRefwil = useRef<HTMLDivElement>(null);

  const handler = (e: MouseEvent) => {
    if (isOpen && !myRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
  const handlerwil = (e: MouseEvent) => {
    if (isOn && !myRefwil.current?.contains(e.target as Node)) {
      setIsOn(false);
    }
  };

  window.addEventListener("mousedown", handler);
  window.addEventListener("mousedown", handlerwil);

  const processForm: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    reset();
  };

  const next = async () => {
    const output = await trigger(["nom", "prenom", "email", "numTel"]);

    if (!output) return;
    console.log("pepejjhjpep");
    if (steps === "1") {
      console.log("pepepep");
      setSteps("2");
    } else {
      await handleSubmit(processForm);
    }
  };

  return (
    <div>
      <Navbar />
      <MobileNav />
      <div className="px-24 max-lg:px-4 my-10">
        <h2>Publier votre annonce immobilière</h2>
        <div className="flex max-lg:flex-col my-5 ">
          <div className="bg-grey max-md:px-4 max-lg:px-8 max-md:py-2 px-10 py-5">
            <img
              src="../../../public/images/LOGO.png"
              alt="logo"
              className="h-10  max-md:h-8 2xl:mb-12 my-8"
            />

            <h4>{steps == "1" ? "Etape 1" : "Etape 2"}</h4>
            <p className="text-greytext mt-3 lg:w-56 max-md:mb-6 mb-12">
              {steps == "1"
                ? "Saisissez vos informations personnelles pour aider les clients à vous contacter."
                : "Saisissez les informations de votre bien pour viser le publique concerné "}
            </p>
            <div className="lg:space-y-12 max-lg:flex max-md:mb-3 ">
              <div
                className={`flex items-center w-44 text-sm ${steps == "1" ? " text-black" : " text-greytext"} `}
              >
                <p className="max-lg:hidden">
                  Les informations du propriétaire
                </p>
                <div
                  className={`h-10 w-10 flex items-center justify-center border-none ${steps == "1" ? "bg-blue  text-white" : " bg-greysec text-black"} border-solid rounded-full p-5 link relative `}
                >
                  <span> 1 </span>
                </div>
              </div>
              <div
                className={`flex items-center w-44 text-sm ${steps == "2" ? " text-black" : " text-greytext"} `}
              >
                <p className="max-lg:hidden">Les informations sur le bien</p>
                <div
                  className={`h-10 w-10 flex items-center justify-center border-none ${steps == "2" ? "bg-blue  text-white" : " bg-greysec text-black"} rounded-full p-5  `}
                >
                  <span> 2 </span>
                </div>
              </div>
            </div>
          </div>
          <section className="px-8 max-md:px-4 max-lg:px-8 py-12 max-md:py-7 bg-greyTwo space-y-3">
            <form
              className=" w-[50vw] max-lg:w-full m-auto flex flex-col pt-6"
              action=""
              onSubmit={handleSubmit(processForm)}
            >
              {steps === "1" && (
                <div>
                  <UserIcon className="h-10 w-fit border-grey bg-greyLink border-solid rounded-full p-1 text-white" />
                  <h3>Vos informations personnelles.</h3>
                  <p className="text-greytext text-sm">Champs obligatoires *</p>

                  <div className="grid grid-cols-2 max-sm:grid-cols-1 grid-rows-2 gap-6 mt-6">
                    <div>
                      <input
                        {...register("nom")}
                        type="text"
                        className="inputpub w-full"
                        placeholder="Nom *"
                      />
                      {errors.nom && (
                        <p className="text-gray-400 text-sm">
                          {"Le nom doit au moin contenir 2 caractéres"}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("prenom")}
                        type="text"
                        className="inputpub w-full"
                        placeholder="Prenom *"
                      />
                      {errors.prenom && (
                        <p className="text-gray-400 text-sm">
                          {"Le prenom doit au moin contenir 2 caractéres"}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("email") }
                        type="email"
                        className="inputpub w-full"
                        placeholder="Email *"
                      />
                      {errors.email && (
                        <p className="text-gray-400 text-sm">
                          {"Email invalide !"}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("numTel")}
                        type="tel"
                        className="inputpub w-full"
                        placeholder="Numéro de téléphone *"
                      />
                      {errors.numTel && (
                        <p className="text-gray-400 text-sm">
                          {errors.numTel.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {steps === "2" && (
                <div>
                  <ClipboardDocumentListIcon className="h-10 w-fit border-grey bg-greyLink border-solid rounded-full p-1 text-white" />
                  <h3>Les informations de votre bien.</h3>
                  <p className="text-greytext text-sm">Champs obligatoires *</p>
                  <div className=" w-[50vw] max-lg:w-[80vw]  m-auto flex flex-col pt-6  space-y-7">
                    <div className=" flex max-sm:flex-col max-sm:space-y-6 justify-between items-start">
                      <div className=" w-[30%]  max-md:w-[35%] lg:w-[25%]  max-sm:w-full">
                        <select
                          defaultValue={"DEFAULT"}
                          className="input w-full"
                        >
                          <option value="DEFAULT" disabled>
                            Type du bien *
                          </option>
                          <option>Residentiel</option>
                          <option>Commercial</option>
                          <option>Terrain</option>
                          <option>Stock</option>
                        </select>
                      </div>
                      <div className="relative  w-[35%] max-md:w-[30%] max-sm:w-full">
                        <input
                          {...register("surface")}
                          type="text"
                          className="inputpub w-full"
                          placeholder="Surface *"
                        />

                        <span className="absolute right-3 top-3 text-xs text-gray-600 font-medium">
                          m&sup2;
                        </span>
                        {errors.surface && (
                          <p className="text-gray-400 text-sm">
                            {errors.surface.message}
                          </p>
                        )}
                      </div>
                      <div className="relative w-[35%] max-md:w-[30%] max-sm:w-full">
                        <input
                          {...register("prix")}
                          className="inputpub relative max-md:w-[100%] w-full  pr-8 text-sm"
                          type="text"
                          placeholder="Prix *"
                        />
                        <span className="absolute right-3 top-3 text-xs text-gray-600 font-medium">
                          DA
                        </span>
                        {errors.prix && (
                          <p className="text-gray-400 text-sm">
                            {errors.prix.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-3 max-sm:flex-col ">
                      <div className=" flex">
                        <label htmlFor="meuble" className="mr-3">Meublé *</label>
                        <div>
                          <input
                            type="radio"
                            value={"oui"}
                            {...register("meuble",{ required: true }) }
                            name="meuble"
                          />
                          <label className="px-2">Oui</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            value={"non"}
                            {...register("meuble",{ required: true })}
                            name="meuble"
                          />
                          <label className="px-2">Non</label>
                        </div>
                      </div>
                      {errors.meuble && (
                        <p className="text-gray-400 text-sm">
                          {"Veuillez choisir entre 'oui' ou 'non'"}
                        </p>
                      )}
                    </div>

                    <div>
                      <textarea
                        {...register("description")}
                        className="inputpub resize-none w-full h-[175px]"
                        placeholder="Description de votre bien *"
                      />
                      {errors.description && (
                        <p className="text-gray-400 text-sm">
                          {
                            "Veuillez ajouter une description pour votre annonce"
                          }
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        {...register("titre")}
                        className="inputpub w-full"
                        type="text"
                        placeholder="Titre pour votre annonce *"
                      />
                      {errors.titre && (
                        <p className="text-gray-400 text-sm">
                          {"Veuillez ajouter un titre à votre annonce"}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        {...register("adresse")}
                        className="inputpub w-full"
                        type="text"
                        placeholder="Adresse *"
                      />
                      {errors.adresse && (
                        <p className="text-gray-400 text-sm">
                          {"Veuillez saisir l'adresse de votre bien"}
                        </p>
                      )}
                    </div>
                    <div className="flex max-xl:flex-col max-xl:space-y-6 justify-between ">
                      <div className="relative" ref={myRefwil}>
                        <input
                          {...register("ville",{ required: true })}
                          className="text-base input w-[300px] max-xl:w-[100%] "
                          type="text"
                          placeholder="Ville"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setCommune(e.currentTarget.value)
                          }
                          onClick={() => setIsOn((isOn) => !isOn)}
                          value={commune}
                        />
                        {errors.ville && (
                        <p className="text-gray-400 text-sm">
                          {"Veuillez saisir la ville ou se trouve votre bien"}
                        </p>
                      )}
                        {isOn && (
                          <div
                            className=" absolute z-10 top-[85%] w-[300px]"
                            role="listbox"
                          >
                            {data
                              .filter((city) => {
                                return (
                                  commune &&
                                  city.nom.toLowerCase().startsWith(commune)
                                );
                              })
                              .slice(0, 8)
                              .map((city) => (
                                <div
                                  className=" cursor-pointer hover:bg-gray-200 input rounded-none first-of-type:rounded-t-md last-of-type:rounded-b-md "
                                  key={city.id}
                                  onClick={() => setCommune(city.nom)}
                                >
                                  {city.nom}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                      <div className="relative" ref={myRef}>
                        <input
                          {...register("wilaya" ,{ required: true })}
                          className="text-base input w-[300px] max-xl:w-[100%] "
                          type="text"
                          placeholder="Wilaya"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setWil(e.currentTarget.value)
                          }
                          onClick={() => setIsOpen((isOpen) => !isOpen)}
                          value={wil}
                        />
                        {errors.ville && (
                        <p className="text-gray-400 text-sm">
                          {"Veuillez saisir la wilaya ou se trouve votre bien"}
                        </p>
                      )}
                        {isOpen && (
                          <div
                            className=" absolute z-10 top-[85%] w-[300px]"
                            role="listbox"
                          >
                            {wilayas
                              .filter((wilaya) => {
                                return (
                                  wil &&
                                  wilaya.nom.toLowerCase().startsWith(wil)
                                );
                              })
                              .slice(0, 8)
                              .map((wilaya) => (
                                <div
                                  className=" cursor-pointer hover:bg-gray-200 input rounded-none first-of-type:rounded-t-md last-of-type:rounded-b-md "
                                  key={wilaya.id}
                                  onClick={() => setWil(wilaya.nom)}
                                >
                                  {wilaya.nom}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="images *">
                        Insérez des images de votre bien
                      </label>
                      <input type="file" accept="image/*" />
                    </div>
                  </div>
                </div>
              )}

              <div>
                {steps === "2" && (
                  <button
                    className="btn px-10 py-2 mr-5"
                    onClick={(
                      _e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => setSteps("1")}
                  >
                    Retour
                  </button>
                )}

                <button
                  className="btn mt-10 self-end px-10 py-2 bg-orange text-white"
                  onClick={next}
                >
                  {steps === "1" ? "Suivant" : "Envoyer"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PublishAd;
