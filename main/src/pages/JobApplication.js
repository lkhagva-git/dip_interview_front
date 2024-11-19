import React from 'react';

const JobApplication = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Анкетын Мэдээлэл</h2>

      <div>
        <h3>Үндсэн мэдээлэл</h3>
        <p>Нэр: {data.first_name} {data.last_name}</p>
        <p>Регистерийн дугаар: {data.register_number}</p>
        <p>Төрсөн өдөр: {data.birth_date}</p>
        <p>Имэйл: {data.email}</p>
        <p>Утас: {data.phone}</p>
        <p>Нэмэлт утас: {data.phone2}</p>
        <p>Компани: {data.company}</p>
        <p>Алба: {data.department}</p>
        <p>Албан тушаал: {data.title}</p>
        <p>Хаяг: {data.city}, {data.district}, {data.address}</p>
      </div>

      <div>
        <h3>Гэр бүлийн гишүүд</h3>
        {data.families.map((family) => (
          <div key={family.id}>
            <p>Нэр: {family.first_name} {family.last_name}</p>
            <p>Мэргэжил: {family.profession}</p>
            <p>Компани: {family.company}</p>
            <p>Албан тушаал: {family.title}</p>
            <p>Утас: {family.phone}</p>
            <p>Онцгой байдлын холбоо барих: {family.is_emergency_contact ? 'Тийм' : 'Үгүй'}</p>
            <p>Хамт амьдардаг эсэх: {family.is_live_together ? 'Тийм' : 'Үгүй'}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Ажлын туршлага</h3>
        {data.prior_careers.map((career) => (
          <div key={career.id}>
            <p>Компани: {career.company}</p>
            <p>Албан тушаал: {career.title}</p>
            <p>Цалин: {career.salary}</p>
            <p>Эхэлсэн огноо: {career.start_date}</p>
            <p>Дууссан огноо: {career.end_date}</p>
            <p>Гарах шалтгаан: {career.leave_reason}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Мэргэжлийн холбоо барих</h3>
        {data.career_contacts.map((contact) => (
          <div key={contact.id}>
            <p>Нэр: {contact.first_name} {contact.last_name}</p>
            <p>Компани: {contact.company}</p>
            <p>Албан тушаал: {contact.title}</p>
            <p>Утас: {contact.phone}</p>
            <p>Имэйл: {contact.email}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Шагнал</h3>
        {data.awards.map((award) => (
          <div key={award.id}>
            <p>Шагнал: {award.name}</p>
            <p>Огноо: {award.year}</p>
            <p>Байгууллага: {award.where}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Боловсрол</h3>
        {data.educations.map((education) => (
          <div key={education.id}>
            <p>Улс: {education.country}</p>
            <p>Сургууль: {education.school_name}</p>
            <p>Мэргэжил: {education.profession}</p>
            <p>Эхэлсэн огноо: {education.start_date}</p>
            <p>Төгссөн огноо: {education.end_date}</p>
            <p>Голч оноо (GPA): {education.gpa}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Хэлний мэдлэг</h3>
        {data.languages.map((language) => (
          <div key={language.id}>
            <p>Хэл: {language.name}</p>
            <p>Сонсох: {language.listening}%</p>
            <p>Унших: {language.reading}%</p>
            <p>Бичих: {language.writing}%</p>
            <p>Ярих: {language.speaking}%</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Ур чадвар</h3>
        {data.skills.map((skill) => (
          <div key={skill.id}>
            <p>Ур чадвар: {skill.name}</p>
            <p>Туршлага: {skill.duration}</p>
            <p>Шагнал: {skill.award}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobApplication;
