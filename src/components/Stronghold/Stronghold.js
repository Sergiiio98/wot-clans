import React, { Component } from "react";
import ClanList from "../ClanList/ClanList";
import "./Stronghold.css";

class Stronghold extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tierNumberState: 2,
    };
    this.conditionalRender = this.conditionalRender.bind(this);
  }

  conditionalRender(tierNumber) {
    switch (tierNumber) {
      case 0:
        return (
          <div>
            <ClanList key="tierVI" tierState={0} />
          </div>
        );
      case 1:
        return (
          <div>
            <ClanList key="tierVIII" tierState={1} />
          </div>
        );
      case 2:
        return (
          <div>
            <ClanList key="tierX" tierState={2} />
          </div>
        );
    }
  }

  render() {
    return (
      <div id="navigationBar">
        <div>
          <h1>Klasyfikacja klanów pod względem Elo</h1>
        </div>
        <div>
          <div id="buttonsDiv">
            <button onClick={() => this.setState({ tierNumberState: 2 })}>
              X
            </button>
            <button
              onClick={() => this.setState({ tierNumberState: 1 })}
              id="VIII"
            >
              VIII
            </button>
            <button onClick={() => this.setState({ tierNumberState: 0 })}>
              VI
            </button>
          </div>

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
