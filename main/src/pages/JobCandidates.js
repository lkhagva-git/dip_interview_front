import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRequest } from '../utils';
import { Button, Input, Space, Table } from 'antd';

const { Column, ColumnGroup } = Table;

const JobCandidates = () => {
    const [candidatesData, setCandidatesData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await getRequest('/api/candidates_data/');
            setCandidatesData(response);
            setFilteredData(response);  
        } catch (error) {
            console.error('Failed to fetch candidate data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const filtered = candidatesData.filter(item => {
            return Object.values(item).some(value =>
                value?.toString().toLowerCase().includes(searchText.toLowerCase())
            );
        });
        setFilteredData(filtered);
    }, [searchText, candidatesData]);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Хайх..."
                    value={searchText}
                    onChange={handleSearch}
                    style={{ width: 300 }}
                />
            </Space>
            <Table dataSource={filteredData} rowKey="id">
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
                            <Button type='primary' onClick={() => navigate(`/candidate/${record.id}`)}>
                                Дэлгэрэнгүй
                            </Button>
                        </Space>
                    )}
                />
            </Table>
        </>
    );
};

export default JobCandidates;
