import './App.css';
import Sh_vi from "./components/Sh_vi/Sh_vi"




function App() {
  return (
    <div className="App">
      <div className="topBar">
        <h1>Klasyfikacja klanów pod względem Elo</h1>
        
      </div>
      
      <div className="ScrollDiv">
        <Sh_vi/>
      </div>
    </div>
  );
}

export default App;



