import React, { Component } from 'react';
import "./Clan.css";


class Clan extends Component {
    constructor(props){
        super(props);
        
    }

    render() {
        return (
            <div className="ClanRow">
                <div className="box">
                    <h5 id="number">{this.props.clanRank}</h5>
                </div>
                <div className="box">
                <img className="logo" src={this.props.logo}></img>
                </div>
                <div className="box">
                <h5 id="clanName" style={{color: this.props.color}}>[{this.props.clanName}]</h5>
                </div>
                <div className="box">
                <h5 id="elo">{this.props.clanElo}</h5>
                </div>
                <div className="box">
                <h5>{this.props.clanBattles}</h5>
                </div>
                <div className="box">
                <h5>{this.props.clanWinrate + "%"}</h5>
                </div>
            </div>
          );
    }
}
 
export default Clan;

