import React from 'react'
import { Field, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const ProjectForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    <form className='ui form' onSubmit={handleSubmit}>
      <div className='field'>
        <label htmlFor='title'>Title</label>
        <Field name='title' component={renderField} type='text' />
      </div>
      <div className='field'>
        <label>Description</label>
        <Field name='description' component={renderField} type='text' />
      </div>
      {error && <div className='field'><strong>{error}</strong></div>}
      <button 
        className='fluid ui basic blue button'
        type='submit'
        disabled={submitting}
      >
        Create
      </button>
    </form>
  );
}

export default reduxForm({
  form: 'projectForm'
})(ProjectForm)

