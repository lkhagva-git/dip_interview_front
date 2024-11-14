import React, { useEffect } from 'react';
import CustomTable from '../components/CustomTable';
import { getRequest } from '../utils';

const JobApplicants = () => {
    
    useEffect(() => {
        getRequest("api/test_access/");
    }, []);

    return (
        <>
            <CustomTable />
        </>
    );
};

export default JobApplicants;
