import React, { Component } from 'react';
import Today from './Today';
import Todo from './Todo';
import AddTodo from './AddTodo';
import './index.css';

class App extends Component {
	state = {
		list: [
			{ content: 'Lorem ipsum dolor', isDone: false },
			{ content: 'dude no what no', isDone: true }
		]
	};
	handleChange = id => {
		const { list } = this.state;
		[list[id].isDone] = [!list[id].isDone];
		this.setState({
			...this.state,
			list
		});
	};
	render() {
		const { list } = this.state;
		return (
			<div className="App">
				<Today />
				<h4 className="header">To do List</h4>
				<div className="theLists">
					{list.map((todo, index) => (
						<Todo
							content={todo.content}
							isDone={todo.isDone}
							key={index}
							id={index}
							handleChange={this.handleChange}
						/>
					))}
				</div>
				<AddTodo />
			</div>
		);
	}
}

export default App;
