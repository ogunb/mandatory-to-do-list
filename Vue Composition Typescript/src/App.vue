<template>
  <div id="app">
    <today />
    <todo
      v-for="(todo, index) of state.list"
      :key="todo.id"
      :todo="todo"
      :index="index"
    />
    <todo-add />
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { useTodoStore, fetchTodos } from '@/store/Todo'

import Today from '@/components/Today.vue'
import Todo from '@/components/Todo.vue'
import TodoAdd from '@/components/TodoAdd.vue'

export default createComponent({
  name: 'app',

  components: {
    Today,
    Todo,
    TodoAdd
  },

  setup () {
    const todoStore = useTodoStore()
    fetchTodos()

    return {
      state: todoStore.state
    }
  }
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Lato", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-image: linear-gradient(120deg, #42b883 0%, #35495e 100%);
  color: #333333;
}
* {
  outline: none;
}
/* latin-ext */
@font-face {
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  src: local("Lato Regular"), local("Lato-Regular"),
    url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjxAwXjeu.woff2)
      format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  src: local("Lato Regular"), local("Lato-Regular"),
    url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXg.woff2)
      format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  src: local("Lato Bold"), local("Lato-Bold"),
    url(https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh6UVSwaPGR_p.woff2)
      format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  src: local("Lato Bold"), local("Lato-Bold"),
    url(https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh6UVSwiPGQ.woff2)
      format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
#app {
  background: #fff;
  width: 400px;
  height: 80vh;
  position: relative;
  box-shadow: 0 10px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 15px 30px;
  box-sizing: border-box;
  position: relative;
}
.header {
  text-align: center;
  margin: 50px 0;
}
</style>
