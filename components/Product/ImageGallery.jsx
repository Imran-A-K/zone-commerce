"use client";
import { base_URL } from "@/lib/actions/actions";
import Image from "next/image";
import React, { useState } from "react";

const ImageGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="images grid grid-cols-7">
      <div className="all-images max-md:hidden flex flex-col col-span-2 justify-center">
        {images.map((imageDetails, index) => (
          <div key={index} className="image relative rounded-lg">
            <Image
              onClick={() => setSelectedImage(index)}
              className={`w-[70px] h-[70px] rounded-lg mb-3 p-1 object-cover object-top ${
                selectedImage === index
                  ? "border-[1px] border-purple-500"
                  : "border-[1px] border-purple-200"
              }`}
              height={100}
              width={100}
              src={`${base_URL}/${imageDetails.thumb}`}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="selected-image col-span-5 max-md:col-span-full max-md:flex max-md:justify-center max-md:w-full">
        <Image
          src={`${base_URL}/${images[selectedImage].image}`}
          width={1000}
          height={1000}
          className="h-[600px] max-md:h-auto w-auto object-cover object-top"
          alt=""
        />
      </div>
      <div className="all-images md:hidden flex col-span-full items-center justify-center mt-4">
        {images.map((imageDetails, index) => (
          <div key={index} className="image relative rounded-lg">
            <Image
              onClick={() => setSelectedImage(index)}
              className={`w-[70px] h-[70px] rounded-lg mb-3 p-1 object-cover object-top ${
                selectedImage === index
                  ? "border-[1px] border-purple-500"
                  : "border-[1px] border-purple-200"
              }`}
              height={100}
              width={100}
              src={`${base_URL}/${imageDetails.thumb}`}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
