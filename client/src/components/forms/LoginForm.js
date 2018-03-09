import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Validator from "validator";
import GoogleLogin from 'react-google-login';


class LoginForm extends React.Component {
    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {}
    };

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props
                .submit(this.state.data)
                .catch(err =>
                    this.setState({ errors: err.response.data.errors, loading: false })
                );
        }
    };

    validate = data => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Can't be blank";
        return errors;
    };

    responseGoogle = (response) => {
        this.props.responseGoogle(response);
        console.log(response.profileObj);
    };

    render() {
        const { data, errors } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                {errors.global && (
                    <div className="alert alert-danger">{errors.global}</div>
                )}

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={this.onChange}
                        className={
                            errors.email ? "form-control is-invalid" : "form-control"
                        }
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={this.onChange}
                        className={
                            errors.password ? "form-control is-invalid" : "form-control"
                        }
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Login
                </button>

                <small className="form-text text-center">
                    <Link to="/signup">Sign up</Link> if you don't have an account<br />
                    <Link to="/forgot_password">Forgot Password?</Link>
                </small>
                <div style={{paddingTop: '10px', textAlign:'center'}}>
                    <GoogleLogin
                        clientId="1006511207493-vd9t86gt62lbe24l88hc5uso8h3vv3e9.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                    />
                </div>
            </form>
        );
    }
}
LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};
export default LoginForm;