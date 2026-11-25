import { useRef, useState } from 'react';
import {
    BryntumScheduler,
    BryntumSchedulerProjectModel
} from '@bryntum/scheduler-react-enterprise';
import { projectProps, schedulerProps } from './AppConfig';

export default function App() {
    const projectRef = useRef<BryntumSchedulerProjectModel>(null);
    const [project] = useState(projectProps);
    const [scheduler] = useState(schedulerProps);

    return (
        <>
            <BryntumSchedulerProjectModel ref={projectRef} {...project} />
            <BryntumScheduler
                project={projectRef}
                {...scheduler}
            />
        </>
    );
}