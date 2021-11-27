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
      {/* <div className="ScrollDiv"> */}
        <Sh_vi/>
      {/* </div> */}
    </div>
  );
}

export default App;
