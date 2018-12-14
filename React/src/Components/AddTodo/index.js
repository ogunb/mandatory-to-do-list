import React, { Component, createRef } from 'react';
import './index.css';

class AddTodo extends Component {
	constructor() {
		super();
		this.newTodoInput = createRef();
		this.newTodoForm = createRef();
	}
	onSubmit = e => {
		e.preventDefault();

		const { value: newTodo } = this.newTodoInput.current;
		if (newTodo === '') return;

		this.newTodoInput.current.style =
			'animation: 500ms slideUpOpacity ease-in forwards 1;';

		const slideIn = () => {
			this.newTodoInput.current.removeEventListener('animationend', slideIn);
			this.newTodoInput.current.style = '';
			this.props.handleNewTodo(newTodo);
			this.newTodoForm.current.reset();
		};

		this.newTodoInput.current.addEventListener('animationend', slideIn);
	};
	render() {
		return (
			<form onSubmit={this.onSubmit} className="newTodo" ref={this.newTodoForm}>
				<input
					type="text"
					ref={this.newTodoInput}
					className="newTodo__input"
					placeholder="add to do..."
					autoFocus={true}
				/>
				<button type="submit" className="newTodo__button">
					+
				</button>
			</form>
		);
	}
}

export default AddTodo;
