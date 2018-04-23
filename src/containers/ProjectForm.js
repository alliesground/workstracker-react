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
    <div className='ui card'>
      <div className='content'>
        <form className='ui form' onSubmit={handleSubmit}>
          <div className='field'>
            <label htmlFor='title'>Title</label>
            <Field name='title' component={renderField} type='text' />
          </div>
          <div className='field'>
            <label>Description</label>
            <Field name='description' component={renderField} type='text' />
          </div>
          {error && <strong>{error}</strong>}
          <div className='ui two bottom attached buttons'>
            <button 
              className='ui basic blue button'
              type='submit'
              disabled={submitting}
            >
              Create
            </button>
            <button 
              className='ui basic blue button'
              onClick={props.onFormClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default reduxForm({
  form: 'projectForm'
})(ProjectForm)


/*
export default class ProjectForm extends Component {
  state = {
    title: '',
    description: ''
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }
  
  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  handleSubmit = () => {
    this.props.onFormSubmit({
      data: {
        type: 'projects',
        attributes: {
          title: this.state.title,
          description: this.state.description
        }
      }
    });
  }

  render() {
    return (
      <div className='ui card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field error'>
              <label>Title</label>
              <input 
                type='text' 
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
              
            </div>
            <div className='field'>
              <label>Description</label>
              <input
                type='text'
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              <button 
                className='ui basic blue button'
                onClick={this.handleSubmit}
              >
                Create
              </button>
              <button 
                className='ui basic blue button'
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}*/
