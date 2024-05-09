export const base_URL = "https://summerfield.store";
function formatQuery(
  pageParam = 1,
  selectedCategories = [],
  selectedSubCategories = [],
  selectedBrands = [],
  minPriceRange = "0 ",
  maxPriceRange = "0",
  searchProduct = ""
) {
  const formattedCategories =
    selectedCategories.length > 0
      ? selectedCategories.map((category) => `category=${category}`).join("&")
      : "";
  const formattedSubCategories =
    selectedSubCategories.length > 0
      ? selectedSubCategories
          .map((subCategory) => `sub_category=${subCategory}`)
          .join("&")
      : "";
  const formattedBrands =
    selectedBrands.length > 0
      ? selectedBrands.map((brand) => `brand=${brand}`).join("&")
      : "";
  const formattedProductSearch =
    searchProduct.length > 0
      ? `keyword=${encodeURIComponent(searchProduct)}`
      : "";
  const formattedMinPrice =
    minPriceRange > 0 ? `min_price=${minPriceRange}` : "";
  const formattedMaxPrice =
    maxPriceRange > 0 ? `max_price=${maxPriceRange}` : "";
  let page = pageParam > 0 ? `page=${pageParam}` : "";

  const queryParts = [
    formattedCategories,
    formattedSubCategories,
    formattedBrands,
    formattedProductSearch,
    formattedMinPrice,
    formattedMaxPrice,
    page,
  ];
  const nonEmptyQueryParts = queryParts.filter((part) => part !== "");

  const query = nonEmptyQueryParts.join("&");
  return query;
}
export const getAllProducts = async ({
  pageParam,
  selectedCategories,
  selectedSubCategories,
  selectedBrands,
  minPriceRange,
  maxPriceRange,
  searchProduct,
}) => {
  const queries = formatQuery(
    pageParam,
    selectedCategories,
    selectedSubCategories,
    selectedBrands,
    minPriceRange,
    maxPriceRange,
    searchProduct
  );

  const collections = await fetch(`${base_URL}/products/?${queries}`);
  return await collections.json();
};
// export const getAllProducts = async ({ pageParam }) => {
//   const collections = await fetch(`${base_URL}/products`);
//   return await collections.json();
// };

export const getProduct = async ({ id }) => {
  const product = await fetch(`${base_URL}/products/${id}`);
  return await product.json();
};
export const getRelatedProduct = async ({ id }) => {
  const relatedProducts = await fetch(
    `${base_URL}/products/related-product/${id}`
  );
  return await relatedProducts.json();
};
