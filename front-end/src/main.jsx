import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import store from './app/store.js'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
      <App />
      </Provider>
    </StrictMode>
  </BrowserRouter>,
)
