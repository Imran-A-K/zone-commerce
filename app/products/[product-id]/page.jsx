"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ImageGallery from "@/components/Product/ImageGallery";
import Info from "@/components/Product/Info";
import { getProduct } from "@/lib/actions/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function Page({ params }) {
  const { data = {}, isLoading } = useQuery({
    queryKey: ["products", params["product-id"]],
    queryFn: () => getProduct({ id: params["product-id"] }),
  });
  const availableColors = data?.variants
    ? [...new Set(data?.variants?.map((variant) => variant.code))]
    : [];
  const availableSizes = data?.variants
    ? [...new Set(data?.variants.map((variant) => variant.size))]
    : [];

  return (
    <MaxWidthWrapper>
      {isLoading ? (
        <>Loading</>
      ) : (
        <div className="grid grid-cols-2 mt-10 gap-14">
          <ImageGallery images={data.images} />
          <Info
            product={data}
            availableColors={availableColors}
            availableSizes={availableSizes}
          />
        </div>
      )}
    </MaxWidthWrapper>
  );
}

export default Page;
