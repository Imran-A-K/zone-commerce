export const base_URL = "https://summerfield.store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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

export const useGetUser = () => {
  const {
    data: user = {},
    refetch: reloadUser,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["logged-user-data"],
    queryFn: async () => {
      const user = localStorage.getItem("loggedUser")
        ? JSON.parse(localStorage.getItem("loggedUser"))
        : null;
      return user;
    },
  });
  return [user, userLoading, reloadUser];
};

// export async function registerUser(newUser) {
//   const registrationURL = `${base_URL}/register/`;
//   const { firstName, lastName, email, password, userImage } = newUser;
//   const formData = new FormData();
//   formData.append("first_name", firstName);
//   formData.append("last_name", lastName);
//   formData.append("email", email);
//   formData.append("password", password);
//   if (typeof userImage === "object") formData.append("image", userImage);

//   try {
//     const response = await fetch(registrationURL, {
//       method: "POST",
//       body: formData,
//     });

//     console.log(response.status, typeof response.status, response);
//     if (!response.ok) {
//       console.log("hit error");
//       throw response;
//     }
//     const responseData = await response.json();
//     console.log("main response inside try", responseData);
//     return responseData;
//   } catch (error) {
//     console.error("Error registering user:", error.json());
//     throw error;
//   }
// }

export async function registerUser(newUser) {
  const registrationURL = `${base_URL}/register/`;
  const { firstName, lastName, email, password, userImage } = newUser;
  const formData = new FormData();
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("email", email);
  formData.append("password", password);
  if (typeof userImage === "object") formData.append("image", userImage);

  try {
    const response = await axios.post(registrationURL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error.response.data;
  }
}
export async function verifyUser(credentials) {
  const loginURL = `${base_URL}/login/`;
  const { email, password } = credentials;
  try {
    const response = await axios.post(loginURL, {
      email: email,
      password: password,
    });
    const userData = response.data;
    localStorage.setItem("loggedUser", JSON.stringify(userData));
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export const useGetCart = () => {
  const {
    data: cart = [],
    refetch: reloadCart,
    isLoading: cartLoading,
  } = useQuery({
    queryKey: ["cartData"],
    queryFn: async () => {
      const cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : null;
      return cart;
    },
  });
  return [cart, cartLoading, reloadCart];
};
