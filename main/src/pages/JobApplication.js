import React, { useEffect } from 'react';
import { getRequest } from '../utils';

const JobApplication = () => {
    
    useEffect(() => {
        getRequest("api/test_access/");
    }, []);

    return (
        <>
            Helloo its anket
        </>
    );
};

export default JobApplication;
