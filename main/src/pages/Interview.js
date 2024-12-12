import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, DatePicker, Select, Row, Col, Radio, Modal, Spin } from 'antd';
import { getRequest, postRequest } from '../utils';
import { useAuth } from '../contexts/AuthContext';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

// const { Option } = Select;

const Interview = () => {
    const { auth } = useAuth();
    const profile = auth.profile;
    const navigate = useNavigate();
    const { id, inter_id, is_final } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [firstModalOpen, setFirstModalOpen] = useState(false);
    const [jobApplicationData, setJobApplicationData] = useState(null);

    const customRule = [{ required: true, message: 'Энэ талбарыг заавал бөглөнө үү' }];

    const firstModalHandleCancel = () => {
        setFirstModalOpen(false);
    };

    const handleDecision = (status, formData) => {
        formData.status = status;
        setFirstModalOpen(false);
        send(formData);
    };

    const send = async (formData) => {
        if (!formData) {
            message.error('Form data is missing');
            return;
        }
        setLoading(true);

        const sendData = {
            communication: formData.question_1,
            appearance: formData.question_2,
            logic_skill: formData.question_3,
            attitude: formData.question_4,
            independence: formData.question_5,
            responsibility: formData.question_6,
            leadership: formData.question_7,
            knowledge: formData.question_8,
            overall_score: formData.question_9,
            status: formData.status,
            pros: formData.pros,
            cons: formData.cons,
            main_overall: formData.main_overall,
            conclution_points: formData.conclution_points,
            additional_note: formData.additional_note,
            inter_id: inter_id
        };

        try {
            await postRequest('/api/conduct_interview/', sendData);
            message.success('Interview successfully created!');
            navigate(`/candidate/${id}`);
        } catch (error) {
            message.error('Failed to create interview');
        } finally {
            setLoading(false);
        }
    };

    const onFormFinish = async (values) => {
        setFirstModalOpen(true);
    };

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (jobApplicationData) {
            form.setFieldsValue({
                candidate_last_name: jobApplicationData.last_name,
                candidate_first_name: jobApplicationData.first_name,
                candidate_company: jobApplicationData.company,
                candidate_department: jobApplicationData.department,
                candidate_title: jobApplicationData.title
            });
        }
    }, [jobApplicationData, form]);

    return (
        <>
            <Spin spinning={loading}>
                <Modal title="Шийдвэр" open={firstModalOpen} onCancel={firstModalHandleCancel} footer={null}>
                    <Button className='mb-3' block type="primary" onClick={() => handleDecision((is_final === 'true' ? 2 : 0), form.getFieldsValue())}>
                        {is_final === 'true' ? 'Ажилд авах' : 'Санал болгох'}
                    </Button>
                    <Button block type="primary" danger onClick={() => handleDecision((is_final === 'true' ? 3 : 1), form.getFieldsValue())}>
                        {is_final === 'true' ? 'Ажилд авахгүй' : 'Санал болгохгүй'}
                    </Button>
                </Modal>

                <Form
                    layout={'vertical'}
                    form={form}
                    initialValues={{
                        interviewer_company: profile.company,
                        interviewer_department: profile.department,
                        interviewer_title: profile.title,
                        interviewer_full_name: profile.last_name + ' ' + profile.first_name,
                        created_at: dayjs()
                    }}
                    onFinish={onFormFinish}
                    onValuesChange={(_, allValues) => {
                        const totalQuestions = 9;
                        const scores = Object.keys(allValues)
                            .filter(key => key.startsWith('question_'))
                            .map(key => parseInt(allValues[key], 10) || 0);
                
                        if (scores.length) {
                            const rawAverage = scores.reduce((a, b) => a + b, 0) / totalQuestions;
                            const scaledAverage = ((rawAverage / 4) * 100).toFixed(1); 
                            form.setFieldsValue({ conclution_points: scaledAverage });
                        } else {
                            form.setFieldsValue({ conclution_points: 0 });
                        }
                    }}
                    
                >
                    <h1>Ярилцлагын үнэлгээний хуудас</h1>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Ажил горилогчийн овог" name="candidate_last_name">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Ажил горилогчийн нэр" name="candidate_first_name">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Ярилцлага хийсэн огноо" name="created_at">
                                <DatePicker initialValues={dayjs()} style={{ width: '100%' }} disabled />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div>Горилож буй албан тушаалын мэдээлэл</div>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Компани" name="candidate_company">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Алба хэлтэс" name="candidate_department">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Албан тушаал" name="candidate_title">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div style={{ marginBottom: '24px' }}>
                        {['Харилцаа (өөрийгөө илэрхийлэх чадвар, сонсох чадвар)', 'Гадаад төрх (хувцаслалт, body language)', 'Асуултад хариулах буй байдал (санаагаа оновчтой илэрхийлэх буй эсэх, логик сэтгэлгээ, харилцааг ойлголцол)', 'Хандлага (ээлтэй байдал, урам зориг, зорилгодоо хүрэх тэмүүлэл)', 'Идэвх санаачлага (бие даасан байдал, авхаалж самбаа, хөдөлмөрч зан чанар, идэвхтэй байдал)', 'Өөрийгөө хөгжүүлэх зан чанар (хариуцлагатай байдал, зорилго тодорхойлсон байдал, өөртөө итгэх итгэл)', 'Манлайлах болон багтаа ажиллах (идэвхтэй, ажил хэрэгч байдал)', 'Мэдлэг, авьяас (ерөнхий чадвар, техникийн ур чадвар)', 'Нэгдсэн дүгнэлт (дээрх бүх үнэлгээ зүйлсийг нэгтгэж дүгнэх)'].map((question, index) => (
                            <Row key={index} gutter={16} style={{ marginBottom: '16px' }}>
                                <Col span={8}>
                                    <span>{index + 1}. {question}</span>
                                </Col>
                                <Col span={16}>
                                    <Form.Item name={`question_${index + 1}`} rules={customRule}>
                                        <Radio.Group>
                                            <Radio value="0">Хангалтгүй (0 оноо)</Radio>
                                            <Radio value="1">Дунджаас доогуур (1 оноо)</Radio>
                                            <Radio value="2">Дундаж (2 оноо)</Radio>
                                            <Radio value="3">Сайн (3 оноо)</Radio>
                                            <Radio value="4">Маш сайн (4 оноо)</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                        ))}
                    </div>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Анхаарал татсан чадварууд" name="pros" rules={customRule}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Ажиглагдсан сул тал" name="cons" rules={customRule}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Ерөнхий дүгнэлт" name="main_overall" rules={customRule}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div>Ярилцлага хийгчийн мэдээлэл</div>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Компани" name="interviewer_company">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Алба хэлтэс" name="interviewer_department">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Албан тушаал" name="interviewer_title">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Ярилцлага хийгчийн нэр" name="interviewer_full_name">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Нэгдсэн дүгнэлт %" name="conclution_points" rules={customRule}>
                                {/* <Select placeholder="1 (Хангалтгүй) - 10 (Маш сайн)">
                                    {[...Array(10)].map((_, i) => (
                                        <Option key={i + 1} value={i + 1}>{i + 1} оноо</Option>
                                    ))}
                                </Select> */}
                                <Input disabled />

                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Нэмэлт тайлбар/тэмдэглэгээ" name="additional_note">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">Илгээх</Button>
                    </Form.Item>
                </Form>
            </Spin>

        </>
    );
};

export default Interview;
