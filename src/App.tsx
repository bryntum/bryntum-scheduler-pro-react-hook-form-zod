import { useCallback, useRef, useState } from 'react';
import {
    BryntumScheduler,
    BryntumSchedulerProjectModel,
    type BryntumSchedulerProps
} from '@bryntum/scheduler-react-enterprise';
import { projectProps, schedulerProProps } from './AppConfig';
import TaskFormDialog from './TaskFormDialog';
import type { TaskFormValues } from './taskFormSchema';import type { TaskRecord } from './lib/TaskModel';

export default function App() {
    const projectRef = useRef<BryntumSchedulerProjectModel>(null);
    const [editingTask, setEditingTask] = useState<TaskRecord | null>(null);
    const [project] = useState(projectProps);
    const [schedulerPro] = useState(schedulerProProps);

    const [listeners] = useState<
        NonNullable<BryntumSchedulerProps['listeners']>
    >(() => ({
        beforeTaskEdit({ taskRecord }) {
            setEditingTask(taskRecord as TaskRecord);
            return false;
        },
    }));
    const closeDialog = useCallback((task: TaskRecord) => {
        if (task.isCreating) {
            task.eventStore?.remove(task);
        }
        setEditingTask(null);
    }, []);

    const saveTask = useCallback((task: TaskRecord, values: TaskFormValues) => {
        task.beginBatch();
        try {
            task.name = values.name;
            task.setStartDate(values.startDate, false);
            task.duration = values.duration;
            task.priority = values.priority;
        }
        finally {
            task.endBatch();
        }

        task.isCreating = false;
        setEditingTask(null);
    }, []);
    return (
        <>
            <BryntumSchedulerProjectModel ref={projectRef} {...project} />
            <BryntumScheduler
                project={projectRef}
                listeners={listeners}
                {...schedulerPro}
            />
            <TaskFormDialog
                key={editingTask?.id ?? 'none'}
                task={editingTask}
                onClose={closeDialog}
                onSave={saveTask}
            />
        </>
    );
}