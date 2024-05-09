"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ImageGallery from "@/components/Product/ImageGallery";
import Info from "@/components/Product/Info";
import ProductCard from "@/components/Product/ProductCard";
import { getProduct, getRelatedProduct } from "@/lib/actions/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function Page({ params }) {
  const { data = {}, isLoading } = useQuery({
    queryKey: ["products", params["product-id"]],
    queryFn: () => getProduct({ id: params["product-id"] }),
  });
  const { data: relatedProducts = {}, isLoading: isRelatedProductsLoading } =
    useQuery({
      queryKey: ["related-products", params["product-id"]],
      queryFn: () => getRelatedProduct({ id: params["product-id"] }),
    });
  const availableColors = data?.variants
    ? [...new Set(data?.variants?.map((variant) => variant.code))]
    : [];
  const availableSizes = data?.variants
    ? [...new Set(data?.variants.map((variant) => variant.size))]
    : [];
  console.log("related", relatedProducts);
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
      {!isRelatedProductsLoading && relatedProducts?.products.length > 0 && (
        <div className="w-full flex flex-wrap gap-16">
          <p className="w-full text-2xl font-semibold pb-2 border-b-[1px] border-slate-500">
            Related Products
          </p>
          {relatedProducts?.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </MaxWidthWrapper>
  );
}

export default Page;
