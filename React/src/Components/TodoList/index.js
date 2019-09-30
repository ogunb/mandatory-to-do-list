import React, { Component } from 'react';
import Todo from './Todo';

import { fetchAllTodos, createTodo, updateTodoStatus, deleteTodo } from '../../Services/Todo.service';

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
		const list = await fetchAllTodos();

		this.setState({
			...this.state,
			list
		});
	};

	handleRemove = (index, theListWrapper) => {
		theListWrapper.current.style = 'animation: slideOut 1s forwards';
		theListWrapper.current.addEventListener('animationend', async () => {
			await deleteTodo(this.state.list[index].id);
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
				{list.map((todo, index) => (
					<Todo
						content={todo.content}
						isDone={todo.isDone}
						key={todo.id}
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
