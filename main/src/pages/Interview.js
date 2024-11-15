import React, { useEffect } from 'react';
import { getRequest } from '../utils';

const Interview = () => {
    
    useEffect(() => {
        getRequest("api/test_access/");
    }, []);

    return (
        <>
            Helloo its yriltslaga hiih heseg
        </>
    );
};

export default Interview;
