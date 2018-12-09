import React, { Component } from 'react';
import './index.css';

class Todo extends Component {
	onChange = () => {
		const { id, handleChange } = this.props;
		handleChange(id);
	};

	render() {
		const { content, isDone } = this.props;
		let theList = 'theList';
		if (isDone) theList += ' isDone';
		return (
			<div className={theList} onClick={this.onChange}>
				<label className="theList__label" htmlFor="status">
					{content}
				</label>
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
		);
	}
}

export default Todo;
