import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import dummyUser from "@/public/dummyUser.png";

const Navbar3 = async () => {
  const user = false;

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold text-green-600">
            <Image src="/zcom.png" width={30} height={30} alt="ZoneCommerce" />
            zone<span className="text-black">commerce</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                {/* <Link
                  href="/api/auth/logout"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign out
                </Link> */}

                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    <AvatarImage src={dummyUser} />
                  </AvatarFallback>
                </Avatar>

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

                <HoverCard>
                  <HoverCardTrigger>
                    {" "}
                    <Avatar>
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
                  </HoverCardTrigger>
                  <HoverCardContent className="flex flex-col gap-1 w-32">
                    <Link
                      href="/profile"
                      className={buttonVariants({
                        size: "sm",
                        variant: "ghost",
                      })}
                    >
                      Profile
                    </Link>
                    <Button
                      className={buttonVariants({
                        size: "sm",
                        variant: "destructive",
                      })}
                    >
                      Sign out
                    </Button>
                  </HoverCardContent>
                </HoverCard>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar3;
