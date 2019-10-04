<template>
  <div class="theLists">
    <todo
      v-for="({content, isDone, id}, index) in list"
      v-bind:key="id"
      v-bind="{ content, isDone, index, handleIsDone, removeTodo }"
    />
  </div>
</template>

<script>
import Todo from "./Todo.vue";
import { updateTodoStatus, deleteTodo } from '../Services/Todo.service.js';

export default {
  name: "TodoList",

  props: ["list"],

  components: { Todo },

  methods: {
    handleIsDone: function(index) {
      const todo = this.list[index];
      todo.isDone = !todo.isDone;
      updateTodoStatus(todo.id);
    },

    removeTodo: function(index) {
      const todoId = this.list[index].id;
      deleteTodo(todoId);
      this.list.splice(index, 1);
    }
  }
};
</script>

