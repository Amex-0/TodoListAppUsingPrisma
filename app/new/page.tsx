import React from 'react';
import { redirect } from 'next/navigation';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { createTodo as createTodoService } from '../services/todo';

async function createTodoAction(formData: FormData) {
  'use server'
  const title = String(formData.get('title') ?? '').trim();
  if (!title) return;
  await createTodoService(title);
  redirect('/');
}

export default function NewPage() {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-8">
      <Card className="p-6 fade-in">
        <h1 className="text-3xl font-bold text-center mb-4">Create Todo</h1>

        <form action={createTodoAction} className="flex flex-col gap-4">
          <label htmlFor="title" className="sr-only">Todo title</label>
          <Input id="title" name="title" placeholder="What needs doing?" autoFocus />

          <div className="flex justify-end gap-3">
            <Button as="a" href="/" variant="ghost">Cancel</Button>
            <Button type="submit" variant="primary" className="add-btn">Add Todo</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}


