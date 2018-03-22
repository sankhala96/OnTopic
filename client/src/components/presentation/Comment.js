import React from 'react'
import './Comment.css'
import {connect} from 'react-redux'
import { getCommentVote} from '../../actions/users'

class Comment extends React.Component {
    state={
        data: {
            commentId: this.props.comment._id,
            username: this.props.user.username,
            upvote: false
        },
        count: 0
    };

    upClick = () =>{

        let upvote = this.state.data.upvote === "true" ? "false" : "true";
        let data = {...this.state.data};
        data.upvote = upvote;
        this.setState({data});
        this.props.upClick(data);

        this.setState(prevState => {
            return {count: upvote === "true" ? prevState.count+1: prevState.count-1}
        });
    };

    componentDidMount() {
        let obj = {"id": this.props.comment._id, username: this.props.user.username};
        let data = JSON.stringify(obj);
        this.props.getCommentVote(data).then(result => {
            if(result.result[0].upvote[0] === this.props.user.username)
            {
                let data = {...this.state.data};
                data.upvote = "true";
                this.setState({data});
                //console.log(data);
            }
            console.log(result);

            this.setState({
                count: result.result[0].count
            })
        });
    }

    render(){
        console.log();
        const {body, username,imageUrl} = this.props.comment;
        const {upvote} = this.state.data;
        return(
            <div className="container" id="comment-detail">
                <div id="user">
                    <img className="img-fluid rounded-circle"
                         src= {imageUrl}
                         style={{width: "60px"}}
                         alt="Gravatar"/><br/>
                    <hr/>
                    <span>{username}</span>
                </div>
                <div id="detail">
                    <p>
                        {body}
                    </p>
                </div>
                <hr/>
                <div id="voting-comment">
                    <div id="votebox-comment">
                        <span
                            className="fa fa-thumbs-o-up vote up"
                            id={upvote==="true"? "upvote": ""}
                            onClick={this.upClick}></span>
                        <span className="vote-count" id={upvote==="true"? "upvote": ""}>{this.state.count}</span>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, {getCommentVote})(Comment)