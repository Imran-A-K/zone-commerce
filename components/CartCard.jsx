import React from "react";
import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";
import Image from "next/image";
import { deleteCartItem, updateCartItemQuantity } from "@/lib/actions/actions";

function CartCard({ item, reloadCart }) {
  const {
    title,
    brand,
    quantity,
    price,
    images,
    category,
    discountPercentage,
    id,
  } = item;

  // console.log(reloadCart);
  const handleCartUpdate = (itemId, increment) => {
    updateCartItemQuantity(itemId, increment);
    reloadCart();
  };
  return (
    <>
      <li className="flex py-6 border-b">
        <div className="relative flex flex-col gap-2 h-24 w-24 rounded-md overflow-hidden sm:h-28 sm:w-28">
          <Image
            width={300}
            height={300}
            src={
              //   images[0] ||
              "https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
            }
            alt={`${title} + ${brand}`}
            className="h-full w-full  object-center rounded-b-md object-fill"
          />
          {/* <div className="flex z-10 justify-center">
            <svg
              className={`fill-current w-3 cursor-pointer ${
                quantity > 1 ? "text-gray-600" : "text-gray-400"
              }`}
              viewBox="0 0 448 512"
              onClick={() => {
                handleCartUpdate(id, false);
              }}
            >
              <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>

            <span className="mx-2 border text-center w-8 max-[320px]:text-sm max-[320px]:w-6 rounded-lg">
              {quantity}
            </span>

            <svg
              className="fill-current text-gray-600 w-3 cursor-pointer"
              viewBox="0 0 448 512"
              onClick={() => {
                handleCartUpdate(id, true);
              }}
            >
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
          </div> */}
        </div>
        <div className="flex flex-1 justify-start pl-6 max-[320px]:pl-4">
          <div className="flex flex-col flex-1 md:gap-1 max-sm:justify-between">
            <p className="font-semibold text-lg max-[320px]:text-xs">{title}</p>
            <p className="text-gray-500 max-[320px]:text-[10px]">
              — from <span className="capitalize">{brand}</span>
            </p>
            <div className="flex gap-2 items-center max-sm:gap-1">
              <span className="font-medium max-[321px]:text-[10px]">
                {/* Category:{" "} */}
                Quantity:{" "}
              </span>
              <span className="capitalize font-medium max-[321px]:text-[11px]">
                {/* {category} */}
                {quantity}
              </span>

              {/* <div
              className="flex flex-1 max-w-[100px] items-center
                      h-full border text-black font-medium
                      "
            >
              <div
                className="flex flex-1 justify-center
                        items-center cursor-pointer max-[320px]:text-sm
                        "
              >
                <HiMinus />
              </div>
              <div className="h-full flex justify-center items-center px-2 max-[320px]:px-1 max-[320px]:text-sm">
                <span>2</span>
              </div>
              <div className="flex flex-1 h-full justify-center items-center cursor-pointer max-[320px]:text-sm">
                <HiPlus />
              </div>
            </div> */}
              {/* <div className="flex justify-center">
              <svg
                className="fill-current text-gray-700 w-3 "
                viewBox="0 0 448 512"
              >
                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>

              <span className="mx-2 border text-center w-8 max-[320px]:text-sm max-[320px]:w-6 rounded-lg">
                {quantity}
              </span>

              <svg
                className="fill-current text-gray-600 w-3"
                viewBox="0 0 448 512"
              >
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
            </div> */}
            </div>
            <p className="font-bold text-lg max-[320px]:text-[13px]">
              Price: ${price}
            </p>
          </div>
        </div>
        <div className="flex relative flex-col justify-end">
          <span
            onClick={() => {
              deleteCartItem(id);
              reloadCart();
            }}
            className="absolute text-lg top-0 right-0 hover:text-red-600 cursor-pointer"
          >
            <HiOutlineTrash />
          </span>
          <p className="text-gray-800 text-lg font-semibold max-[320px]:text-[10px] ">
            Total : ${quantity * price}
          </p>
        </div>
      </li>
    </>
  );
}

export default CartCard;
