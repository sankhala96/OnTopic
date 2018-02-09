import React from 'react'
import './Topics.css'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { getQ, getQC, vote, getVote } from '../../actions/users'
import Topic from '../presentation/Topic'

class Topics extends React.Component{
    state = {
        list: [],
        selected: '',
        voteList: []
    };


    upClick = data => {
      this.props.vote(data).then((result) => {
          console.log(result)
      })
    };


    componentDidMount() {
        this.props.getQ().then((result) => {
            this.setState({ list: result.result});
            //console.log(result.result)
        });


    };

    componentWillReceiveProps(nextProps){
        console.log(nextProps.category);

        this.props.getQC(nextProps.category).then((result) => {
            this.setState({ list: result.result});
           //console.log(result)
        })
    };

    render(){
        const listItem = this.state.list.map((topic, i) => {
           return(
               <li key={i} style={{listStyle: "none"}}>
                   <Topic index={i} currentTopic={topic} upClick={this.upClick}/>
               </li>
           )
        });
        return(
            <div>
                <ol style={{padding: '0'}}>
                    {listItem}
                </ol>
            </div>
        )
    }
}

Topics.propTypes = {
    // history: PropTypes.shape({
    //     push: PropTypes.func.isRequired
    // }).isRequired,
    getQ: PropTypes.func.isRequired,
    getQC: PropTypes.func.isRequired,
    vote: PropTypes.func.isRequired,
    getVote: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        username: state.user.username
    }
}

export default connect(mapStateToProps, { getQ, getQC, vote, getVote})(Topics)