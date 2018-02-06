import axios from 'axios'

export default {
    user: {
        login: credentials =>
            axios.post("/api/auth", { credentials }).then(res => res.data.user),

        signup: user =>
            axios.post("/api/users", {user}).then(res => res.data.user),

        confirm: token =>
            axios.post("/api/auth/confirmation", {token}).then(res => res.data.user),

        resetPasswordRequest: email =>
            axios.post("/api/auth/reset_password_request", {email}),

        validateToken: token =>
            axios.post("/api/auth/validate_token", { token }),

        resetPassword: data =>
            axios.post("/api/auth/reset_password", { data }),

        fetchCurrentUser: () =>
            axios.get("/api/users/current_user").then(res => res.data.user),

        addQ: data =>
            axios.post("/api/users/add_question", { data}).then(res => res.data.result),

        getQ: () =>
            axios.get("/api/users/get_question").then(res => res.data.result),

        getQC: category =>
            axios.get(`/api/users/get_question_catg/${category}`, { category }).then(res => res.data.result),

        get_topic: id =>
            axios.get(`/api/users/get_topic/${id}`, {id}).then(res => res.data.result),

        addComment: data =>
            axios.post("/api/users/add_comment", { data}).then(res => res.data.result),

        getComment: id =>
            axios.get(`/api/users/get_comment/${id}`, {id}).then(res => res.data.result),

        vote: data =>
            axios.post("/api/users/add_vote", {data}).then(res => res.data.result),

        getVote: data =>
            axios.get(`/api/users/get_vote/${data}`).then(res => res.data.result),

        commentNo: id =>
            axios.get(`/api/users/commentNo/${id}`).then(res => res.data.result),

        voteComment: data =>
            axios.post("/api/users/add_voteComment", {data}).then(res => res.data.result),

        getCommentVote: data =>
            axios.get(`/api/users/get_CommentVote/${data}`).then(res => res.data.result)
    }
}