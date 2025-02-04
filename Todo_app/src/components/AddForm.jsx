import {useState} from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

export default function AddFrom(){
    const [task, setTask]=useState(" ");
    const dispatch = useDispatch();

    const submitHandler=(evt)=> {
        evt.preventDefault();
        console.log(task);
        dispatch(addTodo(task))//[Trigger...]todoSlice--->15 no. line..
        setTask("");
    };
    return (
    <>
        <form onSubmit={submitHandler}>
            <input type="text" onChange={(e)=> setTask(e.target.value)}></input>
            <button>Add Task</button>
        </form>
    </>
    );
}