"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCard from "@/components/Product/ProductCard";
import ProductFilters from "@/components/Product/ProductFilters";
import { getAllProducts } from "@/lib/actions/actions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useRef, useCallback } from "react";
import { debounce } from "lodash";
import { ProductFilterDrawer } from "@/components/Product/ProductFilterDrawer";
function Products() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("0");
  const [minPriceRange, setMinPriceRange] = useState("0");
  const [maxPriceRange, setMaxPriceRange] = useState("0");
  const [searchText, setSearchText] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const debouncedSearch = useRef(
    debounce((searchText) => {
      setSearchProduct(searchText);
    }, 500)
  ).current;
  const debouncedMinPriceSearch = useRef(
    debounce((enteredMinPrice) => {
      setMinPriceRange(enteredMinPrice);
    }, 1500)
  ).current;
  const debouncedMaxPriceSearch = useRef(
    debounce((enteredMaxPrice) => {
      setMaxPriceRange(enteredMaxPrice);
    }, 1500)
  ).current;

  const handleMinPriceRangeChange = (event) => {
    setMinPrice(event.target.value);
    debouncedMinPriceSearch(event.target.value);
  };
  const handleMaxPriceRangeChange = (event) => {
    setMaxPrice(event.target.value);
    debouncedMaxPriceSearch(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    debouncedSearch(event.target.value);
  };
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [
      "products",
      {
        selectedCategories,
        selectedSubCategories,
        selectedBrands,
        minPriceRange,
        maxPriceRange,
        searchProduct,
      },
    ],
    initialPageParam: 1,
    // queryFn: getAllProducts,
    queryFn: ({ pageParam = 1 }) =>
      getAllProducts({
        pageParam,
        selectedCategories,
        selectedSubCategories,
        selectedBrands,
        minPriceRange,
        maxPriceRange,
        searchProduct,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage.pages;
      // const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      const nextPage =
        lastPage.page < totalPages ? lastPage.page + 1 : undefined;

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
    return (
      <MaxWidthWrapper>
        <p>Loading...</p>
      </MaxWidthWrapper>
    );
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <MaxWidthWrapper className="grid grid-cols-4 pt-3">
          <div className="">
            <div className="sticky top-20 overflow-y-scroll h-[calc(100vh-100px)]">
              <ProductFilters
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedSubCategories={selectedSubCategories}
                setSelectedSubCategories={setSelectedSubCategories}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                handleSearchChange={handleSearchChange}
                searchText={searchText}
                handleMinPriceRangeChange={handleMinPriceRangeChange}
                handleMaxPriceRangeChange={handleMaxPriceRangeChange}
              />
            </div>
          </div>
          <div className="col-span-3 flex flex-wrap justify-center gap-16">
            {content}
            <div className="w-full text-center">
              {isFetchingNextPage && <h3>Loading...</h3>}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

export default Products;
