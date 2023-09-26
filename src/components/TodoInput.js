import React, { Component } from 'react';

export default class TodoInput extends Component {
    render() {
        const { item, handleChange, handleSubmit, editItem, dueDate, handleDueDateChange, reminder, handleReminderChange } = this.props;

        return (
            <div className="card card-body my-3">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text bg-info text-white">
                                <i className="fas fa-book" />
                            </div>
                        </div>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="New Todo"
                            value={item}
                            onChange={handleChange}
                        />

                        <input
                            type="date"
                            className="form-control"
                            value={dueDate}
                            onChange={handleDueDateChange}
                        />

                        <input
                            type="time"
                            className="form-control"
                            value={reminder}
                            onChange={handleReminderChange}
                        />

                        <div className="input-group-append">
                            <button
                                type="submit"
                                className={`btn btn-primary btn-block`}
                            >
                                {editItem ? 'Edit task' : 'Add new task'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
