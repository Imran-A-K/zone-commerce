"use client";
import CartCard from "@/components/CartCard";
import Loader from "@/components/Loader";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Summary } from "@/components/Summary";
import { useGetCart } from "@/lib/actions/actions";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

function Cart() {
  const [cart, cartLoading, reloadCart] = useGetCart();
  const queryClient = useQueryClient();
  console.log("Cart", cart, "cartLoading", cartLoading);
  return (
    <MaxWidthWrapper>
      {cartLoading ? (
        <div className="h-full w-full z-50 flex justify-center items-center pt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <>
            <h1 className="text-3xl font-bold text-black">Order Summary</h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
              {cartLoading ? (
                <Loader />
              ) : (
                <div className="lg:col-span-7">
                  {/* {cart?.length === 0 && (
                <p className="text-neutral-500 text-lg">
                  No items added to cart.
                </p>
              )} */}
                  {cart ? (
                    cart?.items?.length === 0 && (
                      <p className="text-neutral-500 text-lg">
                        No items added to cart.
                      </p>
                    )
                  ) : (
                    <p className="text-neutral-500 text-lg">
                      No items added to cart.
                    </p>
                  )}
                  <ul>
                    {cart?.map((item) => (
                      <CartCard
                        key={item.id}
                        item={item}
                        reloadCart={() =>
                          queryClient.invalidateQueries({
                            queryKey: ["cartData"],
                          })
                        }
                      />
                    ))}
                  </ul>
                </div>
              )}
              {!cartLoading && (
                <Summary
                  cart={cart}
                  reloadCart={() =>
                    queryClient.invalidateQueries({
                      queryKey: ["cartData"],
                    })
                  }
                />
              )}
            </div>
          </>
        </div>
      )}
    </MaxWidthWrapper>
  );
}

export default Cart;
