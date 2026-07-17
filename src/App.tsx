import { useRef, useState } from 'react';
import {
    BryntumSchedulerPro,
    BryntumSchedulerProProjectModel
} from '@bryntum/schedulerpro-react';
import { projectProps, schedulerProProps } from './AppConfig';

export default function App() {
    const projectRef = useRef<BryntumSchedulerProProjectModel>(null);
    const [project] = useState(projectProps);
    const [schedulerPro] = useState(schedulerProProps);

    return (
        <>
            <BryntumSchedulerProProjectModel ref={projectRef} {...project} />
            <BryntumSchedulerPro
                project={projectRef}
                {...schedulerPro}
            />
        </>
    );
}