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
			.createContextualFragment(`<div class="listWrapper" data-id=${
			todo.id
		} data-index=${index}>
      <div ${todo.isDone ? "class='theList isDone'" : "class='theList'"}>
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
    </div>
    `);
	}

	_setIsDone(e) {
		const index = e.currentTarget.dataset.index;
		this.list[index].isDone = !this.list[index].isDone;
		e.currentTarget.children[0].children[1].checked = this.list[index].isDone; // change input;
		if (this.list[index].isDone) {
			e.currentTarget.children[0].classList.add('isDone');
		} else {
			e.currentTarget.children[0].classList.remove('isDone');
		}
	}

	_addTodo(e) {
		e.preventDefault();
		const { value } = e.target[0];
		const properTodo = { id: this.randomID(), content: value, isDone: false };
		this.list.push(properTodo);
		const el = this._getDOM(properTodo, this.list.length - 1);
		this.render({ el, type: 'add' });
		e.target.reset();
	}

	render({ el, type }) {
		switch (type) {
			case 'add':
				this.theLists.appendChild(el);
			case 'remove':
				el.remove();
		}
	}

	preRender() {
		this.todoDOM.forEach(todo => this.theLists.appendChild(todo));

		const allTodo = document.querySelectorAll('.listWrapper');
		allTodo.forEach(todo => {
			todo.addEventListener('click', this._setIsDone.bind(this));
		});

		const newTodo = document.querySelector('.newTodo');
		newTodo.addEventListener('submit', this._addTodo.bind(this));
	}
}
const todoList = new TodoList();
todoList.preRender();
