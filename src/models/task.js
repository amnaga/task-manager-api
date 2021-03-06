    const mongoose  = require("mongoose")
const validator = require("validator")

const taskSchema = new mongoose.Schema({
    description:{
        type: String,
        required:true,
        trim:true
    },
    completion:{
        type: Boolean,
        dfault:false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

taskSchema.pre('save',async function(next) {
    const task = this
    console.log("Saving section!")
    next()
})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task