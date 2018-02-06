import React from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { addComment, getComment, voteComment } from '../../actions/users'
import Comment from '../presentation/Comment'
import AddComment from '../forms/AddComment'

class Comments extends React.Component {

    state = {
      list: []
    };

    componentDidMount() {
        //console.log(this.props.id);
        this.props.getComment(this.props.id).then((result) => {
            //console.log(result)
            this.setState({
                list: result.result
            })
        })
    }

    submit = data => {
        //console.log(data)
        this.props.addComment(data).then((result) => {
            let updateList = Object.assign([], this.state.list);
            updateList.push(result.result);
            this.setState({
                list: updateList
            })
        })
    };

    upClick = data => {
        this.props.voteComment(data).then((result) => {
            console.log(result)
        })
    };

    render(){
        const listItem = this.state.list.map((comment, i) => {
            //let selected = (i=== this.state.selected);
            return(
                <li key={i} style={{listStyle: "none"}}>
                    <Comment comment={comment} upClick={this.upClick}/>
                </li>
            )
        });

        return(
            <div>
                <div>
                    {listItem}
                </div>
                <div className="container">
                    <AddComment id = {this.props.id} submit={this.submit}/>
                </div>
            </div>
        )
    }
}

Comments.propTypes = {
    addComment: PropTypes.func.isRequired,
    getComment: PropTypes.func.isRequired
};

export default connect(null, { addComment, getComment, voteComment})(Comments)