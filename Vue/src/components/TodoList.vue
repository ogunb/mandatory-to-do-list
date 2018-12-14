<template>
  <div class="theLists">
    <todo
      v-for="({content, isDone, id}, index) in list"
      v-bind:key="id"
      v-bind="{content, isDone, index, handleIsDone, removeTodo}"
    />
  </div>
</template>

<script>
import todo from "./todo.vue";

export default {
  name: "TodoList",
  components: {
    todo
  },
  props: ["list"],
  methods: {
    handleIsDone: function(index) {
      this.list[index].isDone = !this.list[index].isDone;
      localStorage.setItem("vue-todo-list-8888", JSON.stringify(this.list));
    },
    removeTodo: function(index) {
      this.list.splice(index, 1);
      localStorage.setItem("vue-todo-list-8888", JSON.stringify(this.list));
    }
  }
};
</script>

