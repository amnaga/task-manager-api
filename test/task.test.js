const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userDetails } = require('./db')

test('should create new task', async() => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization',`Bearer ${userDetails.token}`)
    .send({
        "description":"Added a new task from unit testing tool",
        "completion":false
    })
    .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
})

test('should create new task', async() => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization',`Bearer ${userDetails.token}`)
    .send({
        "description":"Second new task from unit testing tool",
        "completion":false
    })
    .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
})


// test('should fet user task list', async() => {
//     const response = await request(app)
//     .get('/tasks')
//     .set('Authorization',`Bearer ${userDetails.token}`)
//     .send()
//     .expect(200)
// })


test('should delete user task', async() => {
    const response = await request(app)
    .delete('/tasks/621bd53c0eabeff534272aeb')
    .set('Authorization',`Bearer ${userDetails.token}`)
    .send()
    .expect(200)

    const task = await Task.findById('621bd53c0eabeff534272aeb')
    expect(task).toBeNull()
})