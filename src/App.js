import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: [],
			itemsToShow: "all",
			id: uuidv4(),
			item: '',
			editItem: false,
			dueDate: '', // new state variable for due date
			reminder: '' // new state variable for reminder
		}
		
	}

	handleChange = event => {
		this.setState({
			item: event.target.value
		})
	}
    handleDueDateChange = event => {
		this.setState({
			dueDate: event.target.value
		})
	}
	
	handleReminderChange = event => {
		this.setState({
			reminder: event.target.value
		})
	}
	componentDidMount() {
		if (Notification.permission !== "denied") {
			Notification.requestPermission();
		}
	}
    showNotification = (title, body) => {
		if (Notification.permission === "granted") {
			new Notification(title, { body });
		}
	}

	calculateTimeRemaining = (dueDate, reminderTime) => {
		const now = new Date();
		const due = new Date(`${dueDate}T${reminderTime}`);
		const timeRemaining = due - now;
		return timeRemaining;
	}
	handleSubmit = event => {
		event.preventDefault();
	    
		const { item, dueDate, reminder } = this.state;

		if (item.trim() === '' || dueDate.trim() === '' || reminder.trim() === '') {
			alert("Please fill in all fields: Task, Due Date, and Reminder Time");
			return;
		}
	
		const newItem = {
			id: this.state.id,
			title: this.state.item,
			completed: false,
			dueDate: this.state.dueDate,
			reminder: this.state.reminder
		}
	
		const updatedItems = [...this.state.items, newItem]
	
		if (this.state.item.length > 0) {
			const timeRemaining = this.calculateTimeRemaining(this.state.dueDate, this.state.reminder);
	        if(timeRemaining < 0){
				alert("Invalid Deadline .The deadline entered has already passed.");
				return;
			}
			this.setState({
				items: updatedItems,
				id: uuidv4(),
				item: '',
				editItem: false,
				dueDate: '',
				reminder: ''
			})
	

			// Set a reminder 10 minutes before deadline
			const reminderTime = timeRemaining - 10 * 60 * 1000;
	
			setTimeout(() => {
				// const minutesRemaining1 = Math.floor(reminderTime / (1000 * 60));
				this.showNotification('Task Reminder', `You have less than 10 minutes remaining.`);
	
				// Set a notification for the actual deadline
				setTimeout(() => {
					this.showNotification('Task Deadline Passed', 'Task deadline has passed.');
				}, reminderTime > 0 ? timeRemaining - reminderTime: timeRemaining);
			}, reminderTime);
		}
	}
	
	
	
	updateTodosToShow = string => {
		this.setState({
			itemsToShow: string
		});
	};

	handleDoneTask = (id, completed) => {
		const filteredItems = this.state.items.map(item => {
			item.id === id && (item.completed = !item.completed)
			return item
		})

		this.setState({
			items: filteredItems,
		})
	}

	handleDelete = id => {
		const filteredItems = this.state.items.filter(item => item.id !== id)

		this.setState({
			items: filteredItems
		})
	}

	handleEdit = id => {
		const filteredItems = this.state.items.filter(item => item.id !== id)

		const selectedItem = this.state.items.find(item => item.id === id)

		this.setState({
			items: filteredItems,
			id: id,
			item: selectedItem.title,
			editItem: true
		})
	}

	handleEditSubmit = (id, title) => {
		const filteredItems = this.state.items.map(item => {
			if (item.id === id) {
				item.title = title
			}
			return item
		})
	
		this.setState({
			items: filteredItems,
		})
	}

	handleDeleteDoneTasks = () => {
		const filteredItems = this.state.items.filter(item => item.completed === false)

		this.setState({
			items: filteredItems
		})
	}

	clearList = () => {
		this.setState({
			items: []
		})
	}

	render() {
		let items = []

		if (this.state.itemsToShow === "all") {
			items = this.state.items;
		} else if (this.state.itemsToShow === "todo") {
			items = this.state.items.filter(item => !item.completed);
		} else if (this.state.itemsToShow === "done") {
			items = this.state.items.filter(item => item.completed);			
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-10 col-md-8 mx-auto mt-4">
						<h3 className="text-capitalize text-center">TodoInput</h3>
						<TodoInput
    item={this.state.item}
    handleChange={this.handleChange}
    handleSubmit={this.handleSubmit}
    dueDate={this.state.dueDate} // pass due date to TodoInput
    handleDueDateChange={this.handleDueDateChange} // pass handler to TodoInput
    reminder={this.state.reminder} // pass reminder to TodoInput
    handleReminderChange={this.handleReminderChange} // pass handler to TodoInput
	
/>

<TodoList
    items={items}
    clearList={this.clearList}
    handleDelete={this.handleDelete}
    handleEdit={this.handleEdit}
    handleDoneTask={this.handleDoneTask}
    handleDeleteDoneTasks={this.handleDeleteDoneTasks}
    updateTodosToShow={this.updateTodosToShow}
	handleEditSubmit={this.handleEditSubmit} // pass handler to TodoInput
/>
					</div>
				</div>
			</div>
		);

		
	}
}

export default App;
