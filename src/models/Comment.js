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
        imageUrl: {
            type: String,
            default: 'https://cdn.woorkup.com/wp-content/uploads/2016/04/gravatar.png'
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