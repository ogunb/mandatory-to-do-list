import React, { Component } from 'react';
import uuid from 'uuid';
import Todo from './Todo';

export class TodoList extends Component {
	state = {
		list: [{ id: uuid(), content: 'will do dis.', isDone: false }]
	};

	componentDidMount() {
		if (localStorage.getItem('react-todo-list-8888') !== null) {
			const local = localStorage.getItem('react-todo-list-8888');
			this.setState({
				...this.state,
				list: JSON.parse(local)
			});
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			const { list } = this.state;
			const { newTodo } = this.props;

			const properTodo = { id: uuid(), content: newTodo, isDone: false };
			list.push(properTodo);
			localStorage.setItem('react-todo-list-8888', JSON.stringify(list));

			this.setState({
				...this.state,
				list
			});
		}
	}
	handleChange = id => {
		const { list } = this.state;
		list[id].isDone = !list[id].isDone;
		localStorage.setItem('react-todo-list-8888', JSON.stringify(list));
		this.setState({
			...this.state,
			list
		});
	};
	handleRemove = (id, theListWrapper) => {
		theListWrapper.current.style = 'animation: slideOut 1s forwards';
		theListWrapper.current.addEventListener('animationend', () => {
			const { list } = this.state;
			list.splice(id, 1);
			localStorage.setItem('react-todo-list-8888', JSON.stringify(list));
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
