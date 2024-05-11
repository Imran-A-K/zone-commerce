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
    queryKey: ["user-data"],
    queryFn: async () => {
      const user = localStorage.getItem("loggedUser")
        ? JSON.parse(localStorage.getItem("loggedUser"))
        : null;
      if (typeof user === "object") {
      }
      return user;
    },
  });

  return [user, userLoading, reloadUser];
};

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
    const userLogin = await verifyUser({ email, password });
    const createCartInstance = await creatingCartInstance();
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
export const getCart = async () => {
  const cartURL = `${base_URL}/cart/`;
  const user = localStorage.getItem("loggedUser")
    ? JSON.parse(localStorage.getItem("loggedUser"))
    : null;

  const accessToken = user?.tokens?.access_token || "";
  if (accessToken.length === 0) {
    console.log("no access token");
    return [];
  }

  const response = await axios.get(cartURL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  localStorage.setItem("cart-id", response.data[0].id);
  return response.data;
};
export const creatingCartInstance = async () => {
  const cartURL = `${base_URL}/cart/`;
  const user = localStorage.getItem("loggedUser")
    ? JSON.parse(localStorage.getItem("loggedUser"))
    : null;
  const accessToken = user?.tokens?.access_token || "";

  if (accessToken.length === 0) {
    console.log("no access token");
    return [];
  }

  try {
    const response = await axios.post(
      cartURL,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating cart instance:", error);
    throw error;
  }
};

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

export async function addToCart(
  product,
  color,
  size,
  variantImageIndex,
  quantity
) {
  const user = JSON.parse(localStorage.getItem("loggedUser")) || {};

  const accessToken = user?.tokens?.access_token;
  const cartId = JSON.parse(localStorage.getItem("cart-id"));
  const cartURL = `${base_URL}/cart/${cartId}/items/`;
  try {
    const response = await axios.post(
      cartURL,
      {
        product_id: product.id,
        color: color,
        size: size,
        image: variantImageIndex,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}

export function updateCartItemQuantity(itemId, increment) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    if (increment) {
      cart[itemIndex].quantity += 1;
    } else {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity -= 1;
      }
    }
  } else {
    if (increment) {
      cart.push({ id: itemId, quantity: 1 });
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
export function deleteCartItem(itemId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
export function calculateCart(cart) {
  // const subtotal = cart?.reduce((accumulator, currentValue) => {
  //   return accumulator + currentValue?.quantity * currentValue?.price;
  // }, 0);
  const subtotal = Math.floor(
    cart?.reduce(
      (total, item) => total + Number(item?.quantity) * Number(item?.price),
      0
    )
  );
  const totalItem = cart?.length;
  const deliveryCharges = (!!totalItem && totalItem > 0 && 5) || 0;
  const tax = Math.floor(
    cart?.reduce(
      (total, item) => total + Number(item?.quantity) * Number(item?.price),
      0
    ) * 0.04
  );
  const grandTotal = subtotal + deliveryCharges + tax;

  return { subtotal, totalItems: totalItem, deliveryCharges, tax, grandTotal };
}
