import React, { Component, createRef } from 'react';
import './index.css';

class AddTodo extends Component {
	constructor() {
		super();
		this.newTodo = createRef();
	}
	onSubmit = e => {
		e.preventDefault();

		const { value: newTodo } = this.newTodo.current;
		if (newTodo === '') return;

		this.props.handleNewTodo(newTodo);
		e.currentTarget.reset();
	};
	render() {
		return (
			<form onSubmit={this.onSubmit} className="newTodo">
				<input
					type="text"
					ref={this.newTodo}
					className="newTodo__input"
					placeholder="add to do..."
				/>
				<button type="submit" className="newTodo__button">
					+
				</button>
			</form>
		);
	}
}

export default AddTodo;
