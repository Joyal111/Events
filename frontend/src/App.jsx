import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Events from './Components/Events'
import AdminEvents from './Components/AdminEvents'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Events />
   <AdminEvents />
    </>
  )
}

export default App
