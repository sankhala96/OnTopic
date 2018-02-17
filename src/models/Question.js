import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            index: true,
            unique: true
        },
        desc: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            index: true,
        },
        count: {
            type: Number,
            default: 0
        },
        upvote: {
            type: Array,
            default:''
        },
        timestamp: {
            type:Date,
            default:Date.now()
        }

    }
);

schema.methods.sendDetail = function sendDetail() {
    console.log(this.question);
    return{
            question: this.question,
            desc: this.desc,
            category: this.category,
            username: this.username,
            timestamp: this.timestamp
    }
};

export default mongoose.model("Question", schema);