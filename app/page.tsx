import React from 'react'
import Link from 'next/link';
import TodoItem from './components/TodoItem';
import Card from './components/Card';
import Button from './components/Button';
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
  // fetch todos on the server
  let todos: Todo[] = [];
  try {
    todos = await serviceGetTodos();
  } catch (err) {
    todos = [];
  }

  return (
    <div className="flex flex-col  rounded-md mx-auto justify-center items-center gap-4 mt-9 p-5 w-full max-w-3xl">
      <Card className="w-full relative">
        <div className="fab-top-right">
          <Link href="/new" aria-label="Create new todo">
            <Button as="a" className="fab rounded-full p-3 shadow-md motion transform transition hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Create todo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </Link>
        </div>
        <div className="text-5xl font-bold mb-5 text-primary text-center">TODO List</div>
        <div className="w-full max-w-md mx-auto">
          <ul className="flex flex-col items-center w-full">
            {todos.length === 0 ? (
              <li className="text-muted">No todos yet — create one!</li>
            ) : (
              todos.map((todo) => (
                <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} deleteTodo={DeleteTodo} />
              ))
            )}
          </ul>
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/new" aria-label="Add new todo">
            <Button as="a" className="add-btn rounded-full px-4 py-2 border-2 border-[var(--border)] bg-transparent text-primary flex items-center gap-2 motion hover:scale-105" aria-label="Add new todo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-medium">Add New</span>
            </Button>
          </Link>
        </div>

      </Card>
    </div>
  );
}
