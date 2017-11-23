import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = () => (
    <div>
        <Dimmer active>
            <Loader>Magic is happening...</Loader>
        </Dimmer>
    </div>
);

export default Loading;
