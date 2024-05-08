"use client";
import React from "react";
import { base_URL } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";

const ProductCard = React.forwardRef(({ product = {} }, ref) => {
  return (
    <div ref={ref}>
      <Link
        href={`/products/${product?.id}`}
        className="w-[220px] flex flex-col gap-2"
      >
        <Image
          src={`${base_URL}/${product?.images[0].thumb}`}
          alt={product?.title}
          width={250}
          height={300}
          className="h-[250px] rounded-lg object-cover"
        />
        <div>
          <p className="text-base-bold line-clamp-1">{product?.title}</p>
          <p className="text-small-medium text-grey-2">
            {product?.category?.cat}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-body-bold">${product?.selling_price}</p>
        </div>
      </Link>
    </div>
  );
});
ProductCard.displayName = "ProductCard";
export default ProductCard;
