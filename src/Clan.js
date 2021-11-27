import React, { Component } from 'react';
import "./Clan.css";


class Clan extends Component {
    constructor(props){
        super(props);
        
    }

   
    
    render() {
        return (
            <div className="ClanRow">
                <h5>{this.props.clanRank}</h5>
                <img className="logo" src={this.props.logo}></img>
                <h5 style={{color: this.props.color}}>[{this.props.clanName}]</h5>
                <h5>{this.props.clanElo}</h5>
            </div>
          );
    }
}
 
export default Clan;

