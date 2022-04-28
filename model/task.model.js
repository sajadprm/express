const mongoose = require('mongoose');
const TaskSchema=mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Task Description"
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    },
    user:{
        type:mongoose.ObjectId,
        ref:'Users',
        required:true
    },
    
}, { timestamps: true })



TaskSchema.methods.toJSON=function()
{
    const objectData=this.toObject();
    delete objectData.__v;
    delete objectData.description;
    delete objectData.user;
    

    return objectData;
      
}
const Task = mongoose.model('Task',TaskSchema);



module.exports = Task;