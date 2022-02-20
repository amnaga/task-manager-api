const express = require("express")
require("./db/mongoose")
const User = require("./models/user")
const Task = require("./models/task")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")
const router = require("./routers/user")
const userController = require("./controllers/userControllers")
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')
const port = process.env.PORT || 3000

app.use(bodyparser.urlencoded({
    extended: true
}))

app.set('views',path.join(__dirname,'/views/'))
app.engine('hbs',exphbs.engine({
    extname:'hbs',
    defaultLayout:'mainLayout',
}))
app.set('view engine','hbs')
layoutsDir:__dirname+'/views/layouts/'

app.get('/', (req, res) => {
    User.find((err, docs) => {
        if(!err){
            res.render("user/list", {
                list:docs
            })
        }else{
            console.log("Error in retreving the user list : "+err)
        }
    })
});

app.use('/users',userController)
app.use(express.static(path.join(__dirname,'/public/')))

// app.use((req,res, next) => {
//         res.status(503).send("site is currently down. Check back soon!")
//     if(req.method == "GET"){
//         res.send('Get request or disabled')
//     } else {
//         next()
//     }
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("Server is up running... The port is : " + port)
})

const main = async () => {
    // const user = await User.findById('62037db6bb36c52849b56585')
    // await user.populate('tasks')
    // console.log(user.tasks)
}
// main()