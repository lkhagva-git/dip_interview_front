import React, { useEffect } from 'react';
import { getRequest } from '../utils';

const InterviewHistory = () => {
    
    useEffect(() => {
        getRequest("api/test_access/");
    }, []);

    return (
        <>
            Helloo its yriltslagiin tuuh
        </>
    );
};

export default InterviewHistory;
