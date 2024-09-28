import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos]= useState([])
  // console.log(todos);
  
  
  useEffect(() => {
    setInterval(() => {
      fetch("http://localhost:3000/todos")
      .then(async function(res){
        const json = await res.json();
        setTodos(json)
      })
    }, 1000);

  }, [])

  return (
    <div>
      <h1>2Do FullStack APP</h1>
      <h4>By anwesh</h4>
      <CreateTodo></CreateTodo>
      <Todos todos={todos}></Todos>
    </div>
  )
}

export default App
