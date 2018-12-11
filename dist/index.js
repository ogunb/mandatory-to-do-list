class TodoList {
	constructor() {
		this.list = [
			{
				id: Math.floor(Math.random() * Math.floor(165151)),
				content: 'will do dis.',
				isDone: false
			},
			{
				id: Math.floor(Math.random() * Math.floor(165151)),
				content: 'will do dis.',
				isDone: true
			}
		];
		this.todoDOM = this.list.map((todo, index) => this.getDOM(todo, index));
	}

	getDOM(todo, index) {
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

	setIsDone(e) {
		const index = e.currentTarget.dataset.index;
		this.list[index].isDone = !this.list[index].isDone;
		e.currentTarget.children[0].children[1].checked = this.list[index].isDone; // change input;
		if (this.list[index].isDone) {
			e.currentTarget.children[0].classList.add('isDone');
		} else {
			e.currentTarget.children[0].classList.remove('isDone');
		}
	}

	preRender() {
		const theLists = document.querySelector('.theLists');
		this.todoDOM.forEach(todo => theLists.appendChild(todo));
		const allTodo = document.querySelectorAll('.listWrapper');
		allTodo.forEach(todo => {
			todo.addEventListener('click', this.setIsDone.bind(this));
		});
	}
}
const todoList = new TodoList();
todoList.preRender();
