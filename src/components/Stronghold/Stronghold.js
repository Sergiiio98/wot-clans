import React, { Component } from 'react';
import Sh_vi from "../ClanList/ClanList";



class Stronghold extends Component {
    constructor(props){
        super(props);
        this.state={
            tierNumberState: 2
        }
        this.conditionalRender = this.conditionalRender.bind(this);
    }

    conditionalRender(tierNumber) {
        switch(tierNumber){
          case 0:
            return (
              <div>
                <Sh_vi key="tierVI" tierState={0}/>
              </div>
            )
          case 1: 
            return (
              <div>
                 <Sh_vi key="tierVIII" tierState={1}/>
              </div>
            )
          case 2: 
            return (
              <div>
                 <Sh_vi key="tierX" tierState={2}/>
              </div>
            )
        }
      }

    render() {
        return (
            <div>
              <div className="topBar">
                <h1>Klasyfikacja klanów pod względem Elo</h1>
              </div>
                <div>
                    <button onClick={() => this.setState({tierNumberState: 2})}>X</button>
                    <button onClick={() => this.setState({tierNumberState: 1})}id="VIII">VIII</button>
                    <button onClick={() => this.setState({tierNumberState: 0})}>VI</button>
                    <div className="label">
                        <h5>lp.</h5>
                        <h5 className="labelbar">elo rating</h5>
                        <h5>28d</h5>
                        <h5>WR %</h5>
                    </div>
                </div>
                <div className="ScrollDiv">
                    {this.conditionalRender(this.state.tierNumberState)}
                </div>
            </div>
          );
    }
}
 
export default Stronghold;

