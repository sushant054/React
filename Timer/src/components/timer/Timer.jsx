import React from "react";
import {useState,useRef} from "react";
import './timer.css';

function Timer(){
    let [timer,setTimer]=useState(0);
    let [timerId,setTimerId]= useState();
    //let timerId=useRef(); 

    const startTimer=()=>{
        //timerId.current=setInterval(()...)
        setTimerId( setInterval(()=>{
            setTimer((prevTimer)=>prevTimer + 1); 
            console.log("working");
        },1000) );
    };

    const stopTimer=()=>{
        clearInterval(timerId);
    }

    const resetTimer =()=>{
        setTimer(0);
    }
     return ( 
        <div class="box" style={{width:"500px",
        margin:"100px auto",
        textAlign:"center",
        boxShadow:"0 0 10px black",
        padding:"50px"}}>
            <h2>Timer Value is :{timer} </h2><br/>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>clear</button>
 
        </div>
     )
}

export default Timer;