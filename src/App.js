import "./App.css";
import Room from "./component/Room";
import Footer from "./component/Footer";
import { MyContextProvider } from "./component/Context";

function App() {
  return (
    <div className="App">
      <MyContextProvider>
        <Room />
        <Footer />
      </MyContextProvider>
    </div>
  );
}

export default App;
