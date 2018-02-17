import React from 'react'
import { connect } from 'react-redux'
import './ProfilePage.css'
import Topnavigation from '../navigation/TopNavigation'

class ProfilePage extends React.Component{
    state = {
        list: ["Answers", "Question"],
        selected: ''
    };

    handleSelect =(item) =>{
        //event.preventDefault();
        console.log(item);
        this.setState({ selected: item});
        //console.log(this.state.selected)
    };


    render(){
        const listItem = this.state.list.map((item, i) => {
            //let selected = (i=== this.state.selected);
            return(
                <li key={i} value={i} onClick={this.handleSelect.bind(this,item)} style={{listStyle: "none"}}>
                    <a>{item}</a>
                </li>
            )
        });

        return(
            <div className="container-fluid" style={{padding:"0"}}>
                <Topnavigation/>

                <div className="container-fluid" id="profile-main">
                    <div className="container" id="profile">
                        <div id="profile-user">
                            <img className="img-fluid rounded-circle"
                                 src= "https://cdn.woorkup.com/wp-content/uploads/2016/04/gravatar.png"
                                 style={{width: "100px"}}
                                 alt="Gravatar"/>
                        </div>
                        <div id="profile-info">
                            <h3>{this.props.user.username}</h3>
                            <span>{this.props.user.email}</span>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row" style={{paddingTop: "30px"}}>
                            <div className="col-xs-12 col-sm-6" id="profile-feeds">
                                <span style={{fontWeight: "bold", fontSize: "18px"}}>Feeds</span><br/>
                                <hr/>
                                <ul id="feeds-list">
                                    {listItem}
                                </ul>
                            </div>

                            <div className="col-xs-12 col-sm-6" id="profile-feeds-detail">

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(ProfilePage)