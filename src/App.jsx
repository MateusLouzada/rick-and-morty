import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Characters from './routes/Characters'
import Episodes from './routes/Episodes'
import Locations from './routes/Locations'
import './App.css';


export default function App() {

  return (
    <div>
      <Router>
        <div className='nav'>
          <div className='image'>
            <img src="../assets/img/logo.png" alt="Logo rick and morty" />
          </div>
          <ul className='nav-inside'>
            <li><Link to="/"><button>Characters</button></Link></li>
            <li><Link to="episodes"><button>Episodes</button></Link></li>
            <li><Link to="locations"><button>Locations</button></Link></li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="episodes" element={<Episodes />} />
          <Route path="locations" element={<Locations />} />
        </Routes>
      </Router>
    </div>
  )

}
