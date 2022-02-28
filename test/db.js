const request = require('supertest')
const User = require("../src/models/user")
const app = require('../src/app')
const userDetails = { _id: "", token:"" }

test("Should login existing user", async () => {
    
    const response = await request(app).post("/apiusers/login").send({
        email:"test@gamdas.adsf",
        password:"test1234"
    }).expect(200)
    userDetails.token = response.body.user.tokens[0].token
    userDetails._id = response.body.user._id
    const user = await User.findById(response.body.user._id)
    expect(response.body.user.token).toBe(user.token)
})

test("Should login failed because of wrong creds", async () => {
    await request(app).post("/apiusers/login").send({
        email:"testasdfa@sadfasdf",
        password:"adsw34fas7sdf"
    }).expect(400)
})

module.exports = {
    userDetails
}