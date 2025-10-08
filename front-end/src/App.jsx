import { Route, Routes } from 'react-router-dom';
import Auth from './page/auth'
import Register from './page/register'
import Home from './page/Home'
import Listevent from './compenant/Listevent'
import EventDetails from './compenant/Detailsevent'
import Headers from './compenant/header'
import './App.css'

function App() {
  return (
    <>
    <Headers />
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/events" element={<Listevent />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </>
  )
}

export default App
