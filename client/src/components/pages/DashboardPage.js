import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './DashboardPage.css'
import TopNavigation from '../navigation/TopNavigation'
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import Topics from '../containers/Topics'

class DashboardPage extends React.Component {
    state = {
        list: ["All", "CS-IT", "Electronics", "Mechanical", "Civil", "Commerce"],
        selected: ''
    };


    handleSelect =(item) =>{
        //event.preventDefault();
        console.log(item);
        this.setState({ selected: item});
        //console.log(this.state.selected)
    };

    render() {
        const listItem = this.state.list.map((item, i) => {
            //let selected = (i=== this.state.selected);
            return(
                <li key={i} value={i} onClick={this.handleSelect.bind(this,item)} style={{listStyle: "none"}}>
                    <a>{item}</a>
                </li>
            )
        });
        const { isConfirmed } = this.props;
        return (
            <div className="container-fluid" id="main">
                <div>
                    <TopNavigation/>
                </div>
                {!isConfirmed && <ConfirmEmailMessage />}

                <div className="container-fluid" id="content">
                    <div className="row" style={{padding: "50px"}}>
                        <div className="col-xs-12 col-sm-6 container" id="sidebar-nav">
                            <ul id="category">
                                {listItem}
                            </ul>

                        </div>

                        <div className="col-xs-12 col-sm-6 container-fluid" style={{margin: "0", width:"100%"}}>
                            <Topics category={this.state.selected}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isConfirmed: !!state.user.confirmed
    };
}

export default connect(mapStateToProps)(DashboardPage);