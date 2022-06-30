export const setQuotes = (quotes) => {
  return (dispatch) => {
    dispatch({
      type: "setQuotes",
      payload: quotes
    });
  };
};

export const setFormValues = (formValues) => {
  return (dispatch) => {
    dispatch({
      type: "setFormValues",
      payload: formValues
    });
  };
};

export const resetForm = (formValues) => {
    return (dispatch) => {
      dispatch({
        type: "resetForm",
        payload: formValues
      });
    };
  };
  
