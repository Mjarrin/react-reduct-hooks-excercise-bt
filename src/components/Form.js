import React from 'react'

export default function Form(props) {
  const {
    values,
    setValues,
    reset,
    submitHandlers: { postQuote, putQuote },
  } = props

  ////////////// EVENT HANDLERS //////////////
  ////////////// EVENT HANDLERS //////////////
  ////////////// EVENT HANDLERS //////////////
  const onCancel = evt => {
    // console.log(`TASK 6- This should prevent the default behavior and
    //   reset the form to its original values.`)
      evt.preventDefault();
      reset();
  }

  const onSubmit = evt => {
    // console.log(`TASK 7- This should prevent the default behavior and
    //   check whether 'values' contains a truthy id. If so, invoke the correct callback
    //   to [PUT] an existing quote, otherwise invoke the correct callback
    //   to [POST] a new quote.`)

      evt.preventDefault();
      const { id, text, author } = values;
      if (id) {
        putQuote({ id, text, author })
      } else {
        postQuote({ text, author });
      }
  }

  const onChange = evt => {
    // console.log(`TASK 8- Obtain 'name' and 'value' from the target of the event,
    //   and utilize the correct callback to update the state of the form.`)
      const { name, value } = evt.target

      const updatedFormObject = {...values, [name] : value}
       
      setValues(updatedFormObject);
  }

  ////////////// HELPER //////////////
  ////////////// HELPER //////////////
  ////////////// HELPER //////////////
  const isDisabled = () => {
    return !values.text.trim() || !values.author.trim()
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>{values.id ? 'Edit' : 'Add New'} Quote</h3>
      <input
        name='text'
        type='text'
        value={values.text}
        onChange={onChange}
        placeholder='Enter text'
      />
      <input
        name='author'
        type='text'
        value={values.author}
        onChange={onChange}
        placeholder='Enter author'
      />
      <button id='submitBtn' disabled={isDisabled()}>
        Submit {values.id ? 'Changes' : 'Quote'}
      </button>
      <button id='cancelBtn' onClick={onCancel}>Cancel</button>
    </form>
  )
}
