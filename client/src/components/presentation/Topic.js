import React from 'react'
import './Topic.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getVote, commentNo} from "../../actions/users";

class Topic extends React.Component {
    state = {
        data: {
            quesId: this.props.currentTopic._id,
            username: this.props.username,
            upvote: false
        },
        count: 0,
        commentno: 0
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
        let obj = {"id": this.props.currentTopic._id, username: this.props.username};
        let data = JSON.stringify(obj);
        this.props.getVote(data).then(result => {
            if(result.result[0].upvote[0] === this.props.username)
            {
                let data = {...this.state.data};
                data.upvote = "true";
                this.setState({data});
                //console.log(data);
            }

            this.setState({
                count: result.result[0].count
            })
        });

        this.props.commentNo(this.props.currentTopic._id).then(result => {
            this.setState({
                commentno: result.result
            })
            //console.log(result)
        })
    }


    render(){
        const {upvote} = this.state.data;
        const { isConfirmed } = this.props;
        const { question, username, desc, category, timestamp, _id } = this.props.currentTopic;
        return(
                <div id="wrapper-topic" className="container">
                    <div id="user">
                        <img className="img-fluid rounded-circle"
                             src= "https://cdn.woorkup.com/wp-content/uploads/2016/04/gravatar.png"
                             style={{width: "60px"}}
                             alt="Gravatar"/><br/>
                        <hr/>
                        <span>{username}</span>
                    </div>

                    <div className="content">
                        <Link to={"/topic/" + _id} style={{textDecoration: 'none'}}><h4>{question}</h4></Link>
                        <p>
                            {desc}
                        </p>
                    </div>
                    <hr/>
                    <div className="detail">
                        <div id="detail-inner">
                            <i className="fa fa-comment"></i>
                            <span id="no">{this.state.commentno}</span>
                            <span style={{padding: "10px"}}></span>
                            <i
                                className="fa fa-thumbs-o-up"
                                id={upvote==="true"? "upvote": ""}
                            ></i>
                            <span id="no">{this.state.count}</span>
                            <hr/>
                            <div id="time">
                                <span >{timestamp}</span>
                                <span> |{category}</span>
                            </div>
                        </div>
                    </div>

                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isConfirmed: state.user.confirmed,
        username: state.user.username
    }
}

export default connect(mapStateToProps, {getVote, commentNo})(Topic);