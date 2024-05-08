export const base_URL = "https://summerfield.store";
export const getAllProducts = async ({ pageParam }) => {
  const collections = await fetch(`${base_URL}/products`);
  return await collections.json();
};
