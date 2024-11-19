import React, { useEffect } from 'react';
import { getRequest } from '../utils';

const Schedule = () => {
    
    useEffect(() => {
        getRequest("api/test_access/");
    }, []);

    return (
        <>
            Helloo its huvaari harah heseg
        </>
    );
};

export default Schedule;
