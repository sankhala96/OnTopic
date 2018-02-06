import React from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import TopNavigation from '../navigation/TopNavigation'
import AddQuestion from '../forms/AddQuestion'
import {addQ} from '../../actions/users'

class AddQuestionPage extends React.Component{
    submit = data => {
        this.props.addQ(data).then(() => this.props.history.push("/dashboard"))
    };

    render(){
        return(
            <div className="container-fluid" style={{padding: "0"}}>
                <div>
                    <TopNavigation/>
                </div>
                <div className="container-fluid" style={{backgroundColor: "#dddddd", padding: "50px"}}>
                    <AddQuestion submit={this.submit}/>
                </div>
            </div>
        )
    }
}

AddQuestionPage.propTypes = {
    addQ: PropTypes.func.isRequired,
};

export default connect(null, {addQ})(AddQuestionPage)