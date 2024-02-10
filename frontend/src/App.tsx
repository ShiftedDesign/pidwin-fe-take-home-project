import "./App.css";
import { Keyboard } from "./components/Keyboard";

function App() {
  return (
    <div className="App">
      <Keyboard
        onKeyPress={(key) => {
          console.log(key);
        }}
      />
    </div>
  );
}

export default App;
