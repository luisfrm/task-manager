import {date, z} from 'zod';

export const taskSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string',
  }).min(3, {
    message: 'Title must be at least 3 characters long',
  }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  }).min(5, {
    message: 'Description must be at least 5 characters long',
  }),
  status: z.enum(['pending', 'in progress', 'completed']).optional(),
  date: z.string().datetime().optional(),
  user: z.string({
    invalid_type_error: 'User must be a string',
  }).optional(),
});