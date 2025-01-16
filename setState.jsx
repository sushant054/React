import {useState,React} from 'react';
function App(){
    const [count, setcounter]=useState(0)
    function updateCount(){
        setcounter(count + 1)
    }return (<><h1>Button Clicked {count} times</h1>
    <button onClick={updateCount}>Click</button></>
    );
}

export default App;
