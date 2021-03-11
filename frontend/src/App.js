import logo from './logo.svg';
import './App.css';
import './normalize.css';


function App() {
  return (
    <div className="App">

        <Introduction></Introduction>

    </div>
  );
}

function Introduction() {
    return (
        <div className="Introduction">
            <h1>Hey there! Welcome to Strategy Game</h1>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    );
}

export default App;
