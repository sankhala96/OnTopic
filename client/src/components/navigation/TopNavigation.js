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
import Particles from 'react-particles-js'

class TopNavigation extends React.Component {
    state = {
        isOpen: false
    };

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        const { user, logout } = this.props;

        return (
            <div className="container-fluid" style={{padding: "0", backgroundColor: "#000"}}>
                <div className="container-fluid" id="header" style={{
                    height: "250px",
                    padding: "0"
                }}>
                    <Particles
                        params={{
                            particles: {
                                number: {
                                    value:150,
                                    density: {
                                        enable: true,
                                        value_area: 800
                                    }},
                                color:{value:"#ffffff"},
                                shape: {
                                    type: "circle",
                                    stroke: {
                                        width:0,
                                        color:"#000000"
                                    },
                                    polygon:{
                                        nb_sides:5
                                    },
                                    image:{
                                        src:"img/github.svg",
                                        width:100,
                                        height:100
                                    }},
                                opacity: {
                                    value:0.5,
                                    random:false,
                                    anim:{
                                        enable:false,
                                        speed:1,
                                        opacity_min:0.1,
                                        sync:false
                                    }},
                                size: {
                                    value: 3,
                                    random: true,
                                    anim: {
                                        enable: false,
                                        speed: 40,
                                        size_min: 0.1,
                                        sync: false
                                    }
                                },
                                line_linked: {
                                    enable: true,
                                    distance: 150,
                                    color: "#ffffff",
                                    opacity: 0.4,
                                    width: 1
                                },
                                move: {
                                    enable: true,
                                    speed: 6,
                                    direction: "none",
                                    random: false,
                                    straight: false,
                                    out_mode: "out",
                                    bounce: false,
                                    attract: {
                                        enable: false,
                                        rotateX: 600,
                                        rotateY: 1200
                                    }
                                }
                            },
                            interactivity: {
                                detect_on: "canvas",
                                events: {
                                    onhover: {
                                        enable: true,
                                        mode: "repulse"
                                    },
                                    onclick: {
                                        enable: true,
                                        mode: "push"
                                    },
                                    resize: true
                                },
                                modes: {
                                    grab: {
                                        distance: 400,
                                        line_linked: {
                                            opacity: 1
                                        }
                                    },
                                    bubble: {
                                        distance: 400,
                                        size: 40,
                                        duration: 2,
                                        opacity: 8,
                                        speed: 3
                                    },
                                    repulse: {
                                        distance: 200,
                                        duration: 0.4
                                    },
                                    push: {
                                        particles_nb: 4
                                    },
                                    remove: {
                                        particles_nb: 2
                                    }
                                }
                            },
                            retina_detect: true
                        }
                        }
                        style={{
                            width: '100%',
                            maxHeight: '250px',
                            backgroundColor: '#000'
                        }}
                    />

                    {/*<img id="image-header" src="https://www.ontopic.today/wp-content/uploads/Logo_332x100.png" />*/}
                </div>
                <Navbar dark expand="sm" color="faded">
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

                            <NavItem>
                                <NavLink
                                    tag={RouterNavLink}
                                    activeClassName="active"
                                    to="/about"
                                >
                                    About Us
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