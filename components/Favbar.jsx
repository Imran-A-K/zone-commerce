"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import { getCart, useGetCart, useGetUser } from "@/lib/actions/actions";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import dummyUser from "@/public/dummyUser.png";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Favbar = () => {
  const [user, userLoading, reloadUser] = useGetUser();
  const [isOpen, setIsOpen] = useState(false);
  console.log("ccccc", user, !!user);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const {
    data: cart = [],
    refetch: reloadCart,
    isLoading: cartLoading,
  } = useQuery({
    queryKey: ["cartData"],
    queryFn: async () => getCart(),
  });
  console.log(cart);
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold text-green-600">
            <Image src="/zcom.png" width={30} height={30} alt="ZoneCommerce" />
            zone<span className="text-black">commerce</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user?.user_id ? (
              <>
                <HoverCard openDelay={0}>
                  <HoverCardTrigger asChild>
                    <button>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={dummyUser} />
                        <AvatarFallback>
                          <Image
                            src={dummyUser}
                            height={100}
                            width={100}
                            alt="fall-back-user-image"
                          />
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex flex-col gap-1 w-32">
                    <Link
                      href="/user-profile"
                      className={buttonVariants({
                        size: "sm",
                        variant: "ghost",
                      })}
                    >
                      Profile
                    </Link>
                    <Button
                      onClick={() => {
                        localStorage.removeItem("loggedUser");
                        reloadUser();
                      }}
                      className={buttonVariants({
                        size: "sm",
                        variant: "destructive",
                      })}
                    >
                      Sign out
                    </Button>
                  </HoverCardContent>
                </HoverCard>
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
                {isOpen ? (
                  <div className="min-w-[70vw] text-white z-30 flex flex-col justify-between items-center fixed top-full left-1/2 -translate-x-1/2 bg-gray-900/90 dark:bg-white/75 rounded-lg backdrop-blur py-32">
                    <nav className="flex items-center gap-3 flex-col justify-center">
                      <span onClick={() => setIsOpen(!isOpen)}>
                        <Link
                          href="/"
                          className={buttonVariants({
                            size: "sm",
                            variant: "ghost",
                            className: "text-[20px]",
                          })}
                        >
                          Home
                        </Link>
                      </span>
                      <span onClick={() => setIsOpen(!isOpen)}>
                        <Link
                          href="/products"
                          className={buttonVariants({
                            size: "sm",
                            variant: "ghost",
                            className: "text-[20px]",
                          })}
                        >
                          Products
                        </Link>
                      </span>
                      <span onClick={() => setIsOpen(!isOpen)}>
                        <Link
                          href="/cart"
                          className={buttonVariants({
                            size: "sm",
                            variant: "ghost",
                            className: "text-[20px]",
                          })}
                        >
                          Cart
                        </Link>
                      </span>
                    </nav>
                  </div>
                ) : null}

                <Link
                  href={"/cart"}
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "hidden md:flex items-center gap-1",
                  })}
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
                  {!cartLoading && cart?.items?.length ? (
                    <span className="flex absolute -mt-9 ml-4">
                      {/* <span className="absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span> */}
                      <span
                        className={`absolute  rounded-full h-4 w-4 text-white text-xs text-center bg-gray-900 ${
                          cart.length > 9 && "w-7"
                        }`}
                      >
                        {cart?.items?.length}
                      </span>
                    </span>
                  ) : null}
                </Link>
                <Link
                  href="/products"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Products
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign up
                </Link>

                <Link
                  href="/login"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                <Link
                  href="/products"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Products
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Favbar;
