import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home';
import AppRoutes from './routes';
import ScrollToTop from './ScrollToTop ';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ScrollToTop/>
    <AppRoutes/>

    </>
  )
}

export default App
