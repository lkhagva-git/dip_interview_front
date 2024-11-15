import React from 'react';
// import { useAuth } from '../contexts/AuthContext';
import { Tabs } from 'antd';
import JobApplication from './JobApplication';
import InterviewHistory from './InterviewHistory';
import Interview from './Interview';


const JobCandidateDetail = () => {
    // const { auth } = useAuth();
    // const profile = auth.profile;

    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: 'Анкет',
            children: <JobApplication />,
        },
        {
            key: '2',
            label: 'Ярилцлагын түүх',
            children: <InterviewHistory />,
        },
        {
            key: '3',
            label: 'Ярилцлага хийх',
            children: <Interview />,
        },
    ];

    return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

};

export default JobCandidateDetail;
