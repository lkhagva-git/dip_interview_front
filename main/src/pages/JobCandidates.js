import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRequest } from '../utils';
import { Space, Table, Tag } from 'antd';

const { Column, ColumnGroup } = Table;

const JobCandidates = () => {
    const [candidatesData, setCandidatesData] = useState([]);
    const navigate = useNavigate(); // Used to programmatically navigate to the detail page

    const getData = async () => {
        try {
            const response = await getRequest('/api/candidates_data/');
            console.log('Response candidates:', response);
            setCandidatesData(response);
        } catch (error) {
            console.error('Failed to fetch candidate data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Table dataSource={candidatesData} rowKey="id"> {/* Add rowKey to uniquely identify each row */}
                <Column title="Овог" dataIndex="last_name" key="last_name" />
                <Column title="Нэр" dataIndex="first_name" key="first_name" />
                <ColumnGroup title="Горилож буй албан тушаал">
                    <Column title="Алба хэлтэс" dataIndex="department" key="department" />
                    <Column title="Албан тушаал" dataIndex="title" key="title" />
                </ColumnGroup>
                <Column title="Имэйл" dataIndex="email" key="email" />
                <Column title="Илгээсэн огноо" dataIndex="created_at" key="created_at" />
                <Column
                    title="Үйлдэл"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => navigate(`/candidate/${record.id}`)}>Detail of {record.first_name}</a>
                        </Space>
                    )}
                />
            </Table>
        </>
    );
};

export default JobCandidates;
