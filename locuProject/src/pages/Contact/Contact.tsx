import React from "react";
import Navbar from "../heroSection/Navbar";
import MobileNav from "../heroSection/MobileNav";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const schema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(20),
});

type contactFields = z.infer<typeof schema>;

const Contact = () => {
  const submitMessage: SubmitHandler<contactFields> = (data) => {
    console.log(data);
    reset();
  };
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<contactFields>({
    resolver: zodResolver(schema),
  });
  return (
    <div className="flex flex-col">
      <Navbar />
      <MobileNav />
      <div className="h-28 bg-[url('public/images/ashley-gorringe-1IxQ2rDrxds-unsplash.jpg')] bg-no-repeat bg-cover flex justify-center items-center mb-14">
        <p className="font-bold text-3xl">Contactez nous</p>
      </div>

      <div className="flex justify-center ">
        <section className="bg-greyThree p-8">
          <h3>Besoin d'aide ?</h3>
          <p className="mb-4">
            Nous aimerions connaitre de votre besoin, Prenez contact avec nous!
          </p>
          <form
            className="flex flex-col"
            onSubmit={handleSubmit(submitMessage)}
          >
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm">Nom</label>
                <input {...register("nom")} type="text " className="input" />
                {errors.nom && (
                  <p className="text-greyLink text-sm">{errors.nom.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm">Prenom</label>
                <input
                  {...register("prenom")}
                  type="text  "
                  className="input"
                />
                {errors.prenom && (
                  <p className="text-greyLink text-sm">
                    {errors.prenom.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm">Email</label>
                <input {...register("email")} type="text  " className="input" />
                {errors.email && (
                  <p className="text-greyLink text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm">Message</label>
                <textarea
                  {...register("message")}
                  className="inputpub resize-none w-full h-[175px]"
                />
                {errors.message && (
                  <p className="text-greyLink text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="btn self-end mt-10 px-10 bg-orange text-white"
            >
              {" "}
              Envoyer{" "}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
