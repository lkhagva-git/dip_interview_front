import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Tabs } from 'antd';
import { getRequest } from '../utils';

import JobApplication from './JobApplication';
import InterviewHistory from './InterviewHistory';
import Interview from './Interview';

const JobCandidateDetail = () => {
    const { id } = useParams();
    const [jobApplicationData, setJobApplicationData] = useState(null);

    const getJobApplicationData = async () => {
        try {
            const response = await getRequest(`/api/job_application/${id}/`);
            setJobApplicationData(response);
        } catch (error) {
            console.error('Failed to fetch candidate job_application:', error);
        }
    };

    useEffect(() => {
        if (id) {
            getJobApplicationData();
        }
    }, [id]);

    const onChange = (key) => {
        console.log(key);
    };

    const operations = (
        <>
            <Button className='mr-1'>Цаг товлох</Button>
            <Button>Шатны тоо тохируулах</Button>
        </>
    );

    const items = [
        {
            key: '1',
            label: 'Анкет',
            children: <JobApplication data={jobApplicationData} />,
        },
        {
            key: '2',
            label: 'Ярилцлагын түүх',
            children: <InterviewHistory />,
        },
        {
            key: '3',
            label: 'Ярилцлага хийх',
            children: <Interview data={jobApplicationData} />,
        },
    ];

    return (
        <>
            {jobApplicationData && (
                <>
                    <h2>Detail for {jobApplicationData.first_name} {jobApplicationData.last_name}</h2>
                    <Tabs defaultActiveKey="1" items={items} tabBarExtraContent={operations} onChange={onChange} />
                </>
            )}
        </>
    );
};

export default JobCandidateDetail;
