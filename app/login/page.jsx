"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetUser, verifyUser } from "@/lib/actions/actions";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import * as Yup from "yup";
import { Button, buttonVariants } from "@/components/ui/button";
import FormError from "@/components/FormError";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const loginSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });
  const [user, userLoading, reloadUser] = useGetUser();

  const initialValues = {
    email: "",
    password: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        const userIntendedDestination = localStorage.getItem(
          "userIntendedDestination"
        );
        toast.promise(verifyUser({ ...values }), {
          loading: "Logging in...",
          success: (data) => {
            reloadUser();
            setTimeout(() => {
              localStorage.removeItem("userIntendedDestination");
              router.push(userIntendedDestination ?? "/");
            }, 300);
            return `Login Successful`;
          },
          error: (error) => {
            const [errorKey] = Object.keys(error);
            return error[errorKey][0];
          },
        });
      },
    });
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen bg-white text-gray-900 flex justify-center font-mono">
        <div className="max-w-screen-xl m-0 sm:m-20 bg-white md:shadow-md md:border-2 border-opacity-50 md:rounded-lg flex flex-row-reverse justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-bold pb-4">
                Welcome back!
              </h1>
              <h2 className="text-xl xl:text-xl text-center font-semibold">
                Please enter your details
              </h2>
              <div className="w-full flex-1 mt-8">
                <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                  <div className="my-2">
                    <Label htmlFor="email" className="text-sm">
                      Email
                    </Label>
                    <Input
                      autoComplete="off"
                      id="email"
                      className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                      type="email"
                      name="email"
                      placeholder="Ex: email@domain.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <FormError ErrorImg={BiError}>{errors.email}</FormError>
                  ) : null}

                  <div className="relative my-5">
                    <Label htmlFor="password" className="text-sm">
                      Password
                    </Label>
                    <Input
                      className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                      type={showPassword === false ? "password" : "text"}
                      placeholder="Please Enter Your Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                      id="password"
                    />
                    <div className="cursor-pointer text-2xl absolute right-3 top-9 z-10 ">
                      {showPassword === false ? (
                        <AiFillEyeInvisible
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <AiFillEye
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  </div>
                  {errors.password && touched.password ? (
                    <FormError ErrorImg={BiError}>{errors.password}</FormError>
                  ) : null}

                  <div className="w-full flex items-center justify-center">
                    <Button
                      type="submit"
                      className={buttonVariants({
                        size: "lg",
                        className: "flex items-center gap-1",
                      })}
                    >
                      <span className="">Login</span>
                    </Button>
                  </div>
                  <p className="mt-6 text-base text-gray-600 text-center font-semibold">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className=" text-black font-bold">
                      Register
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-transparent text-center hidden lg:flex sm:rounded-l-lg">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-[url('/Authentication.jpg')]"></div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default Login;
