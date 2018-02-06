import React from 'react'
import './TopicDetail.css'
import gravatarUrl from "gravatar-url"
import {connect} from 'react-redux'
import {getVote} from '../../actions/users'

class TopicDetail extends React.Component{
    state={
        data: {
            quesId: this.props.id,
            username: this.props.user.username,
            upvote: false
        },
      count: 0
    };

    componentDidMount() {
        //console.log(this.props.id);
        let obj = {"id": this.props.id, username: this.props.user.username};
        let data = JSON.stringify(obj);
        this.props.getVote(data).then(result => {
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

    render(){
        const {upvote} = this.state.data;
        const { question, username, desc, category, timestamp, _id} = this.props.topicDetail;
        return(
                <div className="container" id="question-detail">
                    <div id="user">
                        <img className="img-fluid rounded-circle"
                             src={gravatarUrl(this.props.user.email, { size: 60, default: 'mm'})}
                             alt="Gravatar"/><br/>
                        <hr/>
                        <span>{username}</span>
                    </div>
                    <div id="detail">
                        <h1>{question}</h1>

                        <p>
                            {desc}
                        </p>
                    </div>
                    <div id="voting">
                        <div id="votebox">
                            <span
                                className="fa fa-arrow-up vote up"
                                id={upvote==="true"? "upvote": ""}
                                onClick={this.upClick}></span>
                            <span className="vote-count">{this.state.count}</span>
                            <hr/>
                            <span id="category">{category}</span>
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

export default connect(mapStateToProps, {getVote})(TopicDetail)