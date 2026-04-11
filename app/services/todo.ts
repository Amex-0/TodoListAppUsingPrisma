import { prisma } from '../lib/data';
import { z } from 'zod';
import type { Todo } from '../generated/prisma/client';
import { Prisma } from '../generated/prisma/client';

export const createTodoSchema = z.object({ title: z.string().min(1).max(500).transform(s => s.trim()) });
export const toggleTodoSchema = z.object({ id: z.string().uuid(), complete: z.boolean() });
export const idSchema = z.object({ id: z.string().uuid() });

export const getTodos = async ({ skip = 0, take = 100 } = {}): Promise<Todo[]> => {
  return prisma.todo.findMany({ orderBy: { createdAt: 'desc' }, skip, take, select: { id: true, title: true, complete: true, createdAt: true, updatedAt: true } });
}

export const createTodo = async (title: string): Promise<Todo> => {
  const parsed = createTodoSchema.parse({ title });
  try {
    return await prisma.todo.create({ data: { title: parsed.title, complete: false } });
  } catch (err) {
    throw err;
  }
}

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo | null> => {
  const { id: parsedId, complete: parsedComplete } = toggleTodoSchema.parse({ id, complete });
  try {
    return await prisma.todo.update({ where: { id: parsedId }, data: { complete: parsedComplete } });
  } catch (err) {
    // Record not found
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return null;
    }
    throw err;
  }
}

export const deleteTodo = async (id: string): Promise<number> => {
  const { id: parsedId } = idSchema.parse({ id });
  try {
    const result = await prisma.todo.deleteMany({ where: { id: parsedId } });
    return result.count;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return 0;
    }
    throw err;
  }
}