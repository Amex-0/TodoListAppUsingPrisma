
import React from 'react'
import Link from 'next/link';
import TodoItem from './components/TodoItem';
import { redirect } from 'next/navigation';
import type { Todo } from './generated/prisma/client';
import { getTodos as serviceGetTodos, toggleTodo as serviceToggleTodo, deleteTodo as serviceDeleteTodo } from './services/todo';

async function toggleTodo(id: string, complete: boolean){
  "use server"
  const res = await serviceToggleTodo(id, complete);
  if (!res) throw new Error('Todo not found');
}

async function DeleteTodo(id: string){
  "use server"
  const deleted = await serviceDeleteTodo(id);
  // deleted = number of rows deleted
  redirect("/")
}
export default async function Home() {
// await prisma.todo.create({
//   data:{
//     title: "Test ",
//     complete : false 
//   }
// })
  const todos: Todo[] = await serviceGetTodos(); 
  return (
    <div  className='flex flex-col  border-blue-400
    border-2 border-hidden rounded-md mx-auto 
    justify-center  items-center gap-4 mt-19 p-5'>
      <div className='text-5xl font-bold mb-5 text-blue-400 '>
      TODO List 

      </div>
      
      <ul>
        {todos.map((todo) => (
          <TodoItem key = {todo.id} {...todo} toggleTodo= {toggleTodo} deleteTodo={DeleteTodo}/>
        ))}
      </ul>
      <Link href = "/new"
      className='border-2 p-2 border-blue-300 hover:bg-blue-400 '
      >
      Create New Todo 
      </Link>
    </div>
  )
}

