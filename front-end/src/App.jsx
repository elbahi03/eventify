import { Route, Routes } from 'react-router-dom';
import Auth from './page/auth'
import Register from './page/register'
import Dash from './page/dash';

import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dash/>} />
      </Routes>
    </>
  )
}

export default App
