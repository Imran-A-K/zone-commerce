"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  addToCart,
  creatingCartInstance,
  useGetUser,
} from "@/lib/actions/actions";
import { useQueryClient } from "@tanstack/react-query";

const Info = ({ product, availableColors = [], availableSizes = [] }) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  const [user, userLoading, reloadUser] = useGetUser();
  // console.log("ccccc", user, !!user);
  console.log("product", product);

  const { title, short_desc, brand, variants = [], selling_price } = product;
  const [colorsToDisplay, setColorsToDisplay] = useState(availableColors);
  const [sizesToDisplay, setSizesToDisplay] = useState(availableSizes);
  const [selectedColour, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [productStock, setProductStock] = useState(0);

  // console.log(selectedColour, selectedSize);
  const handleAddToCart = () => {
    if (!user) {
      localStorage.setItem("userIntendedDestination", pathname);
      toast.info("Please login to continue shopping");
      router.push("/login");
      return;
    }
    if (selectedColour.length === 0 && selectedSize.length === 0) {
      toast.info("Please select a color and size");
      return;
    } else if (selectedColour.length === 0) {
      toast.info("Please select a color");
      return;
    } else if (!notApplicableSize && selectedSize.length === 0) {
      toast.info("Please select a size");
      return;
    }
    const variantImageIndex = product.variants.find(
      (item) =>
        item.code === selectedColour && item.size === (selectedSize || "N/A")
    ).image;
    const color = product.variants.find(
      (item) => item.code === selectedColour
    ).color;

    toast.promise(
      addToCart(product, color, selectedSize, variantImageIndex, quantity),
      {
        loading: "Adding to Cart...",
        success: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["cartData"],
          });
          return `Successfully Added to cart`;
        },
        error: (error) => {
          // const [errorKey] = Object.keys(error.response.data);
          // return error.response.data[errorKey];
          return "Could not add to cart";
        },
      }
    );
  };

  const handleColorSelect = (color) => {
    if (selectedColour == color) {
      setSelectedColor("");
      //   setColorsToDisplay(availableColors)
      setSizesToDisplay(availableSizes);
    } else {
      setSelectedColor(color);
      const filteredVariant = variants.find(
        (variant) => variant.size === selectedSize && variant.code === color
      );
      if (filteredVariant) {
        setProductStock(filteredVariant.stock);
      } else {
        setProductStock(0);
      }
      const sizes = variants
        .filter((variant) => variant.code === color)
        .map((variant) => variant.size);
      setSizesToDisplay([...new Set(sizes)]);
    }
  };
  const handleSizeSelect = (size) => {
    if (selectedSize == size) {
      setSelectedSize("");
      // setColorsToDisplay(availableColors)
      setColorsToDisplay(availableColors);
      if (productStock > 0) {
        setProductStock(0);
      }
    } else {
      setSelectedSize(size);
      const colors = variants
        .filter((variant) => variant.size === size)
        .map((variant) => variant.code);
      setColorsToDisplay([...new Set(colors)]);

      const filteredVariant = variants.find(
        (variant) => variant.size === size && variant.code === selectedColour
      );
      if (filteredVariant) {
        setProductStock(filteredVariant.stock);
      } else {
        setProductStock(0);
      }
    }
  };

  const notApplicableSize = availableSizes.includes("N/A");
  return (
    <div className="relative info">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <h3 className="text-sm text-neutral-500">{brand.title}</h3>
      <h5 className="text-sm text-neutral-800 font-medium">${selling_price}</h5>

      <h3 className="font-medium mt-6 mb-3 text-[14px]">Available Colors</h3>
      {colorsToDisplay.map((color, index) => (
        <div
          key={index}
          onClick={() => handleColorSelect(color)}
          className={`relative w-[35px] h-[35px]  m-1 ${
            selectedColour == color
              ? "border-stone-800 border-4"
              : "border-neutral-400 border-[1px]"
          }`}
          style={{
            borderRadius: "100%",
            backgroundColor: color,
            display: "inline-block",
          }}
        >
          <span
            className="w-[30px] h-[30px] rounded-full flex top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute border-[1px]"
            style={{ backgroundColor: color }}
          ></span>
        </div>
      ))}
      {!notApplicableSize ? (
        <>
          <h3 className="font-medium mt-4 mb-3 text-[14px]">Select Size</h3>
          <ul className="flex space-x-5">
            {sizesToDisplay.map((size, index) => (
              <li
                key={index}
                className={`p-1 px-2 border-[1px] rounded-lg cursor-pointer inline-block text-center
                        ${
                          size == selectedSize
                            ? "bg-black text-white"
                            : "bg-white text-black"
                        }
                    `}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div className="flex flex-col gap-4">
        <Label htmlFor="quantity" className="flex items-center gap-2 pt-5">
          <span className="text-lg font-medium">Qty</span>
          <Input
            className=" w-1/5 outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
            type="number"
            name="quantity"
            onChange={(event) => {
              if (selectedColour.length === 0 && selectedSize.length === 0) {
                toast.info("Please select a color and size");
                return;
              } else if (selectedColour.length === 0) {
                toast.info("Please select a color");
                return;
              } else if (selectedSize.length === 0) {
                toast.info("Please select a size");
                return;
              }

              if (event.target.value > 0) {
                if (event.target.value <= productStock)
                  setQuantity(event.target.value);
              }
            }}
            value={quantity}
            id="quantity"
            // disabled={productStock == 0}
          />
          {productStock > 0 && (
            <span className="font-semibold text-neutral-500 text-lg">
              in stock - {productStock}
            </span>
          )}
        </Label>
        <Button onClick={() => handleAddToCart()} className="w-1/3">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Info;
