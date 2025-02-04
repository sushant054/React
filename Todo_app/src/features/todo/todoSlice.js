import { createSlice, nanoid } from '@reduxjs/toolkit'
//initial state
const initialState={
    todos:[{id:"abc",task:"demo-task",isDone:false}],

};

export const todoSlice=createSlice({
    name:"todo",
    initialState,
    reducers:{//state,action
    addTodo:(state,action)=>{
        const newTodo={
            id:nanoid(),
            task:action.payload,
            isDone:false,
        };
        state.todos.push(newTodo);//direct mutaiton of array..
    },
    //2nd reducer
    deleteTodo:(state,action)=>{
      state.todos= state.todo.filter((todo)=> todo.id != action.payload)
    },
    marksAsDone:(state,action)=>{
        //we have our id in action.payload
      state.todos=  state.todos.map((todo)=>{
            if(todo.id === action.payload){
                todo.isDone = true;

            }
        });
//now here we have total 3 reducers..
    }
    }
});


// Action creators are generated for each case reducer function
export const {addTodo, deleteTodo, marksAsDone}=todoSlice.actions;
export default todoSlice.reducer;
