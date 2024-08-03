import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Forms from './Pages/Forms'
import { ToastContainer} from 'react-toastify';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <ToastContainer/>
        <Forms/>
      </div>
      
    </>
  )
}

export default App
