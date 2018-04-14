import React, { Component } from 'react'

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
      title: this.state.title,
      description: this.state.description
    });
  }

  render() {
    return (
      <div className='ui card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
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
}
