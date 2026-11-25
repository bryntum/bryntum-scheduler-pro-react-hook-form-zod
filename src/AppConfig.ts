import type {
    BryntumSchedulerProjectModelProps,
    BryntumSchedulerProps,
} from '@bryntum/scheduler-react-enterprise';
import TaskModel, { taskPriorities } from './lib/TaskModel';

export const projectProps: BryntumSchedulerProjectModelProps = {
    eventModelClass: TaskModel,
    autoLoad: true,
    transport: {
        load: {
            url: 'data.json',
        },
    },
};

export const schedulerProps: BryntumSchedulerProps = {
    startDate: new Date(2026, 9, 5),
    viewPreset: 'weekAndDay',
    rowHeight: 50,
    barMargin: 10,
    columns: [
        { type: 'resourceInfo', text: 'Name', field: 'name', width: 220 },
    ],
    taskEditFeature: {
        items: {
            generalTab: {
                items: {
                    percentDoneField: false,
                    effortField: {
                        cls: 'b-half-width',
                    },
                    nameField: {
                        required: true,
                        showRequiredIndicator: true,
                        minLength: 5,
                    },
                    durationField: {
                        min: '1d',
                        max: '60d',
                    },
                    startDateField: {
                        required: true,
                        showRequiredIndicator: true,
                    },
                    priorityField: {
                        type: 'combo',
                        label: 'Priority',
                        name: 'priority',
                        weight: 630,
                        editable: false,
                        items: [...taskPriorities],
                        required: true,
                        showRequiredIndicator: true,
                    },
                },
            },
        },
    },
};