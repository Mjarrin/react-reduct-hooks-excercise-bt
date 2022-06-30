import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import Form from "./Form";
import axios from "axios";

const quotesURL = "http://localhost:3333/api/quotes";

// const initialFormState = {
//   id: "",
//   text: "",
//   author: "",
// };

export default function Container() {
  ////////////// SLICES OF STATE //////////////
  ////////////// SLICES OF STATE //////////////
  ////////////// SLICES OF STATE //////////////
  const quotes = useSelector((state) => state.quotes);
  const formValues = useSelector((state) => state.formValues);

  const dispatch = useDispatch();
  const { setQuotes, setFormValues, resetForm } = bindActionCreators(
    actionCreators,
    dispatch
  );

  //const [quotes, setQuotes] = useState([]);
  //const [formValues, setFormValues] = useState(initialFormState);

  ////////////// NETWORK HELPERS //////////////
  ////////////// NETWORK HELPERS //////////////
  ////////////// NETWORK HELPERS //////////////
  const getQuotes = () => {
    // console.log(`TASK 1- Use 'axios' or 'fetch' to [GET] a list of quotes
    //   from 'http://localhost:3333/api/quotes'. On success, the quotes
    //   in the response body should be set as the 'quotes' slice of state.
    //   On error, 'handleError' should be called.`)

    axios
      .get(quotesURL)
      .then((response) => {
        setQuotes(response.data);
      })
      .catch((error) => handleError(error));
  };

  const postQuote = ({ text, author }) => {
    // console.log(`TASK 2- Use 'axios' or 'fetch' to [POST] a new quote
    //   in 'http://localhost:3333/api/quotes'. On success, the new quote
    //   in the response body should be added to the 'quotes' slice of state.
    //   On error, 'handleError' should be called. Finally, the form should be reset.`)

    axios
      .post(quotesURL, { text, author })
      .then((response) => {
        const createdQuote = response.data;
        setQuotes([...quotes, createdQuote]);
      })
      .catch((error) => handleError(error))
      .finally(() => resetForm());
  };

  const putQuote = ({ id, text, author }) => {
    // console.log(`TASK 3- Use 'axios' or 'fetch' to [PUT] an existing quote
    //   in 'http://localhost:3333/api/quotes/:id'. On success, the updated quote
    //   in the response body should be used to replace the old version of the quote in 'quotes'.
    //   On error, 'handleError' should be called. Finally, the form should be reset.`)
    axios
      .put(`${quotesURL}/${id}`, { text, author })
      .then((response) => {
        const updatedQuote = response.data;
        const updatedQuoteArray = [...quotes].map((quote) => {
          if (quote.id === updatedQuote.id) {
            return updatedQuote;
          }
          return quote;
        });
        setQuotes(updatedQuoteArray);
      })
      .catch((error) => handleError(error))
      .finally(() => resetForm());
  };

  const deleteQuote = (id) => {
    // console.log(`TASK 4- Use 'axios' or 'fetch' to [DELETE] an existing quote
    //   in 'http://localhost:3333/api/quotes/:id'. On success, the deleted quote
    //   should be removed from the 'quotes' slice of state'.
    //   On error, 'handleError' should be called. Finally, the form should be reset.`)

    axios
      .delete(`${quotesURL}/${id}`)
      .then((response) => {
        const deletedQuoteId = response.data;
        const updatedQuotes = [...quotes].filter(
          (quote) => quote.id !== deletedQuoteId
        );
        setQuotes(updatedQuotes);
      })
      .catch((error) => handleError(error))
      .finally(() => resetForm());
  };

  ////////////// OTHER HELPERS //////////////
  ////////////// OTHER HELPERS //////////////
  ////////////// OTHER HELPERS //////////////
  const editQuote = (quoteId) => {
    // console.log(`TASK 5- This helper should find inside 'quotes' the quote with the given 'id'.
    //   Use the 'id', 'text' and 'author' properties of this quote to populate the corresponding
    //   fields of the 'formValues' slice of state.`)

    const { id, text, author } = [...quotes].find(
      (quote) => quote.id === quoteId
    );

    setFormValues({ id, text, author });
  };

  const handleError = (err) => {
    console.log(err);
    //debugger;
  }; // eslint-disable-line

  //const resetForm = () => setFormValues(initialFormState);

  ////////////// SIDE EFFECTS //////////////
  ////////////// SIDE EFFECTS //////////////
  ////////////// SIDE EFFECTS //////////////
  useEffect(() => getQuotes(), []);

  return (
    <div className="container">
      <h3>Quotes</h3>
      <ul>
        {quotes.map((q, i) => (
          <li key={q.id}>
            <div>
              {q.text} ({q.author})
            </div>
            <button onClick={() => editQuote(q.id)}>Edit</button>
            <button onClick={() => deleteQuote(q.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Form
        values={formValues}
        setValues={setFormValues}
        submitHandlers={{ postQuote, putQuote }}
        reset={resetForm}
      />
    </div>
  );
}
