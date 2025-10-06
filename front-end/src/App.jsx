import { Route, Routes } from 'react-router-dom';
import Auth from './page/auth'
import Register from './page/register'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
