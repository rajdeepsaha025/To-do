import './App.css'
import { Navbar } from './Navbar'
import { Todo } from './Todo'

function App() {

  return (
    <>
      <div className="justify-center content-center grid bg-gradient-to-t from-black to-blue-500 w-dvw h-dvh" >
        <Navbar />
        <Todo />
      </div>
    </>
  )
}

export default App
