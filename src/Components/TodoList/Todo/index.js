import React, { Component } from 'react';
import DeleteTodo from './DeleteTodo';
import './index.css';

class Todo extends Component {
	constructor() {
		super();
		this.theListWrapper = React.createRef();
	}
	onChange = () => {
		const { id, handleChange } = this.props;
		handleChange(id);
	};
	handleRemove = id => {
		this.theListWrapper.current.style = 'animation: slideOut 1s forwards';
		this.theListWrapper.current.addEventListener('animationend', () =>
			this.props.handleRemove(id)
		);
	};
	render() {
		const { content, isDone, id } = this.props;
		let theList = 'theList';
		if (isDone) theList += ' isDone';
		return (
			<div className="listWrapper" ref={this.theListWrapper}>
				<div className={theList} onClick={this.onChange}>
					<div>
						<label className="theList__label" htmlFor="status">
							{content}
						</label>
					</div>
					<input
						type="checkbox"
						checked={isDone}
						onChange={this.onChange}
						id="status"
					/>
					<span className="check">
						<svg width="18px" height="18px" viewBox="0 0 18 18">
							<path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z" />
							<polyline points="1 9 7 14 15 4" />
						</svg>
					</span>
				</div>
				<DeleteTodo handleRemove={this.handleRemove} id={id} />
			</div>
		);
	}
}

export default Todo;
