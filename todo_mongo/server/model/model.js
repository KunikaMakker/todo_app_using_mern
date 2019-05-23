import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const todoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    taskTitle: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
    },
    completionDate: {
        type: Date,
        required: true,
    },
    taskStatus: {
        type: Boolean,
        required: true,
    }
})

export default mongoose.model('Schema',todoSchema);