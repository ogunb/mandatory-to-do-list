class TodoList {
	constructor() {
		this.theLists = document.querySelector('.theLists');
		this.list = [
			{
				id: this.randomID(),
				content: 'will do dis.',
				isDone: false
			},
			{
				id: this.randomID(),
				content: 'will do dis.',
				isDone: true
			}
		];
		this.todoDOM = this.list.map((todo, index) => this._getDOM(todo, index));
	}

	randomID() {
		return Math.floor(Math.random() * Math.floor(165151));
	}

	_getDOM(todo, index) {
		return document.createRange()
			.createContextualFragment(`<div class="listWrapper" data-index=${index}>
      <div ${
				todo.isDone ? "class='theList isDone'" : "class='theList'"
			} data-index=${index}>
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
		e.currentTarget.children[1].checked = this.list[index].isDone; // change input;
		if (this.list[index].isDone) {
			e.currentTarget.classList.add('isDone');
		} else {
			e.currentTarget.classList.remove('isDone');
		}
	}

	addTodo(e) {
		e.preventDefault();
		const { value } = e.target[0];
		const properTodo = { id: this.randomID(), content: value, isDone: false };
		this.list.push(properTodo);
		const el = this._getDOM(properTodo, this.list.length - 1);
		this.render({ el, type: 'add' });
		e.target.reset();
	}

	deleteTodo(todo) {
		const el = todo.parentElement;
		const index = el.dataset.index;
		this.list.splice(index, 1);
		this.todoDOM.splice(index, 1);
		this.render({ el, type: 'remove' });
	}

	_addEventForDeletion(todo) {
		return todo.addEventListener('click', () => this.deleteTodo(todo));
	}

	render({ el, type }) {
		switch (type) {
			case 'add':
				this.theLists.appendChild(el);
				const deleteEl = document.querySelector(
					`[data-index='${this.list.length - 1}']`
				).children[1];
				this._addEventForDeletion(deleteEl);
				break;
			case 'remove':
				el.remove();
				break;
			default:
				return;
		}
	}

	preRender() {
		this.todoDOM.forEach(todo => this.theLists.appendChild(todo));

		const allTodo = document.querySelectorAll('.theList');
		allTodo.forEach(todo => {
			todo.addEventListener('click', this._setIsDone.bind(this));
		});

		const newTodo = document.querySelector('.newTodo');
		newTodo.addEventListener('submit', this.addTodo.bind(this));

		const removeTodo = document.querySelectorAll('.deleteTodo');
		removeTodo.forEach(todo => this._addEventForDeletion(todo));
	}
}
const todoList = new TodoList();
todoList.preRender();
