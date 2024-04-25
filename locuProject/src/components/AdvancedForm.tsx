/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useRef } from "react";
import data from "../data/Data";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

type props = {
  ChangeState: (prop: boolean) => void;
};

const validCities = () => {
  const arr: string[] = [];
  data.map((city) => {
    arr.push(city.nom);
  });
  return arr;
};

const schema = z
  .object({
    ville: z.string().refine((value) => {
      const cities = validCities(); // Your list of cities
      return cities.includes(value);
    }),
    budget: z.coerce.number().nullable(),
    surface: z.coerce.number().gte(9).nullable(),
    meuble: z.boolean(),
    type: z.string().min( 1 )
  })
  .required();
  type FormFields = z.infer<typeof schema>;
const AdvancedForm = ({ ChangeState }: props) => {
  const [Simple, setSimple] = useState(true);
  const [value, setValue] = useState<string>("");
  const [budget, setBudget] = useState("");
  const [type, setType] = useState<string>("");
  const [surface, setSurface] = useState("");
  const [meuble, setMeuble] = useState("");
  const [isOn, setIsOn] = useState<boolean>(false);

  const myRefwil = useRef<HTMLDivElement>(null);
  const handlerwil = (e: MouseEvent) => {
    if (isOn && !myRefwil.current?.contains(e.target as Node)) {
      setIsOn(false);
    }
  };
  window.addEventListener("mousedown", handlerwil);
  const navigate = useNavigate();

  const processForm: SubmitHandler<FormFields> = async (data) => {
    // Trigger validation before form submission
    const isValid = await trigger();

    // If form data is valid, proceed with form submission
    if (isValid) {
      console.log(data);
      navigate(`/Villes/${value}/${budget}/${type}/${surface}/${meuble}`);

      reset();
    }
  }
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    
   resolver: zodResolver(schema),
  });
  return (
    <div className=" flex flex-col bg-white p-8 mt-6 max-lg:w-[85vw] w-[600px] rounded-lg	">
      <form onSubmit={handleSubmit(processForm)}>
        <section className="flex w-[100%] justify-between  flex-wrap max-lg:gap-3 gap-7 mb-6">
          <div
            className="relative w-[350px] max-md:w-[330px] max-lg:w-[420px]"
            ref={myRefwil}
          >
            <input
              {...register("ville")}
              className="text-base input w-full max-md:w-[100%] "
              type="text"
              placeholder="Recherchez une ville"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.currentTarget.value)
              }
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                setIsOn(!isOn)
              }
              value={value}
            />
            {errors.ville && (
              <p className="text-gray-400 text-sm pt-1">
                {"Veuillez choisir une ville parmi celles proposées"}
              </p>
            )}

            {isOn && (
              <div className="absolute z-10 top-[85%] w-[100%]">
                {data
                  .filter((city) => {
                    return value && city.nom.toLowerCase().startsWith(value);
                  })
                  .slice(0, 8)
                  .map((city) => (
                    <div
                      className=" cursor-pointer hover:bg-gray-200 input rounded-none first-of-type:rounded-t-md last-of-type:rounded-b-md "
                      key={city.id}
                      onClick={(
                        e: React.MouseEvent<HTMLDivElement, MouseEvent>
                      ) => setValue(city.nom)}
                    >
                      {city.nom}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="relative max-sm:w-[48%] max-md:w-[30%]">
            <input
              {...register("budget")}
              className="input relative max-md:w-[100%] w-[150px]  pr-8 text-sm"
              type="text"
              placeholder="Budget Max"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBudget(e.currentTarget.value)}
            />
            {errors.budget && (
              <p className="text-gray-400 text-sm pt-1">
                {errors.budget.message}
              </p>
            )}
            <span className="absolute right-3 top-3 text-xs text-gray-600 font-medium">
              DA
            </span>
          </div>
          <select
            defaultValue={"Type du bien"}
            className=" max-md:w-[40%] max-sm:w-[45%] w-40 input pr-1"
            {...register("type")}
            onClick={(e: React.MouseEvent<HTMLSelectElement>) =>
              setType(e.currentTarget.value)}
          >
            <option value="Type du bien" disabled hidden>
              Type du bien
            </option>
            <option>Résidentiel</option>
            <option>Commercial</option>
            <option>Terrain</option>
            <option>Industriel</option>
            
          </select>
          {errors.type && (
              <p className="text-gray-400 text-sm pt-1">
                {errors.type.message}
              </p>
            )}
          <div className="relative max-sm:w-[48%] xl:w-[40%] max-lg:w-[45%] max-md:w-[32%]">
            <input
              {...register("surface")}
              type="text"
              className="input w-[100%]"
              placeholder="Surface"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSurface(e.currentTarget.value)}
            />
            <span className="absolute right-3 top-3 text-xs text-gray-600 font-medium">
              m&sup2;
            </span>
            {errors.surface && (
              <p className="text-gray-400 text-sm pt-1">
                {"La surface minimale est 9m"}
              </p>
            )}
          </div>
          <div className="input flex max-sm:w-[45%] items-center">
            <input type="checkbox" {...register("meuble")} defaultChecked
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMeuble(e.currentTarget.value)}
          />
            <label className="ml-3 text-sm" htmlFor="checkbox">
              {" "}
              meublé
            </label>
          </div>
          {errors.meuble && (
              <p className="text-gray-400 text-sm pt-1">
                {errors.meuble.message}
              </p>
            )}
        </section>
        <a
        className="float-end text-greyLink  text-sm underline cursor-pointer max-sm:text-xs"
        onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
          ChangeState(Simple)
        }
      >
        {" "}
        Recherche simple ^{" "}
      </a>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn w-fit mt-3 px-10 max-sm:px-6  py-3 border-none  bg-blue active:bg-blueActive text-white"
      >
        {isSubmitting? "Attendez... " : "Rechercher"}
      </button>
      </form>
      
    </div>
  );
};

export default AdvancedForm;
