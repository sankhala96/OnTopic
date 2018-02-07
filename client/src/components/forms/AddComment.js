import React from 'react'
import { connect } from 'react-redux'
import './AddComment.css'

class AddComment extends React.Component{
    state = {
        comment: {
            quesId: this.props.id,
            body: "",
            username: this.props.username
        },
        errors : {}
    };

    onChange = e => {
        this.setState({
            comment: {...this.state.comment, [e.target.name]: e.target.value}
        });
    };

    submit = e => {
      e.preventDefault();
        const errors = this.validate(this.state.comment);
        this.setState({errors});
        if(Object.keys(errors).length === 0){
            this.setState({loading: true});
            this.props
                .submit(this.state.comment)
        }
        document.getElementById("comment-body").value = "";
    };

    validate = data => {
        const errors = {};
        if(!data.body) errors.body = "can't be black";

        return errors;
    };

    render(){
        const { comment, errors} = this.state;
        return(
            <div id="comment">
                <div id="user">
                    <img className="img-fluid rounded-circle"
                         src= "https://cdn.woorkup.com/wp-content/uploads/2016/04/gravatar.png"
                         style={{width: "60px"}}
                         alt="Gravatar"/><br/>
                    <hr/>
                    <span>{this.props.username}</span>
                </div>
                <div id="comment-box">
                    <form id="form" onSubmit={this.submit}>
                        <div className="form-group">
                        <textarea
                            rows="4"
                            cols="100"
                            id="comment-body"
                            name="body"
                            placeholder="post your reply"
                            value={comment.body}
                            onChange={this.onChange}
                            className={
                                errors.body ? "form-control is-invalid" : "form-control"
                            }
                        />
                            <div className="invalid-feedback">{errors.body}</div>
                        </div>

                        <button className="btn btn-info" type="submit">Submit</button>
                    </form>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.user.username
    }
}

export default connect(mapStateToProps)(AddComment)