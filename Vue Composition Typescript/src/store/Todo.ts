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
