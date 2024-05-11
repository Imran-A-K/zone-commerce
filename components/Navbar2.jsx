"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import dummyUser from "@/public/dummyUser.png";
import { useGetCart, useGetUser } from "@/lib/actions/actions";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";

const CustomLink = ({ href, title, className = "" }) => {
  const pathName = usePathname();
  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block bg-gray-900
      absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease-in-out duration-300
      ${pathName === href ? "w-full max-md:bg-white" : "w-0"}
      dark:bg-white
       `}
      >
        &nbsp;
      </span>
    </Link>
  );
};
const CustomMobileLink = ({ href, title, className = "", toggle }) => {
  const pathName = usePathname();

  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block bg-gray-900
      absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease-in-out duration-300
      ${pathName === href ? "w-full max-md:bg-white" : "w-0"} 
      dark:bg-white
       `}
      >
        &nbsp;
      </span>
    </Link>
  );
};
function Navbar2({ sideBarIsOpen, setSideBarIsOpen }) {
  // console.log(sideBarIsOpen);
  const [isOpen, setIsOpen] = useState(false);
  // const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  // console.log(isOpen);
  const pathName = usePathname();
  // console.log(pathName !== "/");
  const [cart, cartLoading] = useGetCart();
  const [user, userLoading, reloadUser] = useGetUser();
  // console.log(user);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header
      className={`${
        pathName !== "/" && "bg-blend-lighten border-b-stone-200"
      } border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all flex  items-center place-items-center justify-between w-full max-w-full lg:px-32 md:px-12 px-8 sticky top-0 z-20 font-bold text-xl `}
    >
      <nav className="lg:pl-10 py-2 relative">
        <Link href="/" className="flex z-40 font-semibold text-green-600">
          <Image src="/zcom.png" width={30} height={30} alt="ZoneCommerce" />
          zone<span className="text-black">commerce</span>
        </Link>
      </nav>

      <nav className="flex items-center justify-between gap-x-5">
        <CustomLink href={"/"} title={"Home"} className="max-md:hidden" />
        <CustomLink
          href={"/products"}
          className={buttonVariants({
            size: "sm",
            className: "max-md:hidden md:flex items-center gap-1",
          })}
          title={
            <>
              Products <ArrowRight className="ml-1.5 h-5 w-5" />
            </>
          }
        />
        <Link
          href="/cart"
          className="flex max-lg:hidden items-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {!cartLoading && cart?.length ? (
            <span className="flex absolute -mt-9 ml-4">
              {/* <span className="absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span> */}
              <span
                className={`absolute  rounded-full h-4 w-4 text-white text-xs text-center bg-gray-900 ${
                  cart?.length > 9 && "w-7"
                }`}
              >
                {cart?.length}
              </span>
            </span>
          ) : null}
        </Link>

        <Link
          href="/cart"
          className="lg:hidden flex items-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {!cartLoading && cart?.length ? (
            <span className="flex absolute -mt-9 ml-4">
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
              <span
                className={`absolute  rounded-full h-4 w-4 text-white text-xs text-center bg-gray-900 ${
                  cart?.length > 9 && "w-7"
                }`}
              >
                {cart?.length}
              </span>
            </span>
          ) : null}
        </Link>
        {user && user.email ? (
          <>
            <Image
              src={user.userImage ?? dummyUser}
              height={40}
              width={40}
              alt="current user image"
              className="rounded-full border-2"
              priority
            />
            <Button
              onClick={() => {
                localStorage.removeItem("loggedUser");
                reloadUser();
              }}
              className={buttonVariants({
                size: "sm",
                className: "flex items-center gap-1",
              })}
            >
              Logout
            </Button>
          </>
        ) : (
          <Link className="hidden md:block" href="/login">
            {/* focus:bg-indigo-700 */}
            <Button
              className={buttonVariants({
                size: "sm",
                className: "hidden sm:flex items-center gap-1",
              })}
            >
              Login
            </Button>
          </Link>
        )}

        <button
          className="md:hidden flex flex-col justify-center items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`bg-gray-950 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
          ></span>
          <span
            className={`bg-gray-950 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
              isOpen ? "opacity-0" : "opacity-1"
            }`}
          ></span>
          <span
            className={`bg-gray-950 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            }`}
          ></span>
        </button>
      </nav>
      {isOpen ? (
        <div className="min-w-[70vw] z-30 flex flex-col justify-between items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/90 dark:bg-white/75 rounded-lg backdrop-blur py-32">
          <nav className="flex items-center gap-3 flex-col justify-center">
            <span onClick={() => setIsOpen(!isOpen)}>
              <CustomMobileLink href="/" title="Home" className="text-white" />
            </span>
            <span onClick={() => setIsOpen(!isOpen)}>
              <CustomMobileLink
                href="/products"
                title="Products"
                className="text-white"
              />
            </span>
            {user && user.email ? (
              <>
                <button
                  onClick={() => {
                    localStorage.removeItem("loggedUser");
                    reloadUser();
                    setIsOpen(!isOpen);
                  }}
                  className="cursor-pointer mx-auto bg-transparent hover:bg-gray-700  text-white rounded-lg px-3 py-2 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                onClick={() => setIsOpen(!isOpen)}
                className="hidden md:block"
                href="/login"
              >
                {/* focus:bg-indigo-700 */}
                <button className="block mx-auto bg-black hover:bg-gray-700  text-white rounded-lg px-3 py-2 font-semibold">
                  Login
                </button>
              </Link>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar2;
