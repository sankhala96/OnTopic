import React from 'react'
import { connect } from "react-redux";
import { get_topic, vote } from "../../actions/users";
import PropTypes from 'prop-types'
import TopNavigation from '../navigation/TopNavigation'
import TopicDetail from '../presentation/TopicDetail'
import Comments from "../containers/Comments";

class TopicPage extends React.Component {

    state = {
        data : ''
    };

    upClick = data => {
        this.props.vote(data).then((result) => {
            console.log(result)
        })
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.get_topic(id).then((result) => {
            this.setState({ data: result.result })
        })
    }


    render(){
        return(
            <div className="container-fluid" style={{padding: "0"}}>
                <div>
                    <TopNavigation/>
                </div>
                <div className="container-fluid" style={{backgroundColor: "#dddddd", padding: "50px"}}>
                    <div className="container">
                        <TopicDetail topicDetail={this.state.data} id = {this.props.match.params.id} upClick={this.upClick}/>
                    </div>
                    <div className="container">
                        <Comments id = {this.props.match.params.id}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        id: state.topic._id
    }
}

TopicPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default connect(mapStateToProps, {get_topic, vote})(TopicPage)