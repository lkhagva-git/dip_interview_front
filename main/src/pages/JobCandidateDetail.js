import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { getRequest } from '../utils';

import JobApplication from './JobApplication';
import InterviewHistory from './InterviewHistory';

const JobCandidateDetail = () => {
    const { id } = useParams();
    const [jobApplicationData, setJobApplicationData] = useState(null);

    const getJobApplicationData = async () => {
        try {
            const response = await getRequest(`/api/job_application/${id}/`);
            setJobApplicationData(response);
        } catch (error) {
            console.error('Failed to fetch candidate job application:', error);
        }
    };

    useEffect(() => {
        if (id) {
            getJobApplicationData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: 'Ярилцлага',
            children: <InterviewHistory />,
        },
        {
            key: '2',
            label: 'Анкет',
            children: <JobApplication data={jobApplicationData} />,
        }
    ];


    return (
        <>
            {jobApplicationData && (
                <>
                    <h2>Detail for {jobApplicationData.first_name} {jobApplicationData.last_name}</h2>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </>
            )}
        </>
    );
};

export default JobCandidateDetail;
