import React from 'react';
import { Card, Typography, Divider, Space, Row, Col, Image } from 'antd';

const { Title, Text } = Typography;
const API_BASE_URL = 'http://localhost:8001/';

const JobApplication = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Card title="Анкетын Мэдээлэл" bordered={false} style={{ margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={3}>Үндсэн мэдээлэл</Title>
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Text><strong>Нэр:</strong> {data.first_name} {data.last_name}</Text><br />
              <Text><strong>Регистерийн дугаар:</strong> {data.register_number}</Text><br />
              <Text><strong>Төрсөн өдөр:</strong> {data.birth_date}</Text><br />
              <Text><strong>Имэйл:</strong> {data.email}</Text><br />
              <Text><strong>Утас:</strong> {data.phone}</Text><br />
              <Text><strong>Нэмэлт утас:</strong> {data.phone2}</Text><br />
              <Text><strong>Компани:</strong> {data.company}</Text><br />
              <Text><strong>Алба:</strong> {data.department}</Text><br />
              <Text><strong>Албан тушаал:</strong> {data.title}</Text><br />
              <Text><strong>Хаяг:</strong> {data.city}, {data.district}, {data.address}</Text>
            </Col>
            <Col flex="220px">
              <Image
                width={220}
                src={API_BASE_URL + data.image_url}
                alt="Profile Picture"
              />
            </Col>
          </Row>
        </div>

        <Divider />

        <div>
          <Title level={3}>Гэр бүлийн гишүүд</Title>
          {data.families.map((family) => (
            <Card key={family.id} type="inner" style={{ marginBottom: 16 }}>
              <Text><strong>Нэр:</strong> {family.first_name} {family.last_name}</Text><br />
              <Text><strong>Мэргэжил:</strong> {family.profession}</Text><br />
              <Text><strong>Компани:</strong> {family.company}</Text><br />
              <Text><strong>Албан тушаал:</strong> {family.title}</Text><br />
              <Text><strong>Утас:</strong> {family.phone}</Text><br />
              <Text><strong>Онцгой байдлын холбоо барих:</strong> {family.is_emergency_contact ? 'Тийм' : 'Үгүй'}</Text><br />
              <Text><strong>Хамт амьдардаг эсэх:</strong> {family.is_live_together ? 'Тийм' : 'Үгүй'}</Text>
            </Card>
          ))}
        </div>

        <Divider />

        <div>
          <Title level={3}>Ажлын туршлага</Title>
          {data.prior_careers.map((career) => (
            <Card key={career.id} type="inner" style={{ marginBottom: 16 }}>
              <Text><strong>Компани:</strong> {career.company}</Text><br />
              <Text><strong>Албан тушаал:</strong> {career.title}</Text><br />
              <Text><strong>Цалин:</strong> {career.salary}</Text><br />
              <Text><strong>Эхэлсэн огноо:</strong> {career.start_date}</Text><br />
              <Text><strong>Дууссан огноо:</strong> {career.end_date}</Text><br />
              <Text><strong>Гарах шалтгаан:</strong> {career.leave_reason}</Text>
            </Card>
          ))}
        </div>

        <Divider />

        <div>
          <Title level={3}>Мэргэжлийн холбоо барих</Title>
          {data.career_contacts.map((contact) => (
            <Card key={contact.id} type="inner" style={{ marginBottom: 16 }}>
              <Text><strong>Нэр:</strong> {contact.first_name} {contact.last_name}</Text><br />
              <Text><strong>Компани:</strong> {contact.company}</Text><br />
              <Text><strong>Албан тушаал:</strong> {contact.title}</Text><br />
              <Text><strong>Утас:</strong> {contact.phone}</Text><br />
              <Text><strong>Имэйл:</strong> {contact.email}</Text>
            </Card>
          ))}
        </div>

        <Divider />

        <div>
          <Title level={3}>Шагнал</Title>
          {data.awards.map((award) => (
            <Card key={award.id} type="inner" style={{ marginBottom: 16 }}>
              <Text><strong>Шагнал:</strong> {award.name}</Text><br />
              <Text><strong>Огноо:</strong> {award.year}</Text><br />
              <Text><strong>Байгууллага:</strong> {award.where}</Text>
            </Card>
          ))}
        </div>

        <Divider />

        <div>
          <Title level={3}>Боловсрол</Title>
          {data.educations.map((education) => (
            <Card key={education.id} type="inner" style={{ marginBottom: 16 }}>
              <Text><strong>Улс:</strong> {education.country}</Text><br />
              <Text><strong>Сургууль:</strong> {education.school_name}</Text><br />
              <Text><strong>Мэргэжил:</strong> {education.profession}</Text><br />
              <Text><strong>Эхэлсэн огноо:</strong> {education.start_date}</Text><br />
              <Text><strong>Төгссөн огноо:</strong> {education.end_date}</Text><br />
              <Text><strong>Голч оноо (GPA):</strong> {education.gpa}</Text>
            </Card>
          ))}
        </div>

        <Divider />

        <div>
          <Title level={3}>Хэлний мэдлэг</Title>
          {data.languages.map((language) => (
            <Card key={language.id} type="inner" style={{ marginBottom: 16 }}>
              <Text><strong>Хэл:</strong> {language.name}</Text><br />
              <Text><strong>Сонсох:</strong> {language.listening}%</Text><br />
              <Text><strong>Унших:</strong> {language.reading}%</Text><br />
              <Text><strong>Бичих:</strong> {language.writing}%</Text><br />
              <Text><strong>Ярих:</strong> {language.speaking}%</Text>
            </Card>
          ))}
        </div>

        <Divider />

        <div>
          <Title level={3}>Ур чадвар</Title>
          {data.skills.map((skill) => (
            <Card key={skill.id} type="inner" style={{ marginBottom: 16 }}>
              <Text><strong>Ур чадвар:</strong> {skill.name}</Text><br />
              <Text><strong>Туршлага:</strong> {skill.duration}</Text><br />
              <Text><strong>Шагнал:</strong> {skill.award}</Text>
            </Card>
          ))}
        </div>
      </Space>
    </Card>
  );
};

export default JobApplication;
