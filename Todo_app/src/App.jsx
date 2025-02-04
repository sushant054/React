import './App.css'
import Todo from './components/todo';
import { Provider } from "react-redux";
import {store} from "./app/store";
import Counter from './counter';


function App() {
 
  return (
    <>
    <Provider store={store}> 
      <Todo/>
      </Provider>
      {/* <Counter/> */}
    </>
  )
}

export default App
