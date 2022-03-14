import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Characters from './routes/Characters'
import Episodes from './routes/Episodes'
import Locations from './routes/Locations'
import './App.css';
import { Button } from '@mui/material';
import logo from '../assets/img/logo.png'


export default function App() {

  return (
    <div>
      <Router>
        <div className='nav'>
          <div className='image'>
            <img src={logo} alt="Logo rick and morty" />
          </div>
          <ul className='nav-inside'>
            <li><Link to="/rick-and-morty/"><Button>Characters</Button></Link></li>
            <li><Link to="/rick-and-morty/episodes"><Button>Episodes</Button></Link></li>
            <li><Link to="/rick-and-morty/locations"><Button>Locations</Button></Link></li>
          </ul>
        </div>
        <Routes>
          <Route path="/rick-and-morty/" element={<Characters />} />
          <Route path="/rick-and-morty/episodes" element={<Episodes />} />
          <Route path="/rick-and-morty/locations" element={<Locations />} />
        </Routes>
      </Router>
    </div>
  )

}
