const initialFormState = {
  id: "",
  text: "",
  author: "",
};

const reducer = (state = initialFormState, action) => {
  switch (action.type) {
    case "setFormValues":
      return { ...action.payload };
      case "resetForm":
        return { ...initialFormState};
    default:
      return state;
  }
};

export default reducer;
