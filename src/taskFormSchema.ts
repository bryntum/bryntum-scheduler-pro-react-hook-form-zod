import { z } from 'zod';
import { taskPriorities } from './lib/TaskModel';

export const taskFormSchema = z.object({
    name: z.string().min(5, 'Name must be at least 5 characters'),
    startDate: z
        .date({ message: 'Start date is required' })
        .nullable()
        .refine((date) => date !== null, 'Start date is required'),
    duration: z
        .number()
        .min(1, 'Duration must be at least 1 day')
        .max(60, 'Duration must be at most 60 days'),
    priority: z.enum(taskPriorities),
});

export type TaskFormInput = z.input<typeof taskFormSchema>;
export type TaskFormValues = z.output<typeof taskFormSchema>;