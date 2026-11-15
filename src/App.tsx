import { useRef, useState } from 'react';
import {
    BryntumScheduler,
    BryntumSchedulerProjectModel
} from '@bryntum/scheduler-react-enterprise';
import { projectProps, schedulerProProps } from './AppConfig';

export default function App() {
    const projectRef = useRef<BryntumSchedulerProjectModel>(null);
    const [project] = useState(projectProps);
    const [schedulerPro] = useState(schedulerProProps);

    return (
        <>
            <BryntumSchedulerProjectModel ref={projectRef} {...project} />
            <BryntumScheduler
                project={projectRef}
                {...schedulerPro}
            />
        </>
    );
}