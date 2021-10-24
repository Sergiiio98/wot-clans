import React, { Component } from 'react';
import "./Clan.css";


class Clan extends Component {
    constructor(props){
        super(props);
        
    }

   
    
    render() {
        return (
            <div className="ClanRow">
                <h5>{this.props.clanRank+1}</h5>
                <img src={this.props.logo}></img>
                <h5>[{this.props.clanName}]</h5>
                <h5>{this.props.clanElo}</h5>
            </div>
          );
    }
}
 
export default Clan;

