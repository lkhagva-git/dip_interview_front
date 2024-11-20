import React, { useEffect, useRef, useState } from 'react';
import { getRequest, postRequest } from '../utils';
import { Button, Card, Col, message, Modal, Row, Select, Space, Form, DatePicker, Input, Badge, Alert } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import InterviewDetail from './InterviewDetail';
import { useAuth } from '../contexts/AuthContext';
const { Option } = Select;

const InterviewHistory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const profile = auth.profile;
    const [interviewHistoryData, setInterviewHistoryData] = useState(null);
    const [stepModalOpen, setStepModalOpen] = useState(false);
    const [scheduleModalOpen, setScheduleModalOpen] = useState({ show: false, data: null });

    const [profileListData, setProfileListData] = useState([]);
    const [interFields, setInterFields] = useState(['']);

    const interviewDetailRef = useRef(null);

    const customRule = [{ required: true, message: 'Энэ талбарыг заавал бөглөнө үү' }];

    useEffect(() => {
        if (id) {
            getInterviewHistoryData();
            getProfileListData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const getInterviewHistoryData = async () => {
        try {
            const response = await getRequest(`/api/interview_history/${id}/`);
            const orderedResponse = response.sort((a, b) => a.id - b.id);
            setInterviewHistoryData(orderedResponse);
        } catch (error) {
            console.error('Failed to fetch candidate interview history:', error);
            message.error('Unable to load interview history data.');
        }
    };

    const getProfileListData = async () => {
        try {
            const response = await getRequest(`/api/profile_list/`);
            setProfileListData(response);
        } catch (error) {
            console.error('Failed to fetch profile_list:', error);
        }
    };

    const addField = () => {
        setInterFields((prevFields) => [...prevFields, {}]);
    };

    const removeField = (index) => {
        setInterFields((prevFields) => prevFields.filter((_, i) => i !== index));
    };

    const modalHandleCancel = () => {
        setStepModalOpen(false);
        setScheduleModalOpen({ show: false, data: null });
    };


    const renderField = (index) => (
        <Row key={index} align="middle">
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

    const onStepFormFinish = async (values) => {
        const employeeIds = Object.keys(values)
            .filter((key) => key.startsWith('employee_'))
            .map((key) => values[key]);

        const sendData = {
            employee_ids: employeeIds,
            anket_id: parseInt(id, 10),
        };

        try {
            await postRequest('/api/create_interview_plan/', sendData);
            message.success('Interview plan successfully created!');
            getInterviewHistoryData();
            setStepModalOpen(false);
        } catch (error) {
            message.error('Failed to create interview plan');
        }
    };

    const onScheduleFormFinish = async (values) => {
        const dateTime = values.date_time;

        const sendData = {
            candidate_id: id,
            inter_id: scheduleModalOpen.data.id,
            date_time: dateTime.format('YYYY-MM-DD HH:mm:ss'),
            address: values.address,
        };

        try {
            await postRequest('/api/create_schedule/', sendData);
            setScheduleModalOpen({ show: false, data: null });
            getInterviewHistoryData();
            message.success('Schedule successfully created!');
        } catch (error) {
            message.error('Failed to create Schedule');
        }
    };

    useEffect(() => {
        if (interviewHistoryData && interviewHistoryData.length === 0) {
            const timer = setTimeout(() => {
                setStepModalOpen(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [interviewHistoryData]);


    const ribbonTextSetter = (item) => {
        switch (item.status) {
            case null:
                return 'Ярилцлага хийгдээгүй байна';
            case 0:
                return 'Санал болгосон';
            case 1:
                return 'Санал болгоогүй';
            case 2:
                return 'Ажилд авсан';
            case 3:
                return 'Ажилд аваагүй';
            default:
                return 'Тодорхойгүй';
        }
    };

    const ribbonColorSetter = (item) => {
        switch (item.status) {
            case null:
                return 'yellow';
            case 0:
                return 'cyan';
            case 1:
                return 'volcano';
            case 2:
                return 'green';
            case 3:
                return 'red';
            default:
                return 'cyan';
        }
    };

    const handleDetailButtonClick = () => {
        if (interviewDetailRef.current) {
            interviewDetailRef.current.openModal();
        }
    };

    return (
        <>
            <Modal
                title="Ярилцлагын шат төлөвлөх"
                open={stepModalOpen}
                onCancel={modalHandleCancel}
                footer={null}
            >
                <Form name="interviewPlan" onFinish={onStepFormFinish} layout="vertical">
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Alert
                            description="Хамгийн сүүлийн шатны ярилцлага хийх ажилтан ажилд авах/авахгүй шийдвэр гаргах болно."
                            type="info"
                            style={{ padding: 10 }}
                        />
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

            <Modal
                title="Ярилцлагын цаг товлох"
                open={scheduleModalOpen.show}
                onCancel={modalHandleCancel}
                footer={null}
            >
                <Form name="interviewSchedule" onFinish={onScheduleFormFinish} layout="vertical">
                    <Form.Item label="Өдөр, цаг" name="date_time" rules={customRule}>
                        <DatePicker showTime style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Уулзалтын байршил" name="address" rules={customRule}>
                        <Input />
                    </Form.Item>
                    <Form.Item>

                        <Button type="primary" htmlType="submit" block>
                            Хадгалах
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>


            {interviewHistoryData && interviewHistoryData.length === 0 && profile.user_type === 0 ? (
                <Button type="primary" onClick={() => setStepModalOpen(true)}>
                    Ярилцлагын шат төлөвлөх
                </Button>
            ) : interviewHistoryData ? (
                <Row gutter={[16, 16]}>
                    {interviewHistoryData?.map((item, index) => (
                        <Col xs={24} sm={12} lg={12} key={index}>
                            <Badge.Ribbon placement='start' text={ribbonTextSetter(item)} color={ribbonColorSetter(item)}>
                                <Card
                                    title={`${item.level}-р шатны ярилцлага${item.is_final ? ' /Сүүлийн шатны ярилцлага/' : ''}`}
                                    style={{ paddingTop: '20px' }}
                                    extra={
                                        <>
                                            {item.is_completed &&
                                                <>
                                                    <Button className='mr-1' type="primary" onClick={handleDetailButtonClick}>
                                                        Ярилцлагын дэлгэрэнгүй
                                                    </Button>
                                                    <InterviewDetail ref={interviewDetailRef} props={{ inter_id: item.id }} />
                                                </>
                                            }

                                            {/* {(!item.is_completed && item.username === auth.profile.username) && */}
                                            {!item.is_completed &&
                                                <Button className='mr-1' type="primary" onClick={() => navigate(`/candidate/${id}/interview/${item.id}/${item.is_final}`)}>
                                                    Ярилцлага хийх
                                                </Button>
                                            }

                                            {/* {(!item.is_scheduled && !item.is_completed && item.username === auth.profile.username) && ( */}
                                            {!item.is_scheduled && !item.is_completed && (
                                                <Button className='mr-1' type="primary" onClick={() => setScheduleModalOpen({ show: true, data: item })}>
                                                    Цаг товлох
                                                </Button>
                                            )}
                                        </>
                                    }
                                >
                                    <p><strong>Ярилцлага хийгч:</strong> {item.title} - {item.last_name} {item.first_name}</p>
                                    <p><strong>Ярилцлага хийсэн огноо:</strong> {item.interviewed_date}</p>
                                    <p><strong>Ерөнхий дүгнэлт:</strong> {item.main_overall}</p>
                                    <p><strong>Нэгдсэн дүгнэлт (оноо):</strong> {item.conclution_points}</p>
                                </Card>
                            </Badge.Ribbon>
                        </Col>
                    ))}
                </Row>
            ) : null}
        </>
    );
};

export default InterviewHistory;
