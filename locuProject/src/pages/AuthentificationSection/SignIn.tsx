import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation } from "react-query";

import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import useSignIn from "react-auth-kit/hooks/useSignIn";
type dataProps = {
  username: string;
  email: string;
  password: string;
};
const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});
type FormFields = z.infer<typeof schema>;
const SignIn = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const signIn = useSignIn();
  const onSubmit: SubmitHandler<FormFields> = async (data: dataProps) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/register",
        data
      );

      signIn({
        auth: {
          token: response.data.token,
          type: "Bearer",
        },
        userState: {
          email: data.email,
        },
      });
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  return (
    <div className="flex flex-col max-sm:gap-6 gap-4 mx-4">
      <h1 className="font-title text-3xl mt-5 ">Bienvenue </h1>
      <p>Nous sommes heureux de vous accueillir parmi nous</p>
      <div>
        <form
          className="flex flex-col gap-3  "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="p-0 m-0 relative">
            <input
              {...register("username")}
              type="text"
              className="input w-full bg-white pl-9"
              placeholder="Username"
            />
            <UserIcon className=" absolute h-4 w-4 top-3 left-3" />
            {errors.username && (
              <p className="text-gray-400 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="p-0 m-0 relative">
            <input
              {...register("email")}
              type="text"
              className="input w-full bg-white pl-9"
              placeholder="Email"
            />
            <EnvelopeIcon className="absolute h-4 w-4 top-3 left-3" />
            {errors.email && (
              <p className="text-gray-400 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="p-0 m-0 relative">
            <input
              {...register("password")}
              className="input w-full bg-white pl-9 "
              type="password"
              placeholder="Password"
            />
            <LockClosedIcon className=" absolute h-4 w-4 top-3 left-3" />
            {errors.password && (
              <p className="text-gray-400 text-sm ">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            disabled={isSubmitting}
            className="btn text-base bg-blue active:bg-blueActive text-white"
            type="submit"
          >
            {isSubmitting ? "Loading..." : "S'inscrire"}
          </button>
          {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
