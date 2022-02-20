const mongoose  = require("mongoose")

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    }, err => {
    if(err) throw err;
    console.log('Successfully connected to MongoDB!!!')
});