import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
    render() {
        const {
            items,
            updateTodosToShow,
            clearList,
            handleDelete,
            handleEdit,
            handleDoneTask,
            handleDeleteDoneTasks,
            handleEditSubmit
        } = this.props;

        return (
            <Fragment>
                <h3 className="text-center custom-font">TodoList</h3>

                <div className="row">
                    <div className="d-grid gap-2 col-4 mx-auto">
                        <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={() => updateTodosToShow("all")}
                        >
                            All
                        </button>
                    </div>
                    <div className="d-grid gap-2 col-4 mx-auto">
                        <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={() => updateTodosToShow("done")}
                        >
                            Done
                        </button>
                    </div>
                    <div className="d-grid gap-2 col-4 mx-auto">
                        <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={() => updateTodosToShow("todo")}
                        >
                            Todo
                        </button>
                    </div>
                </div>

                {items.length === 0 ? (
                    ''
                ) : (
                    <ul className="list-group my-5">
                        {items.map(item => (
                            <TodoItem
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                completed={item.completed}
                                dueDate={item.dueDate} // pass the due date to TodoItem
                                handleDelete={() => handleDelete(item.id)}
                                handleEdit={() => handleEdit(item.id)}
                                handleDoneTask={handleDoneTask}
                                fadeOut={item.fadeOut}
                                handleEditSubmit={handleEditSubmit}
                                reminder={item.reminder}
                            />
                        ))}

                        <div className="row mt-4">
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button
                                    type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={handleDeleteDoneTasks}
                                >
                                    Delete done tasks
                                </button>
                            </div>
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button
                                    type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={clearList}
                                >
                                    Delete all tasks
                                </button>
                            </div>
                        </div>
                    </ul>
                )}
            </Fragment>
        );
    }
}
