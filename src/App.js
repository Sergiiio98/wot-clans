import logo from './logo.svg';
import './App.css';
import Sh_vi from "./Sh_vi"



function App() {
  return (
    <div className="App">
      <div className="topBar">
        <h1>Klasyfikacja klanów pod względem Elo</h1>
        <button>X</button>
        <button id="VIII">VIII</button>
        <button>VI</button>
      </div>
      <div className="label">
        <h5>lp.</h5>

        <h5 className="labelbar">elo rating</h5>
        <h5>28d</h5>
        <h5>WR %</h5>
      </div>
      <div className="ScrollDiv">
        <Sh_vi/>
      </div>
    </div>
  );
}

export default App;
