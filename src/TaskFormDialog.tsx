import { Controller, useForm } from 'react-hook-form';
import { BryntumDateField } from '@bryntum/schedulerpro-react';
import {
    taskPriorities,
    type TaskRecord,
} from './lib/TaskModel';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    taskFormSchema,
    type TaskFormInput,
    type TaskFormValues,
} from './taskFormSchema';

interface TaskFormDialogProps {
    task: TaskRecord | null;
    onClose: (task: TaskRecord) => void;
    onSave: (task: TaskRecord, values: TaskFormValues) => void;
}

export default function TaskFormDialog({ task, ...props }: TaskFormDialogProps) {
    if (!task) return null;

    return <TaskForm task={task} {...props} />;
}

function TaskForm({ task, onClose, onSave }: TaskFormDialogProps & {
    task: TaskRecord;
}) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TaskFormInput, unknown, TaskFormValues>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            name: task.name ?? '',
            startDate: (task.startDate as Date | null) ?? null,
            duration: task.duration ?? 1,
            priority: task.priority ?? 'medium',
        },
    });

    return (
        <div
            className="task-form-overlay"
            onKeyDown={({ key }) => key === 'Escape' && onClose(task)}
            role="presentation"
        >
            <div
                aria-labelledby="task-form-title"
                aria-modal="true"
                className="task-form-dialog"
                role="dialog"
            >
                <h2 id="task-form-title">Edit task (React Hook Form + Zod)</h2>

                <form noValidate onSubmit={handleSubmit((values) => onSave(task, values))}>
                    <label>
                        Name
                        <input
                            aria-describedby={errors.name ? 'name-error' : undefined}
                            aria-invalid={Boolean(errors.name)}
                            autoFocus
                            {...register('name')}
                        />
                        {errors.name && (
                            <p className="field-error" id="name-error" role="alert">{errors.name.message}</p>
                        )}
                    </label>

                    <label>
                        Start date
                        <Controller
                            name="startDate"
                            control={control}
                            render={({ field }) => (
                                <BryntumDateField
                                    ariaDescription={errors.startDate?.message}
                                    ariaLabel="Start date"
                                    value={field.value ?? undefined}
                                    onChange={({ value }) => field.onChange(value)}
                                    onFocusOut={field.onBlur}
                                />
                            )}
                        />
                        {errors.startDate && (
                            <p className="field-error" role="alert">{errors.startDate.message}</p>
                        )}
                    </label>

                    <label>
                        Duration (days)
                        <input
                            aria-describedby={errors.duration ? 'duration-error' : undefined}
                            aria-invalid={Boolean(errors.duration)}
                            type="number"
                            {...register('duration', { valueAsNumber: true })}
                        />
                        {errors.duration && (
                            <p className="field-error" id="duration-error" role="alert">{errors.duration.message}</p>
                        )}
                    </label>

                    <label>
                        Priority
                        <select {...register('priority')}>
                            {taskPriorities.map((priority) => (
                                <option key={priority} value={priority}>{priority}</option>
                            ))}
                        </select>
                    </label>

                    <div className="task-form-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => onClose(task)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}