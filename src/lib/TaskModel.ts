import { EventModel } from '@bryntum/schedulerpro';

export const taskPriorities = ['low', 'medium', 'high'] as const;
export type TaskPriority = (typeof taskPriorities)[number];

export default class TaskModel extends EventModel {
    declare priority: TaskPriority;

    static get fields() {
        return [
            { name: 'priority', defaultValue: 'medium' },
        ];
    }
}

export type TaskRecord = InstanceType<typeof TaskModel>;