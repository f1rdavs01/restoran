const url = "https://food-pos-data.vercel.app";

export const catigor = async (path) => {
  try {
    const res = await fetch(`${url}/${path}`);
    const data = await res.json();
    return data;
  } catch (error) {}
};
