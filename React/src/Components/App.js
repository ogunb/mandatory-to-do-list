import React, { Component } from 'react';
import Today from './Today';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import './index.css';

class App extends Component {
	state = {
		newTodo: {}
	};

	handleNewTodo = newTodo => {
		this.setState({ ...this.state, newTodo });
	};

	render() {
		return (
			<div className="App">
				<Today />
				<h4 className="header">To do List</h4>
				<TodoList newTodo={this.state.newTodo} />
				<AddTodo handleNewTodo={this.handleNewTodo} />
			</div>
		);
	}
}

export default App;
