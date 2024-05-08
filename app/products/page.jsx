"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCard from "@/components/Product/ProductCard";
import { getAllProducts } from "@/lib/actions/actions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useRef, useCallback } from "react";
function Products() {
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage.pages;
      // const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      const nextPage = lastPage.page < totalPages ? lastPage + 1 : undefined;
      return nextPage;
    },
  });

  const intObserver = useRef();
  const lastProductRef = useCallback(
    (product) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((products) => {
        if (products[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (product) intObserver.current.observe(product);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );
  const content = data?.pages.map((products) =>
    products.products.map((product, index) => {
      if (products.products.length == index + 1) {
        return (
          <ProductCard
            ref={lastProductRef}
            key={product.id}
            product={product}
          />
        );
      }
      return <ProductCard key={product.id} product={product} />;
    })
  );
  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <MaxWidthWrapper>
          <div className="flex flex-wrap justify-center gap-16">{content}</div>
          <div className="flex flex-wrap justify-center gap-16">
            {isFetchingNextPage && <h3>Loading...</h3>}
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

export default Products;
