import axios from 'axios';
import { useState } from 'react'
import { useEffect } from 'react';

function App() {
  const [data, setData] = useState(" ");
  const getData = async()=>{
    const responce =await axios.get("http://localhost:3000/getData");
    setData(responce.data);
  }
useEffect(()=>{getData()},[]);
  return (
   <div>
    {data}
   </div>
  )
}

export default App
