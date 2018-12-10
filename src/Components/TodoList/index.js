import React, { Component } from 'react';
import uuid from 'uuid';
import Todo from './Todo';

export class TodoList extends Component {
	state = {
		list: [
			{ id: uuid(), content: 'Lorem ipsum dolor', isDone: false },
			{ id: uuid(), content: 'dude no what no', isDone: true }
		]
	};
	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			const { list } = this.state;
			const { newTodo } = this.props;

			const properTodo = { id: uuid(), content: newTodo, isDone: false };
			list.push(properTodo);

			this.setState({
				...this.state,
				list
			});
		}
	}
	handleChange = id => {
		const { list } = this.state;
		[list[id].isDone] = [!list[id].isDone];
		this.setState({
			...this.state,
			list
		});
	};
	handleRemove = id => {
		const { list } = this.state;
		list.splice(id, 1);
		this.setState({
			...this.state,
			list
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
