const { Router } = require('express')
const Todo = require('../models/todo.js')
const router = Router()

router.get('/', async (request, response) => {
	const todos = await Todo.find({}).lean()

	response.render('index', {
		title: 'Todos List',
		isIndex: true,
		todos
	})
})

router.get('/create', (request, response) => {
	response.render('create', {
		title: 'Create Todo',
		isCreate: true
	})
})

router.post('/create', async (request, response) => {
	const todo = new Todo({
		title: request.body.title
	})

	await todo.save()
	response.redirect('/')
})

router.post('/complete', async (request, response) => {
	const todo = await Todo.findById(request.body.id)

	todo.completed = !!request.body.completed
	await todo.save()

	response.redirect('/')
})

module.exports = router