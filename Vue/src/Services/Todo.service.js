import http from './Http.service';

export async function fetchAllTodos() {
    const { data } = await http.get('/todos');
    return data;
}

export async function createTodo(content) {
    const { data } = await http.post('/todos', { content });
    return data;
}

export async function updateTodoStatus(id) {
    const { data } = await http.put(`/todos/${id}`);
    return data;
}

export async function deleteTodo(id) {
    const { data } = await http.delete(`/todos/${id}`);
    return data;
}
