import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductId from './pages/ProductId'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import AppNavbar from './components/AppNavbar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  const [count, setCount] = useState(0)

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <AppNavbar />
      {isLoading && <LoadingScreen />}
      <Container className='my-5'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<ProductId />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/purchases' element={<Purchases />} />
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
