import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from  './components/Home';
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/:id" element={<Detail/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
