import React, { Component } from 'react';
import Todo from './Todo';

import {
	fetchAllTodos,
	createTodo,
	updateTodoStatus,
	deleteTodo,
} from '../../Services/Todo.service';

export class TodoList extends Component {
	state = {
		list: [],
	};

	async componentDidMount() {
		const todos = await fetchAllTodos();

		this.setState({
			...this.state,
			list: todos,
		});
	};

	async componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			const { newTodo } = this.props;

			await createTodo(newTodo);

			const list = await fetchAllTodos();

			this.setState({
				...this.state,
				list
			});
		}
	};

	handleChange = async index => {
		await updateTodoStatus(this.state.list[index].id);
		const { list } = this.state;
		list[index].isDone = !list[index].isDone;

		this.setState({
			...this.state,
			list
		});
	};

	handleRemove = async (index, theListWrapper) => {
		await deleteTodo(this.state.list[index].id);

		theListWrapper.current.style = 'animation: slideOut 1s forwards';
		theListWrapper.current.addEventListener('animationend', async () => {
			const list = await fetchAllTodos();

			this.setState({
				...this.state,
				list
			});
		});
	};

	render() {
		const { list } = this.state;

		return (
			<div className="theLists">
				{list.map(({ content, isDone, id }, index) => (
					<Todo
						content={content}
						isDone={isDone}
						key={id}
						id={index}
						handleChange={this.handleChange}
						handleRemove={this.handleRemove}
					/>
				))}
			</div>
		);
	}
}

export default TodoList;
