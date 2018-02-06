import api from '../api'
import { userLoggedIn} from "./auth";
import {
    USER_FETCHED,
    QUES_FETCHED,
    QUES_ADDED,
    COMMENT_ADDED,
    COMMENT_FETCHED,
    VOTED,
    VOTE_FETCHED,
    COMMENT_NO
} from "../types";

export const userFetched = user => ({
   type: USER_FETCHED,
    user
});

export const quesAdded = result => ({
   type: QUES_ADDED,
   result
});

export const quesFetched = result => ({
   type: QUES_FETCHED,
   result
});

export const commentAdded = result => ({
    type: COMMENT_ADDED,
    result
});

export const commentFetched = result => ({
   type: COMMENT_FETCHED,
   result
});

export const Voted = result => ({
    type: VOTED,
    result
});

export const voteFetched = result => ({
   type: VOTE_FETCHED,
   result
});

export const commentNoFetched = result => ({
    type: COMMENT_NO,
    result
});


export const signup = date => dispatch =>
    api.user.signup(date).then(user => {
        localStorage.alhubJWT = user.token;
        dispatch(userLoggedIn({...user, loaded: true}))
    });

export const fetchCurrentUser = () => dispatch =>
    api.user.fetchCurrentUser().then(user => dispatch(userFetched(user)));

export const addQ = data => dispatch =>
    api.user.addQ(data).then(result => dispatch(quesAdded(result)));

export const getQ = () => dispatch =>
    api.user.getQ().then(result => dispatch(quesFetched(result)));

export const getQC = category => dispatch =>
    api.user.getQC(category).then(result => dispatch(quesFetched(result)));

export const get_topic = id => dispatch =>
    api.user.get_topic(id).then(result => dispatch(quesFetched(result)));

export const addComment = data => dispatch =>
    api.user.addComment(data).then(result => dispatch(commentAdded(result)));

export const getComment = id => dispatch =>
    api.user.getComment(id).then(result => dispatch(commentFetched(result)));

export const vote = data => dispatch =>
    api.user.vote(data).then(result => dispatch(Voted(result)));

export const getVote = data => dispatch =>
    api.user.getVote(data).then(result => dispatch(voteFetched(result)));

export const commentNo = id => dispatch =>
    api.user.commentNo(id).then(result => dispatch(commentNoFetched(result)));

export const voteComment = data => dispatch =>
    api.user.voteComment(data).then(result => dispatch(Voted(result)));

export const getCommentVote = data => dispatch =>
    api.user.getCommentVote(data).then(result => dispatch(voteFetched(result)));