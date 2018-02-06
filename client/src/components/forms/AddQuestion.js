import React from 'react'
import {connect} from 'react-redux'
import './AddQuestion.css'

class AddQuestion1 extends React.Component{
    state = {
        data: {
            question: "",
            desc: "",
            category: "",
            username: this.props.username
        },
        errors: {}
    };

    onChange = e => {
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            this.props
                .submit(this.state.data)
            //  .catch(err =>
            //      this.setState({errors: err.response.data.errors, loading: false})
            // );
        }
    };

    validate = data => {
        const errors = {};
        if(!data.question) errors.question = "Can't be blank";
        if (!data.desc) errors.desc = "Can't be blank";
        return errors;
    };

    render(){
        const { data, errors } = this.state;
        return(
            <div className="container" id="question-form">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="question"
                            name="question"
                            placeholder="Question"
                            value={data.question}
                            onChange={this.onChange}
                            className={
                                errors.question ? "form-control is-invalid" : "form-control"
                            }
                        />
                        <div className="invalid-feedback">{errors.question}</div>
                    </div>
                    <div className="form-group">
                        <input
                            list="category"
                            name="category"
                            placeholder="Select Category"
                            onChange={this.onChange} />
                        <datalist id="category">
                            <option value="CS-IT"></option>
                            <option value="Electronics"></option>
                            <option value="Mechanical"></option>
                            <option value="Civil"></option>
                            <option value="Commerce"></option>
                        </datalist>
                    </div>
                    <div className="form-group">
                        <textarea
                            rows="6"
                            cols="100"
                            type="text"
                            id="desc"
                            name="desc"
                            placeholder="Add Description"
                            value={data.desc}
                            onChange={this.onChange}
                            className={
                                errors.desc ? "form-control is-invalid" : "form-control"
                            }
                        />
                        <div className="invalid-feedback">{errors.desc}</div>
                    </div>
                    <button className="btn btn-info" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.user.username
    }
}

export default connect(mapStateToProps)(AddQuestion1)