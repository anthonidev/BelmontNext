const getStoreLocal = (item: string) => {
  if (typeof localStorage !== "undefined") {
    if (localStorage.getItem(item)) {
      return localStorage.getItem(item);
    }
  }
  return null;
};

const removeStoreLocal = (item: string) => {
  if (typeof localStorage !== "undefined") {
    return localStorage.remove(item);
  }
  return null;
};

const setStoreLocal = (item: string, payload: string) => {
  if (typeof localStorage !== "undefined") {
    return localStorage.setItem(
      item,
      JSON.stringify(payload).replace(/["]+/g, "")
    );
  }
  return null;
};

export { getStoreLocal, removeStoreLocal, setStoreLocal };
