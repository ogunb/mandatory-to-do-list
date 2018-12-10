import React from 'react';
import './index.css';

const DeleteTodo = props => {
	const removeTodo = () => {
		props.handleRemove(props.id);
	};
	return (
		<button type="button" onClick={removeTodo} className="deleteTodo">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
			>
				<g id="remove">
					<path
						id="trash-can"
						d="M12 10h-1v6h1v-6zm-2 0h-1v6h1v-6zm4 0h-1v6h1v-6zm0-4v-1h-5v1h-3v3h1v7.966l1 1.031v-.074.077h6.984l.016-.018v.015l1-1.031v-7.966h1v-3h-3zm1 11h-7v-8h7v8zm1-9h-9v-1h9v1z"
					/>
				</g>
			</svg>
		</button>
	);
};

export default DeleteTodo;
