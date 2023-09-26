import React, { Component } from 'react'

export default class TodoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            editedTitle: props.title,
            expanded: false, // Add expanded state
        };
        this.expandTimeout = null; 
    }

    handleEditing = () => {
        this.setState({
            editing: true
        })
    }

    handleEditedChange = (event) => {
        this.setState({
            editedTitle: event.target.value
        })
    }

    handleEditedSubmit = (event) => {
        event.preventDefault()
        this.props.handleEditSubmit(this.props.id, this.state.editedTitle)
        this.setState({
            editing: false
        })
    }

   
  handleExpandToggle = () => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));

    if (this.expandTimeout) {
      clearTimeout(this.expandTimeout);
    }

    if (!this.state.expanded) {
      this.expandTimeout = setTimeout(() => {
        this.setState({
          expanded: false,
        });
      }, 2000); // Adjust the delay as needed (2000ms = 2 seconds)
    }
  };

  componentWillUnmount() {
    if (this.expandTimeout) {
      clearTimeout(this.expandTimeout);
    }
  }


    render() {
        const {id , title, handleDelete, handleDoneTask, completed, dueDate,reminder} = this.props
        const {editing, editedTitle, expanded } = this.state

        return (
            <li
        className={`list-group-item d-flex justify-content-between my-2 ${expanded ? 'expanded-view' : ''}`}
        onClick={this.handleExpandToggle} 
      >
                {editing ? (
                    <form onSubmit={this.handleEditedSubmit}>
                        <input type="text" value={editedTitle} onChange={this.handleEditedChange} />
                    </form>
                ) : (
                    <div>
                    <h6 className={`mt-1 mb-0 align-middle ${completed ? 'completed-task' : ''}`}>{title}</h6>
                    {expanded && (
                      <div>
                        <p>Due Date: {dueDate}</p>
                        <p>Time of Deadline: {reminder}</p>
                      </div>
                    )}
                  </div>
                )}
                <div className="todo-icon">
                    <span 
                        className={`mx-2 ${completed ? 'text-success' : 'text-secondary'}`}
                        onClick={() => handleDoneTask(id)}
                    >
                        <i className={`${completed ? 'far fa-check-square' : 'far fa-square'}`} />
                    </span>
                    {editing ? (
                        <span 
                            className="mx-2 text-success"
                            onClick={this.handleEditedSubmit}
                        >
                            <i className="fas fa-check" />
                        </span>
                    ) : (
                        <span 
                            className="mx-2 text-warning"
                            onClick={this.handleEditing}
                        >
                            <i className="fas fa-pen" />
                        </span>
                    )}
                    <span 
                        className="mx-2 text-danger"
                        onClick={handleDelete}
                    >
                        <i className="fas fa-trash" />
                    </span>
                </div>
            </li>
        )
    }
}
