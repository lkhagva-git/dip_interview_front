import React, { useEffect, useState } from 'react';
import { getRequest } from '../utils';
import { Card, Space } from 'antd';
import { useParams } from 'react-router-dom';

const InterviewHistory = () => {

    const { id } = useParams();
    const [interviewHistoryData, setInterviewHistoryData] = useState(null);

    const getInterviewHistoryData = async () => {
        try {
            const response = await getRequest(`/api/interview_history/${id}/`);
            setInterviewHistoryData(response);
        } catch (error) {
            console.error('Failed to fetch candidate interview_history:', error);
        }
    };

    useEffect(() => {
        if (id) {
            getInterviewHistoryData();
        }
    }, [id]);

    return (
        <>
            {interviewHistoryData && interviewHistoryData.map((item, index) => (
                <Space direction="vertical" size={16}>
                    <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>{item.first_name}</p>
                        <p>{item.last_name}</p>
                        <p>{item.interviewed_date}</p>
                        <p>{item.main_overall}</p>
                        <p>{item.level}</p>
                    </Card>
                </Space>
            ))}

        </>
    );
};

export default InterviewHistory;
