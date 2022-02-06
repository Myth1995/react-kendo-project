import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from  './components/Home';
import Detail from './components/Detail';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([])
  
  useEffect(()=>{
    getData();
  }, []);
  
  const getData = ()=>{
    fetch('mocks.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log("mocks:", response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson);
      });
  }
  
  return (
    <div className="App">
      {data && data.length > 0 &&
      <Router>
        <Routes>
          <Route path="/" element={<Home userList={data} />}/>
          <Route path="/:id" element={<Detail/>}/>
        </Routes>
      </Router>}
    </div>
  );
}

export default App;
