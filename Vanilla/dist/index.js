class TodoService {
	constructor() {
		this.baseURL = 'https://us-central1-mandatory-to-do-list.cloudfunctions.net';
	}

	async fetchAllTodos() {
		const data = await (await fetch(`${this.baseURL}/todos`, { method: 'GET' })).json();
		return data;
	}

	async createTodo(content) {
		const { data } = await (await fetch(`${this.baseURL}/todos`, { method: 'POST', content })).json();
		return data;
	}

	async updateTodoStatus(id) {
		const { data } = await fetch(`${this.baseURL}/todos/${id}`, { method: 'PUT' });
		return data;
	}

	async deleteTodo(id) {
		const { data } = await fetch(`${this.baseURL}/todos/${id}`, { method: 'DELETE' });
		return data;
	}
}

class TodoList {
	constructor() {
		this.todoService = new TodoService();
		this.theLists = document.querySelector('.theLists');
		this.list = [];
		this.todoDOM = [];
	}

	randomID() {
		return Math.floor(Math.random() * Math.floor(165151));
	}

	_setDOM(todo, index) {
		return document.createRange().createContextualFragment(`<div class="listWrapper" data-index=${index}>
      <div ${todo.isDone ? "class='theList isDone'" : "class='theList'"} data-index=${index}>
        <div>
          <label class="theList__label" for="status">
            ${todo.content}
          </label>
        </div>
        <input
          type="checkbox"
          ${todo.isDone ? 'checked' : ''}
          class="status"
        />
        <span class="check">
          <svg width="18px" height="18px" viewBox="0 0 18 18">
            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z" />
            <polyline points="1 9 7 14 15 4" />
          </svg>
        </span>
      </div>
      <button type="button" class="deleteTodo">
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
    </div>
    `);
	}

	_setIsDone(e) {
		const index = e.currentTarget.dataset.index;
		this.list[index].isDone = !this.list[index].isDone;
		this.todoService.updateTodoStatus(this.list[index].id);
		e.currentTarget.children[1].checked = this.list[index].isDone; // change input;

		if (this.list[index].isDone) {
			e.currentTarget.classList.add('isDone');
		} else {
			e.currentTarget.classList.remove('isDone');
		}
	}

	async addTodo(e) {
		e.preventDefault();
		const { value } = e.target[0];
		if (value === '') return;

		const formInput = e.target.children[0];
		formInput.style = 'animation: 500ms slideUpOpacity ease-in forwards 1;';
		formInput.addEventListener('animationend', slideIn);

		function slideIn(e) {
			formInput.removeEventListener('animationend', slideIn);
			formInput.style = '';
		}

		const todo = await this.todoService.createTodo(value);
		this.list.push(todo);
		const el = this._setDOM(todo, this.list.length - 1);
		this.render({ el, type: 'add' });

		e.target.reset();
	}

	deleteTodo(todo) {
		const el = todo.parentElement;
		el.style = 'animation: 500ms slideOut ease-out forwards 1;';
		el.addEventListener('animationend', slideOut.bind(this));

		function slideOut(e) {
			const index = el.dataset.index;
			this.list.splice(index, 1);
			this.todoDOM.splice(index, 1);
			this.todoService.deleteTodo(this.list[index].id);
			this.render({ el, type: 'remove' });
		}
	}

	_addEventForDeletion(todo) {
		return todo.addEventListener('click', () => this.deleteTodo(todo));
	}
	_addEventForSettingDone(todo) {
		return todo.addEventListener('click', e => this._setIsDone(e));
	}

	render({ el, type }) {
		switch (type) {
			case 'add':
				this.theLists.appendChild(el);

				const newEl = document.querySelector(`[data-index='${this.list.length - 1}']`).children[0];

				const deleteEl = document.querySelector(`[data-index='${this.list.length - 1}']`).children[1];

				this._addEventForSettingDone(newEl);
				this._addEventForDeletion(deleteEl);
				break;
			case 'remove':
				el.remove();
				break;
			default:
				break;
		}
	}

	async preRender() {
		this.list = await this.todoService.fetchAllTodos();
		this.todoDOM = this.list.map((todo, index) => this._setDOM(todo, index));
		this.todoDOM.forEach(todo => this.theLists.appendChild(todo));

		const allTodo = document.querySelectorAll('.theList');
		allTodo.forEach(todo => this._addEventForSettingDone(todo));

		const newTodo = document.querySelector('.newTodo');
		newTodo.addEventListener('submit', this.addTodo.bind(this));

		const removeTodo = document.querySelectorAll('.deleteTodo');
		removeTodo.forEach(todo => this._addEventForDeletion(todo));
	}
}

function getDay() {
	const todayNode = document.querySelector('.toDay');
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	const today = new Date();
	todayNode.textContent = today.toLocaleDateString('en-GB', options);
}

// INIT
(function () {
	const todoList = new TodoList();
	todoList.preRender();
	getDay();
})();
