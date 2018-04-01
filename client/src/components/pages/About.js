import React from 'react'
import TopNavigation from '../navigation/TopNavigation'


class About extends React.Component {
    render(){
        return(
            <div className="container-fluid" style={{padding: 0}}>
                <div>
                    <TopNavigation />
                </div>

                <div className="row"
                     style={{
                        backgroundColor: "#CCD1D1",
                        width: "100%",
                         height: "350px",
                         padding: 0,
                         margin: 0
                }}>
                    <div className="col-xs-12 col-sm-6"
                         style={{
                             padding: "50px"
                         }}
                    >
                        <img id="image-header" src="https://www.ontopic.today/wp-content/uploads/Logo_332x100.png" />
                    </div>

                    <div className="col-xs-12 col-sm-6"
                         style={{
                             padding: "50px",
                             fontsize: 20,
                             fontWeight: "bold",
                             fontfamily: "Tahoma, Geneva, sans-serif",

                         }}
                    >
                        <p>
                            This project “OnTopic Discussion Forum” is made for providing a platform for having discussions.
                            This forum provides the platform under one roof to interact with different members who may be experts in a particular field or a normal student for seeking or to give advices.
                        </p>
                    </div>
                </div>
            </div>

        )
    }
}

export default About