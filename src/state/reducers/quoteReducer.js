const reducer = (state = [], action) => {
  switch (action.type) {
    case "setQuotes":
      return [...action.payload];
    default:
      return state;
  }
};

export default reducer;
