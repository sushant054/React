import { useState } from 'react'
  import './App.css';
import Timer from "./components/timer/Timer";

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className="app">
    <Timer/>
   </div>
  )
}

export default App
 