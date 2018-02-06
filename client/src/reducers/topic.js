import {QUES_ADDED, QUES_FETCHED, COMMENT_ADDED, COMMENT_FETCHED, VOTED, VOTE_FETCHED, COMMENT_NO} from '../types'

export default function topic(state ={}, action ={}) {
    switch (action.type){
        case QUES_ADDED:
            return{...state};
        case QUES_FETCHED:
            return{...state};
        case COMMENT_ADDED:
            return{...state};
        case COMMENT_FETCHED:
            return{...state};
        case VOTED:
            return{...state};
        case VOTE_FETCHED:
            return{...state, ...action.result};
        case COMMENT_NO:
            return{...state};
        default:
            return state;
    }
}