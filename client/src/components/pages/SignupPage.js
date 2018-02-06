import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signup } from '../../actions/users'
import SignupForm from '../forms/SignupForm'

class SignupPage extends React.Component {
    submit = data =>
        this.props.signup(data).then(() => this.props.history.push("/dashboard"));

    render(){
        return(
            <div className="container-fluid"
                 style={{
                     backgroundImage: `url("https://qsf.ec.quoracdn.net/-3-images.Illustration_fb_share_default_1280x720.png-26-b9513ebe3b7bfd7b.png")`,
                     backgroundColor: "#000"
                 }}
            >
                <div className="container" style={{ height: "100vh" }}>
                    <div className="row align-items-center" style={{ height: "100vh" }}>
                        <div className="col col-xs-12 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3">
                            <div className="card">
                                <h2 className="card-header">Join the Club!</h2>
                                <div className="card-body">
                                    <SignupForm submit={this.submit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);