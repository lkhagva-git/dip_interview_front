import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, Form, Space, Row, Col, message } from 'antd';
import { useParams } from 'react-router-dom';
import { getRequest, postRequest } from '../../utils';

const { Option } = Select;

const InterviewTest = () => {
    const { id } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [interFields, setInterFields] = useState([{}]);
    const [profileListData, setProfileListData] = useState([]);

    const customRule = [{ required: true, message: 'Энэ талбарыг заавал бөглөнө үү' }];

    const addField = () => {
        setInterFields((prevFields) => [...prevFields, {}]);
    };

    const removeField = (index) => {
        setInterFields((prevFields) => prevFields.filter((_, i) => i !== index));
    };

    const modalHandleCancel = () => {
        setModalOpen(false);
    };


    const getProfileListData = async () => {
        try {
            const response = await getRequest(`/api/profile_list/`);
            setProfileListData(response);
        } catch (error) {
            console.error('Failed to fetch profile_list:', error);
        }
    };


    useEffect(() => {
        getProfileListData();
    }, []);

 

    const renderField = (index) => (
        <Row key={index} align="middle" style={{ marginBottom: 16 }}>
            <Col span={20}>
                <Form.Item
                    label={`${index + 1}-р шатны ярилцлаг хийх ажилтан`}
                    name={`employee_${index}`}
                    rules={customRule}
                >
                    <Select placeholder="Сонгох">
                        {profileListData.map((item) => (
                            <Option key={item.id} value={item.id}>
                                {item.title} - {item.last_name} {item.first_name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>
            <Col span={4}>
                <Button type="text" danger onClick={() => removeField(index)}>
                    X
                </Button>
            </Col>
        </Row>
    );
    
    const onFinish = async (values) => {
        const employeeIds = Object.keys(values)
            .filter((key) => key.startsWith('employee_'))
            .map((key) => values[key]);

        const sendData = {
            employee_ids: employeeIds,
            anket_id: parseInt(id, 10),
        };

        try {
            const response = await postRequest('/api/create_interview_plan/', sendData);
            message.success('interview_plan successfully created!');

        } catch (error) {
            message.error('Failed to create interview_plan');
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setModalOpen(true)}>
                Ярилцлагын шат төлөвлөх
            </Button>

            <Modal
                title="Ярилцлагын шат төлөвлөх"
                open={modalOpen}
                onCancel={modalHandleCancel}
                footer={null}
            >
                <Form name="interviewPlan" onFinish={onFinish} layout="vertical">
                    <Space direction="vertical" style={{ width: '100%' }}>
                        {interFields.map((_, index) => renderField(index))}

                        <Button type="dashed" onClick={addField} block>
                            Шат нэмэх
                        </Button>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Хадгалах
                            </Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Modal>
        </>
    );
};

export default InterviewTest;