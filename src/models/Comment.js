import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        quesId: {
          type: String,
          required: true
        },
        body: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            index: true
        },
        count: {
            type: Number,
            default: 0
        },
        upvote: {
            type: Array,
            default:''
        },
    }
);

export default mongoose.model("Comment", schema);