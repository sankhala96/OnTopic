import express from "express";
import User from "../models/User";
import Question from '../models/Question'
import Comment from '../models/Comment'
import parseErrors from "../utils/parseErrors";
import { sendConfirmationEmail } from "../mailer";
import authenticate from '../middlewares/authenticate'

const router = express.Router();

router.post("/", (req, res) => {
    const { email, password, username } = req.body.user;
    const user = new User({ email, username });
    user.setPassword(password);
    user.setConfirmationToken();
    user
        .save()
        .then(userRecord => {
            sendConfirmationEmail(userRecord);
            res.json({ user: userRecord.toAuthJSON() });
        })
        .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.get("/current_user", authenticate, (req, res) => {
   res.json({
       user: {
           email: req.currentUser.email,
           confirmed: req.currentUser.confirmed,
           username: req.currentUser.username
       }
   })
});

router.post("/add_question", (req, res) => {
    const { question, desc, category, username} = req.body.data;
    const topic = new Question({ question, desc, category, username});
    topic
        .save()
        .then(ques => {
            if(ques) {
                res.json({result: ques})
            }else{
                res.status(400).json({ errors: "something went wrong"})
            }
        })
        //.catch(err => res.status(400).json({ errors: parseErrors(err.errors) }))
});

router.get("/get_question", (req, res) => {
    const topic = new Question();
    Question.find({}).then(
        result => {
            if(result) {
                res.json({
                    result: result
                });
                //console.log(result)
            }
            else{
                res.status(400).json({})
            }
        }
    )
});

router.get("/get_question_catg/:category", (req, res) => {

    console.log(req.params.category);
    if(req.params.category === 'All'){
        Question.find({}).then(
            result => {
                if(result) {
                    res.json({
                        result: result
                    });
                    //console.log(result)
                }
                else{
                    res.status(400).json({})
                }
            }
        )
    }else {
        Question.find({category: req.params.category}).then(
            result =>
                result ? res.json({result: result}) : res.status(400).json({})
        )
    }
});

router.get("/get_topic/:id", (req, res) => {
   Question.findById(req.params.id).then(result =>{
       if(result) {
           res.json({
               result: result
           });
           //console.log(result)
       }
       else{
           res.status(400).json({})
       }
   })
    //console.log(req.params.id)
});

router.post("/add_comment", (req, res) => {
   const { quesId, body, username} = req.body.data;
   //console.log(body)
    const comment = new Comment({ quesId, body, username});
    comment
        .save()
        .then(comment => {
            if (comment) {
                res.json({result: comment})
            } else {
                res.status(400).json({errors: "something went wrong"})
            }
        })
});

router.get("/get_comment/:id", (req, res) => {
    //console.log(req.params.id);
   Comment.find({quesId: req.params.id}).then(
       result =>
           result ? res.json({result: result}) : res.status(400).json({})
       //console.log(result)
   )
});

router.post("/add_vote", (req, res) => {
   // console.log(req.body.data);
    const { quesId, username, upvote} = req.body.data;
    //console.log(vote);
    if(upvote === "true"){
        Question.update(
            {
                _id: quesId,
                upvote: {"$ne": username}
            },
            {
                "$inc": { "count": 1 },
                "$push": { "upvote": username }
            }
        ).then((result) => result ? res.json({result: result}) : res.status(400).json({}))
    }
    else if(upvote === "false"){
        Question.update(
            {
                _id: quesId,
                upvote: username
            },
            {
                "$inc": { "count": -1 },
                "$pull": { "upvote": username }
            }
        ).then((result) => {result ? res.json({result: result}) : res.status(400).json({});
            console.log(result)
        })
    }

});

router.get("/get_vote/:data", (req, res) => {
    let data = JSON.parse(req.params.data);
    //console.log(data);
   Question.find(
       {_id: data.id},
       {
           "count": 1,
           "upvote": {
               "$elemMatch": {"$eq": data.username}
           }
       }
       ).then(
       (result) =>
           result ? res.json({result: result}) : res.status(400).json({}))

});

router.get("/commentNo/:id", (req, res) => {
    Comment.find({quesId: req.params.id}).count().then(result =>
        res.json({result})
    )

});

router.post("/add_voteComment", (req, res) => {
    const { commentId, username, upvote} = req.body.data;
    //console.log(vote);
    if(upvote === "true"){
        Comment.update(
            {
                _id: commentId,
                upvote: {"$ne": username}
            },
            {
                "$inc": { "count": 1 },
                "$push": { "upvote": username }
            }
        ).then((result) => result ? res.json({result: result}) : res.status(400).json({}))
    }
    else if(upvote === "false"){
        Question.update(
            {
                _id: commentId,
                upvote: username
            },
            {
                "$inc": { "count": -1 },
                "$pull": { "upvote": username }
            }
        ).then((result) => result ? res.json({result: result}) : res.status(400).json({}))
    }
});

router.get("/get_CommentVote/:data", (req, res) => {
    let data = JSON.parse(req.params.data);
    //console.log(data);
    Comment.find(
        {_id: data.id},
        {
            "count": 1,
            "upvote": {
                "$elemMatch": {"$eq": data.username}
            }
        }
    ).then(
        (result) => {
            result ? res.json({result: result}) : res.status(400).json({});
        })



});

export default router;