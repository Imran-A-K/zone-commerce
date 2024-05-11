"use client";

import { useState } from "react";
import question from "@/public/question.svg";
import orderConfirmedImg from "@/public/orderConfirmed.svg";
import Image from "next/image";
import { Button } from "./ui/button";
import { calculateCart } from "@/lib/actions/actions";

export const Summary = ({ cart, reloadCart }) => {
  const { subtotal, totalItem, deliveryCharges, tax, grandTotal } =
    calculateCart(cart);
  const [showModal, setShowModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const handleCheckOut = () => {
    setShowModal(true);
  };
  return (
    <>
      <>
        {showModal ? (
          <>
            <div
              onClick={(event) => {
                event.stopPropagation();
                setShowModal(false);
              }}
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black/20 outline-none focus:outline-none p-2"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {orderConfirmed ? (
                    <div class="">
                      <div class="text-center pt-5 px-5 flex-auto min-w-[300px] justify-center">
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-16 h-16 flex items-center text-red-500 mx-auto"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg> */}
                        <div className=" flex items-center justify-center">
                          <Image
                            src={orderConfirmedImg}
                            alt="orderConfirmed"
                            height={300}
                            width={300}
                            className="h-16 w-16 text-blue-100"
                          />
                        </div>

                        <h2 class="text-xl font-bold pt-4 ">
                          Order Confirmed!
                        </h2>
                        {/* <p class="text-sm text-gray-500 px-8">
                        Do you really want to delete your account? This process
                        cannot be undone
                      </p> */}
                      </div>

                      <div class="p-3 text-center md:block">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            setShowModal(false);
                          }}
                          class="mb-2 md:mb-0 bg-black border px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-blue-600"
                        >
                          Ok
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div class="">
                      <div class="text-center pt-5 px-5 flex-auto min-w-[300px] justify-center">
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-16 h-16 flex items-center text-red-500 mx-auto"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg> */}
                        <div className=" flex items-center justify-center">
                          <Image
                            src={question}
                            alt="question"
                            height={300}
                            width={300}
                            className="h-16 w-16 text-blue-100"
                          />
                        </div>

                        <h2 class="text-xl font-bold pt-4 ">Confirm Order?</h2>
                        {/* <p class="text-sm text-gray-500 px-8">
                        Do you really want to delete your account? This process
                        cannot be undone
                      </p> */}
                      </div>

                      <div class="p-3 text-center space-x-4 md:block">
                        <button
                          onClick={() => setShowModal(false)}
                          class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-lg hover:shadow-lg hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            setOrderConfirmed(true);
                            localStorage.setItem("cart", JSON.stringify([]));
                            reloadCart();
                          }}
                          class="mb-2 md:mb-0 bg-black border px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-blue-600"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
          </>
        ) : null}
      </>
      <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 className="text-xl font-medium text-gray-900">Order summary</h2>
        <div className="mt-6 flex flex-col flex-1 gap-8">
          <div className="border-t border-gray-200 flex flex-col">
            <div className="flex items-center justify-between pt-4">
              <div className="text-base font-medium text-gray-900">
                Price ({totalItem} {totalItem > 1 ? "items" : "item"})
              </div>
              {/* <Currency value={totalPrice} /> */}
              <span className="font-bold">${subtotal}</span>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="text-base font-medium text-gray-900">
                Delivery Charges
              </div>
              {/* <Currency value={totalPrice} /> */}
              <span className="font-bold">${deliveryCharges}</span>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="text-base font-medium text-gray-900">Tax(4%)</div>
              {/* <Currency value={totalPrice} /> */}
              <span className="font-bold">${tax}</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-lg font-semibold text-gray-900">
              Grand total
            </div>
            {/* <Currency value={totalPrice} /> */}
            <span className="font-bold">${grandTotal}</span>
          </div>
        </div>
        <div className="flex flex-1 w-full items-center justify-center">
          <Button
            handleCheckOut={handleCheckOut}
            disabled={cart?.length === 0}
            className="w-full mt-6 max-w-md"
          >
            Confirm Order
          </Button>
        </div>
      </div>
    </>
  );
};
