const hasValuesFromArray = (set, array) => {
  if (array.every((value) => set.has(value))) {
    return true;
  }
  return false;
};

export default hasValuesFromArray;
