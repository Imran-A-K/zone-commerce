import React, { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";

import { brands, categories, subCategories } from "@/lib/constant";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function ProductFilters({
  handleSearchChange,
  handleMinPriceRangeChange,
  handleMaxPriceRangeChange,
  searchText,
  maxPrice,
  setMaxPrice,
  minPrice,
  setMinPrice,
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
  selectedSubCategories,
  setSelectedSubCategories,
}) {
  return (
    <div className="flex flex-col gap-3 pl-2">
      <div className="flex items-center mb-3">
        <input
          type="text"
          className="w-full outline-none border-[1px] rounded-lg px-2 py-[2px] text-lg"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <p className="font-semibold text-lg">Filters</p>
      <div>
        <p>Categories</p>
        {categories?.map((category) => {
          return (
            <div key={category.cat} className="py-1">
              <div className="flex items-center gap-1 pb-2">
                <Checkbox
                  id={category.cat}
                  checked={selectedCategories.includes(category.cat_slug)}
                  onCheckedChange={(checked) => {
                    setSelectedCategories((prevSelectedCategories) => {
                      if (prevSelectedCategories.includes(category.cat_slug)) {
                        const remainingCategories =
                          prevSelectedCategories.filter(
                            (c) => c !== category.cat_slug
                          );
                        // Remove corresponding sub-categories
                        setSelectedSubCategories((prevSelectedSubCategories) =>
                          prevSelectedSubCategories.filter(
                            (subCat) =>
                              !category.sub_categories
                                .map((sub) => sub.sub_slug)
                                .includes(subCat)
                          )
                        );
                        return remainingCategories;
                      } else {
                        return [...prevSelectedCategories, category.cat_slug];
                      }
                    });
                  }}
                />
                <Label
                  htmlFor={category.cat}
                  className="font-medium leading-none "
                >
                  {category.cat}
                </Label>
              </div>

              {selectedCategories.includes(category.cat_slug) &&
                category?.sub_categories?.length > 0 && (
                  <div className="pl-2 flex flex-col gap-1">
                    {" "}
                    {category.sub_categories.map((subCategory) => (
                      <div
                        key={subCategory.sub}
                        className="flex items-center gap-1"
                      >
                        <Checkbox
                          id={subCategory.sub}
                          checked={selectedSubCategories.includes(
                            subCategory.sub_slug
                          )}
                          onCheckedChange={(checked) => {
                            setSelectedSubCategories(
                              (prevSelectedSubCategories) => {
                                if (
                                  prevSelectedSubCategories.includes(
                                    subCategory.sub_slug
                                  )
                                ) {
                                  return prevSelectedSubCategories.filter(
                                    (sC) => sC !== subCategory.sub_slug
                                  );
                                } else {
                                  return [
                                    ...prevSelectedSubCategories,
                                    subCategory.sub_slug,
                                  ];
                                }
                              }
                            );
                          }}
                        />
                        <Label
                          htmlFor={subCategory.sub}
                          className="text-sm font-medium leading-none "
                        >
                          {subCategory.sub}
                        </Label>
                      </div>
                    ))}{" "}
                  </div>
                )}
            </div>
          );
        })}
      </div>
      <div>
        <p className="pb-2">Brands</p>
        {brands?.map((brand) => {
          return (
            <div key={brand.title}>
              <div className="flex items-center gap-1 pb-2">
                <Checkbox
                  id={brand.title}
                  checked={selectedBrands.includes(brand.slug)}
                  onCheckedChange={(checked) => {
                    setSelectedBrands((prevSelectedBrands) => {
                      if (prevSelectedBrands.includes(brand.slug)) {
                        const remainingBrands = prevSelectedBrands.filter(
                          (b) => b !== brand.slug
                        );

                        return remainingBrands;
                      } else {
                        return [...prevSelectedBrands, brand.slug];
                      }
                    });
                  }}
                />
                <label
                  htmlFor={brand.title}
                  className="font-medium leading-none "
                >
                  {brand.title}
                </label>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-5 py-2 overflow-hidden">
        <p className="col-span-full font-semibold">Prices</p>
        <div className="flex flex-col pl-2">
          <Label htmlFor="min" className="text-[15px] opacity-75 ">
            Min
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-2">$</span>
            <Input
              className="w-2/3 outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
              type="number"
              name="min"
              onChange={(event) => handleMinPriceRangeChange(event)}
              value={minPrice}
              id="min"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Label htmlFor="" className="text-[15px] opacity-75">
            Max
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-2">$</span>
            <Input
              className="w-2/3 outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
              type="number"
              name="max"
              onChange={(event) => handleMaxPriceRangeChange(event)}
              value={maxPrice}
              id="max"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFilters;
