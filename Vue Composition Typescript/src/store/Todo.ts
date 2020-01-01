import { createStore } from 'pinia'
import http from '@/services/HttpService'
import { Todo } from '@/models/todo'

export const useTodoStore = createStore(
  'todo',
  () => ({
    list: <Todo[]>[]
  })
)

export async function fetchTodos () {
  const todoStore = useTodoStore()
  const { data } = await http.get('/todos')
  todoStore.state.list = data

  return todoStore.state.list
}

export async function updateTodoStatus (todoIndex: number) {
  const todoStore = useTodoStore()
  const todo = todoStore.state.list[todoIndex]

  try {
    todo.isDone = !todo.isDone
    await http.put(`/todos/${todo.id}`)
  } catch (err) {
    todo.isDone = !todo.isDone
  }
}

export async function deleteTodo (todoIndex: number) {
  const todoStore = useTodoStore()
  const todo = todoStore.state.list[todoIndex]

  try {
    await http.delete(`/todos/${todo.id}`)
    todoStore.state.list.splice(todoIndex, 1)
  } catch (err) {
    console.error(err)
  }
}
