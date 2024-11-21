import React, { useState } from 'react';
import { Form, Input, Button, message, Upload, DatePicker, Select, Checkbox, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { postRequest } from '../utils';

const { Option } = Select;

const CreateAnket = () => {
    const [form] = Form.useForm();
    const [familyFields, setFamilyFields] = useState([{}]);
    const [educationFields, setEducationFields] = useState([{}]);
    const [careerContactFields, setCareerContactFields] = useState([{}]);
    const [priorCareerFields, setPriorCareerFields] = useState([{}]);
    const [awardFields, setAwardFields] = useState([{}]);
    const [languageFields, setLanguageFields] = useState([{}]);
    const [skillFields, setSkillFields] = useState([{}]);

    const onFinish = async (values) => {
        try {
            await postRequest('/api/anket/', values);
            message.success('Анкет successfully created!');
            form.resetFields();
            setFamilyFields([{}]);
            setEducationFields([{}]);
            setCareerContactFields([{}]);
            setPriorCareerFields([{}]);
            setAwardFields([{}]);
            setLanguageFields([{}]);
            setSkillFields([{}]);
        } catch (error) {
            message.error('Failed to create Анкет');
        }
    };

    const addField = (setFields) => {
        setFields(prevFields => [...prevFields, {}]);
    };

    return (
        <>
            <Form
                layout={'vertical'}
                form={form}
                initialValues={{}}
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Level Count" name="level_count">
                            <Input placeholder="Level Count" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Status" name="status">
                            <Select placeholder="Select Status">
                                <Option value="1">Active</Option>
                                <Option value="2">Inactive</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Created At" name="created_at">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Company" name="company">
                            <Input placeholder="Company" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Department" name="department">
                            <Input placeholder="Department" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Title" name="title">
                            <Input placeholder="Title" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Ethnicity" name="ethnicity">
                            <Input placeholder="Ethnicity" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Family Name" name="family_name">
                            <Input placeholder="Family Name" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Last Name" name="last_name">
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="First Name" name="first_name">
                            <Input placeholder="First Name" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Register Number" name="register_number">
                            <Input placeholder="Register Number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Birth Date" name="birth_date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Email" name="email">
                            <Input placeholder="Email" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Phone" name="phone">
                            <Input placeholder="Phone Number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Phone 2" name="phone2">
                            <Input placeholder="Phone Number 2" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="City" name="city">
                            <Input placeholder="City" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="District" name="district">
                            <Input placeholder="District" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Address" name="address">
                            <Input placeholder="Address" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Sex" name="sex">
                            <Select placeholder="Select Sex">
                                <Option value="1">Male</Option>
                                <Option value="2">Female</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Blood Group" name="blood">
                            <Select placeholder="Select Blood Group">
                                <Option value="1">A</Option>
                                <Option value="2">B</Option>
                                <Option value="3">AB</Option>
                                <Option value="4">O</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Driver Type" name="driver_type">
                            <Select placeholder="Select Driver Type">
                                <Option value="1">A</Option>
                                <Option value="2">B</Option>
                                <Option value="3">C</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Driver License" name="driver_license">
                            <Input placeholder="Driver License" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Medical" name="medical">
                            <Input.TextArea placeholder="Medical Issues" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Photo" name="photo">
                            <Upload listType="picture-card">
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <h3>Family Members</h3>
                {familyFields.map((_, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={`Family Member ${index + 1} - First Name`}
                                    name={['families', index, 'first_name']}
                                >
                                    <Input placeholder="First Name" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Family Member ${index + 1} - Last Name`}
                                    name={['families', index, 'last_name']}
                                >
                                    <Input placeholder="Last Name" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Family Member ${index + 1} - Birth Date`}
                                    name={['families', index, 'birth_date']}
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={`Family Member ${index + 1} - Profession`}
                                    name={['families', index, 'profession']}
                                >
                                    <Input placeholder="Profession" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Family Member ${index + 1} - Company`}
                                    name={['families', index, 'company']}
                                >
                                    <Input placeholder="Company" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Family Member ${index + 1} - Title`}
                                    name={['families', index, 'title']}
                                >
                                    <Input placeholder="Title" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={`Family Member ${index + 1} - Phone`}
                                    name={['families', index, 'phone']}
                                >
                                    <Input placeholder="Phone Number" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Family Member ${index + 1} - Is Emergency Contact`}
                                    name={['families', index, 'is_emergency_contact']}
                                    valuePropName="checked"
                                >
                                    <Checkbox>Is Emergency Contact</Checkbox>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Family Member ${index + 1} - Is Live Together`}
                                    name={['families', index, 'is_live_together']}
                                    valuePropName="checked"
                                >
                                    <Checkbox>Is Live Together</Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                ))}
                <Button type="dashed" onClick={() => addField(setFamilyFields)} block>
                    Add Family Member
                </Button>

                <h3>Education</h3>
                {educationFields.map((_, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={`Education ${index + 1} - Country`}
                                    name={['education', index, 'country']}
                                >
                                    <Input placeholder="Country" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Education ${index + 1} - School Name`}
                                    name={['education', index, 'school_name']}
                                >
                                    <Input placeholder="School Name" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Education ${index + 1} - Degree level`}
                                    name={['education', index, 'degree_level']}
                                >
                                    <Input placeholder="Degree level" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={`Education ${index + 1} - Start date`}
                                    name={['education', index, 'start_date']}
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Education ${index + 1} - End date`}
                                    name={['education', index, 'end_date']}
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Education ${index + 1} - Profession`}
                                    name={['education', index, 'profession']}
                                >
                                    <Input placeholder="Profession" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={`Education ${index + 1} - Gpa`}
                                    name={['education', index, 'gpa']}
                                >
                                    <Input placeholder="gpa" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                ))}
                <Button type="dashed" onClick={() => addField(setEducationFields)} block>
                    Add Education
                </Button>

                <h3>Career Contact</h3>
                {careerContactFields.map((_, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={`Career Contact ${index + 1} - First Name`}
                                    name={['contacts', index, 'first_name']}
                                >
                                    <Input placeholder="First Name" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Career Contact ${index + 1} - Last Name`}
                                    name={['contacts', index, 'last_name']}
                                >
                                    <Input placeholder="Last Name" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Career Contact ${index + 1} - Company`}
                                    name={['contacts', index, 'company']}
                                >
                                    <Input placeholder="Company" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={`Career Contact ${index + 1} - Title`}
                                    name={['contacts', index, 'title']}
                                >
                                    <Input placeholder="Title" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Career Contact ${index + 1} - Phone`}
                                    name={['contacts', index, 'phone']}
                                >
                                    <Input placeholder="Phone Number" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Career Contact ${index + 1} - Email`}
                                    name={['contacts', index, 'email']}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                ))}
                <Button type="dashed" onClick={() => addField(setCareerContactFields)} block>
                    Add Career Contact
                </Button>

                <h3>Prior Career</h3>
                {priorCareerFields.map((_, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={`Prior Career ${index + 1} - Company`}
                                    name={['prior_careers', index, 'company']}
                                >
                                    <Input placeholder="Company" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Prior Career ${index + 1} - Title`}
                                    name={['prior_careers', index, 'title']}
                                >
                                    <Input placeholder="Title" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Prior Career ${index + 1} - Salary`}
                                    name={['prior_careers', index, 'salary']}
                                >
                                    <Input placeholder="Salary" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={`Prior Career ${index + 1} - Start Date`}
                                    name={['prior_careers', index, 'start_date']}
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Prior Career ${index + 1} - End Date`}
                                    name={['prior_careers', index, 'end_date']}
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Prior Career ${index + 1} - Leave Reason`}
                                    name={['prior_careers', index, 'leave_reason']}
                                >
                                    <Input placeholder="Leave Reason" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                ))}
                <Button type="dashed" onClick={() => addField(setPriorCareerFields)} block>
                    Add Prior Career
                </Button>

                <h3>Awards</h3>
                {awardFields.map((_, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={`Award ${index + 1} - Name`}
                                    name={['awards', index, 'name']}
                                >
                                    <Input placeholder="Award Name" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Award ${index + 1} - Year`}
                                    name={['awards', index, 'year']}
                                >
                                    <DatePicker picker="year" style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Award ${index + 1} - Where`}
                                    name={['awards', index, 'where']}
                                >
                                    <Input placeholder="Where Awarded" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                ))}
                <Button type="dashed" onClick={() => addField(setAwardFields)} block>
                    Add Award
                </Button>

                <h3>Languages</h3>
                {languageFields.map((_, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={`Language ${index + 1} - Name`}
                                    name={['languages', index, 'name']}
                                >
                                    <Input placeholder="Language Name" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Language ${index + 1} - Listening`}
                                    name={['languages', index, 'listening']}
                                >
                                    <Select placeholder="Listening Proficiency">
                                        <Option value="1">Poor</Option>
                                        <Option value="2">Average</Option>
                                        <Option value="3">Good</Option>
                                        <Option value="4">Excellent</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Language ${index + 1} - Reading`}
                                    name={['languages', index, 'reading']}
                                >
                                    <Select placeholder="Reading Proficiency">
                                        <Option value="1">Poor</Option>
                                        <Option value="2">Average</Option>
                                        <Option value="3">Good</Option>
                                        <Option value="4">Excellent</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={`Language ${index + 1} - Writing`}
                                    name={['languages', index, 'writing']}
                                >
                                    <Select placeholder="Writing Proficiency">
                                        <Option value="1">Poor</Option>
                                        <Option value="2">Average</Option>
                                        <Option value="3">Good</Option>
                                        <Option value="4">Excellent</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Language ${index + 1} - Speaking`}
                                    name={['languages', index, 'speaking']}
                                >
                                    <Select placeholder="Speaking Proficiency">
                                        <Option value="1">Poor</Option>
                                        <Option value="2">Average</Option>
                                        <Option value="3">Good</Option>
                                        <Option value="4">Excellent</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                ))}
                <Button type="dashed" onClick={() => addField(setLanguageFields)} block>
                    Add Language
                </Button>

                <h3>Skills</h3>
                {skillFields.map((_, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={`Skill ${index + 1} - Name`}
                                    name={['skills', index, 'name']}
                                >
                                    <Input placeholder="Skill Name" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Skill ${index + 1} - Duration`}
                                    name={['skills', index, 'duration']}
                                >
                                    <Input placeholder="Duration" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label={`Skill ${index + 1} - award`}
                                    name={['skills', index, 'award']}
                                >
                                    <Input placeholder="award" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                ))}
                <Button type="dashed" onClick={() => addField(setSkillFields)} block>
                    Add Skill
                </Button>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateAnket;