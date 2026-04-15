"use client"

import { useState, useTransition } from "react";


type TodoItemProps = {
    id : string; 
    title : string; 
    complete : boolean; 
    deleteTodo : (id: string) => Promise<void>;
    toggleTodo : (id: string, complete: boolean) => Promise<void>;    
}

export default function TodoItem({id, title, complete, toggleTodo, deleteTodo}: TodoItemProps){

    const [checked, setChecked] = useState(complete); 
    const [ispending, startTransition] = useTransition(); 


    const onToggle = (val: boolean)=>{
        setChecked(val);
        startTransition(async() => {
            try{
                await toggleTodo(id, val);
            }
            catch(err){
                setChecked(!val);
                console.error(err);
            }
        })
    }

    return (
        <li className="flex items-center justify-between gap-4 mx-auto my-2 p-2 border-2 rounded-lg max-w-md w-full">
            <div className="flex items-center">
                <div className="p-2">
                    <input
                        id={id}
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => onToggle(e.target.checked)}
                        className="cursor-pointer"
                    />
                </div>
                <label
                    htmlFor={id}
                    className={`cursor-pointer ml-3 text-lg font-medium transition-colors duration-150 ${checked ? 'line-through text-muted opacity-60' : ''}`}
                >
                    {title}
                </label>
            </div>

            <button
                onClick={() => {
                    deleteTodo(id)
                }}
                type="button"
                title="Delete"
                aria-label="Delete todo"
                className="p-2 rounded-md hover:text-red-400"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" stroke="currentColor" fill="none">
                    <path d="M6 6 L18 18 M6 18 L18 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </li>
    )
}