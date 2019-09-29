const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp({
    credential: admin.credential.cert('./key.json'),
    databaseURL: "https://mandatory-to-do-list.firebaseio.com"
});

const todos = admin.database().ref('todos');

const app = express();
app.use(cors({ origin: true }));


app.get('/', async (req, res) => {
    const allTodos = (await todos.once('value')).val();
    res.send(Object.values(allTodos));
});

app.post('/', async (req, res) => {
    try {
        const { content } = req.body;
        const pushRef = todos.push();

        await pushRef.set({
            id: pushRef.key,
            content,
            isDone: false,
        });

        res.send({});
    } catch (e) {
        console.error(e.message);
        res.send(e.message);
    }
});

app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todoRef = todos.child(id);
        const todoVal = (await todoRef.once('value')).val();

        if (todoVal) {
            const { id, content, isDone } = todoVal;
            todoRef.set({
                id,
                content,
                isDone: !isDone,
            });
            res.send({});
        } else {
            res.status(404).send({ error: 'no such thing with that id exists.' });
        }
    } catch (e) {
        console.error(e.message);
        res.send(e.message);
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todoRef = todos.child(id);
        const todoVal = (await todoRef.once('value')).val();

        if (todoVal) {
            await todoRef.remove();
            res.send({});
        } else {
            res.status(404).send({ error: 'no such thing with that id exists.' });
        }
    } catch (e) {
        console.error(e.message);
        res.send(e.message);
    }
});

exports.todos = functions.https.onRequest(app);
