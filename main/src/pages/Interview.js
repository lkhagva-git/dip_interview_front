import React, { useState } from 'react';
import { Form, Input, Button, message, Upload, DatePicker, Select, Checkbox, Row, Col, Radio, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { postRequest } from '../utils';
import { useAuth } from '../contexts/AuthContext';
import dayjs from 'dayjs';

const { Option } = Select;

const Interview = ({ data }) => {
    const { auth } = useAuth();
    const [form] = Form.useForm();
    const [interviewStatus, setInterviewStatus] = useState();
    const [firstModalOpen, setFirstModalOpen] = useState(false);
    const [secondModalOpen, setSecondModalOpen] = useState(false);

    const [formData, setFormData] = useState(false);

    const profile = auth.profile;

    const customRule = [{ required: true, message: 'Энэ талбарыг заавал бөглөнө үү' }];

    const firstModalHandleCancel = () => {
        setFirstModalOpen(false);
    };

    const secondModalHandleCancel = () => {
        setSecondModalOpen(false);
    };

    const handlePositiveDecision = () => {
        setInterviewStatus(0);
        setSecondModalOpen(true);
    };

    const handleNegativeDecision = () => {
        setInterviewStatus(1);
        setFirstModalOpen(false);
        send();
    };

    const send = async () => {

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

            status: interviewStatus,
            pros: formData.pros,
            cons: formData.cons,
            main_overall: formData.main_overall,
            conclution_points: formData.conclution_points,
            additional_note: formData.additional_note,

            candidate_id: data.id,
            suggest_employee_id: formData.suggest_employee_id
        }
        try {
            const response = await postRequest('/api/create_interview/', sendData);
            message.success('interview successfully created!');

        } catch (error) {
            message.error('Failed to create interview');
        }
    };


    const onFirstFormFinish = async (values) => {
        setFormData(values);
        console.log("values -->", values);
        setFirstModalOpen(true);
    };

    const onSecondFormFinish = async (values) => {
        setFormData({
            ...formData,
            suggest_employee_id: values.suggest_employee_id
        });
        send();
        // setFirstModalOpen(true);
    };


    return (
        <>
            <Modal title="Шийдвэр" open={firstModalOpen} onCancel={firstModalHandleCancel}>
                <Button type="primary" onClick={handlePositiveDecision}>
                    {profile.user_type === 0 ? 'Санал болгох' : 'Ажилд авах'}
                </Button>
                <Button type="primary" danger onClick={handleNegativeDecision}>
                    {profile.user_type === 0 ? 'Санал болгохгүй' : 'Ажилд авахгүй'}
                </Button>
            </Modal>

            <Modal title="Санал болгох" open={secondModalOpen} onCancel={secondModalHandleCancel}>
                <Form
                    name="basic"
                    onFinish={onSecondFormFinish}
                >
                    <Form.Item label="Санал болгох ажилтан" name="suggest_employee_id" rules={customRule}>
                        <Select placeholder="Сонгох">
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
                            <Option value="6">6</Option>
                            <Option value="7">7</Option>
                            <Option value="8">8</Option>
                            <Option value="9">9</Option>
                            <Option value="10">10</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Form
                layout={'vertical'}
                form={form}
                initialValues={{
                    interviewer_company: profile.company,
                    interviewer_department: profile.department,
                    interviewer_title: profile.title,
                    interviewer_full_name: profile.last_name + ' ' + profile.first_name,
                    candidate_last_name: data.last_name,
                    candidate_first_name: data.first_name,
                    created_at: dayjs(),
                    candidate_company: data.company,
                    candidate_department: data.department,
                    candidate_title: data.title
                }}
                onFinish={onFirstFormFinish}
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
                            <DatePicker defaultValue={dayjs()} style={{ width: '100%' }} disabled />
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
                            <Col span={12}>
                                <span>{index + 1}. {question}</span>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={`question_${index + 1}`} rules={customRule}>
                                    <Radio.Group>
                                        <Radio value="0">Хангалтгүй</Radio>
                                        <Radio value="1">Дунджаас доогуур</Radio>
                                        <Radio value="2">Дундаж</Radio>
                                        <Radio value="3">Сайн</Radio>
                                        <Radio value="4">Маш сайн</Radio>
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
                        <Form.Item label="Нэгдсэн дүгнэлт" name="conclution_points" rules={customRule}>
                            <Select placeholder="1 (Хангалтгүй) - 10 (Маш сайн)">
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                                <Option value="6">6</Option>
                                <Option value="7">7</Option>
                                <Option value="8">8</Option>
                                <Option value="9">9</Option>
                                <Option value="10">10</Option>
                            </Select>
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
        </>
    );
};

export default Interview;
