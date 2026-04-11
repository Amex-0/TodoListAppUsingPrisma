import React from 'react'
import { createTodo as serviceCreateTodo } from '../services/todo';
import Link from 'next/link';
import { redirect } from 'next/navigation';


async function createTodo(data: FormData){
  "use server"
  const titleRaw = data.get("title");
  const title = typeof titleRaw === 'string' ? titleRaw : String(titleRaw ?? '');
  await serviceCreateTodo(title);
  redirect("/")
}

export default function NEWPage  ()  {
  return (
    <div>
        <div className='mt-8 mx-4 '>
        <h1 className='mb-5'>New ToDo</h1>
        <form action={createTodo}>
            <input type="text" 
            name='title'
            placeholder='Title' 
            className='border-2 border-gray-300 rounded-md p-2 w-full'/>
            {/* <button type='submit' className='bg-blue-500 text-white rounded-md p-2 mt-2'>Create</button> */}
        <div className='flex justify-end gap-2 '>

        <Link href = "/" className='text-blue-500 mt-4 inline-block'>Cancel</Link>
        <button type = "submit" className='bg-blue-500 text-white rounded-md p-2 mt-2'>Create</button>
        </div>
        </form>
        
        
        </div>




    </div>
  )
}

