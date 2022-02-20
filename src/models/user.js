const mongoose  = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        default:0,
        validate(value) {
            if(value < 0){
                throw new Error("Age must be a valid data")
            }
        }
    },
    email:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Your password length minimum 6 digits")
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type: Buffer
    }
},{
        timestamps:true
    
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField: 'owner'
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('Unable to login!')
        console.log('test')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login!')
    }
    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id:user._id.toString() },process.env.JWT_AUTH_SCRETEKEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.pre('save',async function(next) {
    const user = this
    if(user.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt); 
    }
    next()
})

userSchema.pre('remove',async function(next) {
    const user = this
    await Task.deleteMany({owner:user._id})
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User