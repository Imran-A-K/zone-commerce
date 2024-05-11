"use client";
import ImageUpload from "@/components/ImageUpload";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import dummyUser from "@/public/dummyUser.png";
import Image from "next/image";
import FormError from "@/components/FormError";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import { registerUser, useGetUser } from "@/lib/actions/actions";
import { useQueryClient } from "@tanstack/react-query";

const signUpSchema = Yup.object({
  firstName: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter your first name"),
  lastName: Yup.string().min(2).max(25).required("Please enter your last name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Please enter your password")
    .test(
      "has-uppercase",
      "Password must contain at least one uppercase letter",
      (value) => /[A-Z]/.test(value)
    )
    .test(
      "has-special-characters",
      "Password must contain at least one special character",
      (value) => /[!@#$%^&*()_+{}\[\]:;<>,.?\/~]/.test(value)
    ),
  // password: Yup.string().min(6).required("Please enter your password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(dummyUser);
  const [userSelectedImage, setUserSelectedImage] = useState();
  const [user, userLoading, reloadUser] = useGetUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        const userIntendedDestination = localStorage.getItem(
          "userIntendedDestination"
        );
        toast.promise(
          registerUser({ ...values, userImage: userSelectedImage }),
          {
            loading: "Registering User...",
            success: (data) => {
              queryClient.invalidateQueries({});
              setTimeout(() => {
                localStorage.removeItem("userIntendedDestination");
                router.push(userIntendedDestination ?? "/");
              }, 1000);
              return `User registration successful`;
            },
            error: (error) => {
              const [errorKey] = Object.keys(error);
              return error[errorKey][0];
            },
          }
        );

        // router.push("/login");

        // setSelectedImage(dummyUser);
        // setUserSelectedImage("");
        // action.resetForm();
      },
    });
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // console.log(file.name);

    setUserSelectedImage(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };
  // console.log(errors);
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen bg-white text-gray-900 flex justify-center font-mono">
        <div className="max-w-screen-xl m-0 sm:m-20 bg-white md:shadow-md md:border-2 border-opacity-50 md:rounded-lg flex flex-row-reverse justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              {/* <h1 className="text-2xl xl:text-3xl font-bold pb-4">Welcome!</h1> */}
              <h2 className="text-xl xl:text-xl text-center font-semibold">
                Sign Up
              </h2>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center mb-4">
                  <Image
                    src={selectedImage}
                    height={100}
                    width={100}
                    alt="user image"
                    className="h-24 w-24 border-2 rounded-full"
                  />
                </div>
                <form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="mx-auto max-w-xs"
                >
                  <div className="my-2">
                    <Label htmlFor="FirstName" className="text-sm">
                      First Name
                    </Label>
                    <Input
                      autoComplete="off"
                      id="FirstName"
                      className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                      type="text"
                      name="firstName"
                      placeholder="Ex: Imran"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.firstName && touched.firstName ? (
                    <FormError ErrorImg={BiError}>{errors.firstName}</FormError>
                  ) : null}
                  <div className="my-2">
                    <Label htmlFor="LastName" className="text-sm">
                      Last Name
                    </Label>
                    <Input
                      autoComplete="off"
                      id="LastName"
                      className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                      type="text"
                      name="lastName"
                      placeholder="Ex: Khan"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.lastName && touched.lastName ? (
                    <FormError ErrorImg={BiError}>{errors.lastName}</FormError>
                  ) : null}

                  <div className="my-2">
                    <Label htmlFor="Email" className="text-sm">
                      Email
                    </Label>
                    <Input
                      autoComplete="off"
                      id="Email"
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
                    <div className="cursor-pointer text-2xl absolute right-3 top-8 z-10 ">
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

                  <div className="relative my-5">
                    <Label htmlFor="showPassword" className="text-sm">
                      Confirm Password
                    </Label>
                    <Input
                      className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-green-400 focus:bg-white"
                      type={showPassConfirm === false ? "password" : "text"}
                      placeholder="Confirm Your Password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="confirm_password"
                      id="showPassword"
                    />
                    <div className="cursor-pointer text-2xl absolute right-3 top-8 z-10 ">
                      {showPassConfirm === false ? (
                        <AiFillEyeInvisible
                          onClick={() => setShowPassConfirm(!showPassConfirm)}
                        />
                      ) : (
                        <AiFillEye
                          onClick={() => setShowPassConfirm(!showPassConfirm)}
                        />
                      )}
                    </div>
                  </div>
                  {errors.confirm_password && touched.confirm_password ? (
                    <FormError ErrorImg={BiError}>
                      {errors.confirm_password}
                    </FormError>
                  ) : null}
                  <ImageUpload
                    ComponentId={"uploadedImage"}
                    labelTitle={"Please Select an Image"}
                    placeHolder={"Please Upload an image"}
                    type={"file"}
                    handleImageChange={handleImageChange}
                  />

                  <div className="w-full flex items-center justify-center">
                    <Button
                      type="submit"
                      className={buttonVariants({
                        size: "lg",
                        className: "flex items-center gap-1",
                      })}
                    >
                      <span className="">Register</span>
                    </Button>
                  </div>
                  <p className="mt-6 text-base text-gray-600 text-center font-semibold">
                    Already have an account?{" "}
                    <Link href="/login" className=" text-black font-bold">
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-transparent text-center hidden lg:flex sm:rounded-l-lg">
            <div className="m-12 xl:m-16 w-full bg-auto bg-center bg-no-repeat bg-[url('/Authentication.jpg')]"></div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default Register;
