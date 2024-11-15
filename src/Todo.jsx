import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

export const Todo = () => {

    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])

    useEffect(() => {
        let todos = JSON.parse(localStorage.getItem("todos"))
        console.log(todos)
        if (todos) {
            setTodos(todos)
        }
    }, [])


    const saveToLocalStorage = (params) => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    const handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
        setTodo("")
        saveToLocalStorage();
    }

    const handleEdit = (e, id) => {
        let t = todos.filter(i => i.id === id)
        setTodo(t[0].todo)
        let newTodos = todos.filter(item => {
            return item.id !== id
        });
        setTodos(newTodos)
        saveToLocalStorage()
    }

    const handleDelete = (e, id) => {
        let newTodos = todos.filter(item => {
            return item.id !== id
        });
        setTodos(newTodos)
        saveToLocalStorage()
    }

    const handleChange = (e) => {
        setTodo(e.target.value);
    }

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex(item => {
            return item.id === id
        })
        let newTodos = [...todos]
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos)
        saveToLocalStorage()
    }

    return (
        <>
            <div className="justify-self-start grid bg-white/30 backdrop-blur-sm p-2 rounded-b-3xl divide-y-2 w-full h-auto min-h-20">
                {todos.length ? <h2 className='font-semibold text-xl'>Tasks</h2> : <h2 className='font-semibold text-center text-xl'>Add Task</h2>}
                {todos.map(item => {
                    return (
                        <div key={item.id} className='relative my-1 w-96 h-10'>
                            <input type="checkbox" checked={item.isCompleted} onChange={handleCheckbox} name={item.id} className='top-2 left-2 absolute border-gray-300 bg-gray-100 rounded focus:ring-blue-500 w-5 h-5 text-blue-600' />
                            <span className={`border-none pb-0 bg-transparent rounded-full w-80 h-10 pl-10 font-semibold text-xl ${item.isCompleted ? "line-through decoration-pink-500" : ""}`}>{item.todo}</span>
                            <button onClick={(e) => handleEdit(e, item.id)} className='right-10 absolute bg-white/30 backdrop-blur-sm m-0.5 rounded-l-full ring-blue-500 hover:ring-4 h-10 font-semibold text-center text-xl aspect-square'>✏️</button>
                            <button onClick={(e) => handleDelete(e, item.id)} className='right-0 absolute bg-white/30 backdrop-blur-sm m-0.5 rounded-r-full ring-red-500 hover:ring-4 h-10 font-semibold text-center text-xl aspect-square'>⛔</button>
                        </div>)
                })}
                {/* Input for Adding Task  */}
                <div className='relative shadow-2xl my-2 rounded-full ring-amber-500 hover:ring-4 w-96 h-10'>
                    <input onChange={handleChange} value={todo} className="bg-white/50 backdrop-blur-sm rounded-full w-full h-10 font-semibold text-2xl text-center" placeholder="Write here..."></input>
                    <button onClick={handleAdd} className='right-0 absolute bg-amber-400 backdrop-blur-sm rounded-r-full h-10 font-semibold text-center text-xl aspect-square'>➕</button>
                </div>
            </div >

        </>

    )
}