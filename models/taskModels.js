const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({

    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['to-do', 'in-progress', 'completed'],
        default: 'to-do'
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
     users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    shared: {
    type: Boolean,
    default: false
}

})

//create and export model
module.exports = mongoose.model('Task', taskSchema)