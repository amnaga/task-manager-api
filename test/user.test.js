const request = require('supertest')
const app = require('../src/app')
const User = require("../src/models/user")
const { userDetails } = require('./db')



beforeEach(async () => {
    // await User.deleteMany()
    // await new User(userOne).save()
})

afterEach(() => {
    console.log("after each")
})

// test("should signup a new user", async() => {
//     const response = await request(app)
//     .post('/apiusers/register')
//     .send({
//         name: 'Naga',
//         email: 'testingapi5@test.com',
//         password:'test1234'
//     }).expect(201)

//     //Asset that the databases was changed correctly
//     const user = await User.findById(response.body.user._id)
//     userDetails.token = user.tokens[0].token
//     userDetails._id = user._id
//     expect(user).not.toBeNull()

//     //Assertion about the response
//     // expect(response.body).toMatchObject({
//     //     user:{
//     //         name : 'Naga',
//     //         email: 'testingapi3@test.com'
//     //     }
//     // })
// })

test('Should update profile for user', async() => {
    await request(app).patch('/apiusers/update')
    .set('Authorization',`Bearer ${userDetails.token}`)
    .send({
        "name": "Nagarajan M",
        "age": 32,
        "email": "test@gamdas.adsf",
        "password": "test1234"
    })
    .expect(200)
})

// test('Should upload avatar image', async() => {
//     console.log(userDetails.token)
//     await request(app)
//     .post('/apiusers/me/avatars')
//     .set('Authorization',`Bearer ${userDetails.token}`)
//     .attach('avatar','test/images/n-letter.jpg')
//     .expect(200)

//     const user = await User.findById(userDetails._id)
//     expect(user.avatar).toEqual(expect.any(Buffer))
// })

// test('Should not pass authorization for update profile for user', async() => {
//     await request(app).patch('/apiusers/update')
//     .send()
//     .expect(200)
// })

// test('Should not delete account for unauthenticated user', async() => {
//     await request(app)
//     .delete('/apiusers/delete')
//     .send()
//     .expect(401)
// })

// test('Should delete account for user', async() => {
//     await request(app)
//     .delete('/apiusers/delete')
//     .set('Authorization',`Bearer ${this.token}`)
//     .send()
//     .expect(200)
// })