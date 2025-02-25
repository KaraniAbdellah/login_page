import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import {Routes, Route} from "react-router";


function App() {
  return (
    <div className='App justify-center flex items-center'>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
      </Routes>
    </div>
  )
}

export default App
