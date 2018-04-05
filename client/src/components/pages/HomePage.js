import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Container,Row,Col} from 'reactstrap'
import Typed from 'typed.js'
import Particles from 'react-particles-js'

class HomePage extends React.Component{
    render(){
        return(
            <div style={{padding: 0}}>
                { this.props.isAuthenticated && <Redirect to="/dashboard" />}
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
                        backgroundColor: '#000',
                        height: '100vh'
                    }}
                />
                <Container fluid style={{
                    height: "100vh",
                    color: "white",
                    position: "absolute",
                    top: "0px"
                    // background: "linear-gradient(to right, #692022, #1b1819)"
                }}>
                    <Row className="align-items-center justify-content-center text-center"
                         style={{ height: "100%" }}>

                        <Col xs={12} sm={6}>
                            <img
                                className="img-fluid"
                                alt="Adventurers League Logo"
                                src="https://www.ontopic.today/wp-content/uploads/Logo_332x100.png"
                            />

                            <TypedReactDemo
                                strings={[
                                    'Learn',
                                    '<i>Share </i>',
                                    '& Solve!'
                                ]}
                            />
                        </Col>
                        <Col
                            xs={12}
                            sm={6}
                            style={{
                                fontFamily: "'Open Sans', sans-serif"
                            }}
                        >
                            <h1
                                style={{
                                    boxShadow:
                                        "6px 0 0 rgba(20,12,10, .7), -6px 0 0 rgba(20,12,10, .7)",
                                    background: "rgba(20,12,10, .7)",
                                    lineHeight: "3rem"
                                }}
                            >
                                BECOME AN EXPLORER!
                            </h1>

                            <br />
                            <div className="text-center">
                                <Link
                                    to="/signup"
                                    className="btn btn-primary btn-lg"
                                    style={{
                                        backgroundColor: "#9c0b0e",
                                        border: "none"
                                    }}
                                >
                                    JOIN THE COMMUNITY!
                                </Link>
                            </div>
                            <br/>
                            <div className="text-center">Or</div>
                            <br/>
                            <div className="text-center">
                                <Link
                                    to="/login"
                                    className="btn btn-primary btn-lg"
                                    style={{
                                        backgroundColor: "#9c0b0e",
                                        border: "none"
                                    }}
                                >
                                    Login
                                </Link>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }
}

class TypedReactDemo extends React.Component {
    componentDidMount() {
        // If you want to pass more options as props, simply add
        // your desired props to this destructuring assignment.
        const { strings } = this.props;
        // You can pass other options here, such as typing speed, back speed, etc.
        const options = {
            strings: strings,
            typeSpeed: 50,
            backSpeed: 50,
            loop: true,
            loopCount: Infinity
        };
        // this.el refers to the <span> in the render() method
        this.typed = new Typed(this.el, options);
    }

    componentWillUnmount() {
        // Make sure to destroy Typed instance on unmounting
        // to prevent memory leaks
        this.typed.destroy();
    }

    render() {
        return (
            <div className="wrap">
                <div className="type-wrap">
                    <span
                          style={{
                              whiteSpace: 'pre',
                              fontSize: '22px',
                              fontFamily: "'Open Sans', sans-serif",
                              boxShadow:
                                  "6px 0 0 rgba(20,12,10, .7), -6px 0 0 rgba(20,12,10, .7)",
                              background: "rgba(20,12,10, .7)",
                              lineHeight: "3rem"
                          }}
                          ref={(el) => { this.el = el; }}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        isAuthenticated: !!state.user.email
    };
}


export default connect(mapStateToProps)(HomePage);