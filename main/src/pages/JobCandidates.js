import React, { useEffect } from 'react';
import CustomTable from '../components/CustomTable';
import { getRequest } from '../utils';

const JobCandidates = () => {
    
    useEffect(() => {
        getRequest("api/test_access/");
    }, []);

    return (
        <>
            <CustomTable />
        </>
    );
};

export default JobCandidates;
