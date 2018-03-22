import React from "react";
import PropTypes from "prop-types";
import {
    Navbar,
    Nav,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import * as actions from "../../actions/auth";
import { setLocale } from "../../actions/locale"

class TopNavigation extends React.Component {
    state = {
        isOpen: false
    };

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        const { user, logout } = this.props;

        return (
            <div className="container-fluid" style={{padding: "0"}}>
                <div className="container-fluid" id="header" style={{
                    background: "linear-gradient(to right, #692022, #1b1819)",
                    height: "250px",
                    padding: "0"
                }}>
                    <img id="image-header" src="https://www.ontopic.today/wp-content/uploads/Logo_332x100.png" />
                </div>
                <Navbar light expand="sm" color="faded">
                    <NavbarBrand tag={RouterNavLink} activeClassName="active" to="/">
                        <img style={{height: "60px"}}
                             src="https://www.ontopic.today/wp-content/uploads/Logo_332x100.png"
                        />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar style={{marginLeft: "40px"}}>
                            <NavItem>
                                <NavLink
                                    tag={RouterNavLink}
                                    activeClassName="active"
                                    to="/dashboard"
                                >
                                    <FormattedMessage
                                        id="nav.dashboard"
                                        defaultMessage="Dashboard"
                                    />
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    tag={RouterNavLink}
                                    activeClassName="active"
                                    to="/profile"
                                >
                                    My Account
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavLink
                                tag={RouterNavLink}
                                to="/addquestion"
                                className="btn btn-primary btn-sm"
                                style={{
                                    backgroundColor: "#9c0b0e",
                                    border: "none",
                                    fontFamily: "'Open Sans', sans-serif",
                                    color: "#ffffff",
                                    width: "100%",
                                    marginRight: "20px"
                                }}
                            >
                                Add Question
                            </NavLink>
                            <UncontrolledDropdown nav>
                                <DropdownToggle nav>
                                    <img
                                        className="img-fluid rounded-circle"
                                        src= {user.imageUrl}
                                        style={{width: "60px"}}
                                        alt="Gravatar"
                                    />
                                </DropdownToggle>
                                <DropdownMenu right style={{backgroundColor: "#000"}}>
                                    <DropdownItem style={{backgroundColor: "#000", color: "#ffffff"}}>My Account</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem style={{backgroundColor: '#000', color: '#ffffff'}} onClick={() => logout()}>Logout</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>

        );
    }
}

TopNavigation.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
    }).isRequired,
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { logout: actions.logout, setLocale }, null, {
    pure: false
})(TopNavigation);