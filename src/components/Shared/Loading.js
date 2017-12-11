import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = () => (
    <div>
        <Dimmer active>
            <Loader size="medium">Magic is happening...</Loader>
        </Dimmer>
    </div>
);

export default Loading;
