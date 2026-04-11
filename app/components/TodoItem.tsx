"use client"

import { useState, useTransition } from "react";


type TodoItemProps = {
    id : string; 
    title : string; 
    complete : boolean; 
    deleteTodo : (id: string) => Promise<void>;
    toggleTodo : (id: string, complete: boolean) => Promise<void>;    
}
function DeleteTodo(id: string){
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
        <li className="flex-col gap-1 mx-4 my-2 ">
            <input 
                id={id} 
                type="checkbox" 
                checked={checked} 
                onChange={(e) => onToggle(e.target.checked)} 
                className="cursor cursor-pointer ml-3 "
                />
                <label
           htmlFor={id}
            
                className="cursor cursor-pointer  ml-3 "
           
           >{title}</label>
           <button onClick={() => {deleteTodo(id)}} type="button" title="Delete"
            className=" border-2 border-hidden rounded-md p-2  font-light hover:text-red-400 ml-3"
            >
            Delete
           </button>
        </li>
    )
}