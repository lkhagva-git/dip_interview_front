import React, { forwardRef, useImperativeHandle, useState } from "react";
import { message, Modal, Row, Col, Divider, Typography } from "antd";
import { getRequest } from "../utils";

const { Title } = Typography;

const ASSIGN_CHOICES = {
    0: "Хангалтгүй",
    1: "Дунджаас доогуур",
    2: "Дундаж",
    3: "Сайн",
    4: "Маш сайн",
};

const INTERVIEW_STATUS_CHOICES = {
    0: "Санал болгосон",
    1: "Санал болгоогүй",
    2: "Ажилд авсан",
    3: "Ажилд аваагүй",
};

const InterviewDetail = forwardRef((props, ref) => {
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [interviewDetailData, setInterviewDetailData] = useState(null);

    useImperativeHandle(ref, () => ({
        openModal,
    }));

    const getInterviewDetailData = async () => {
        try {
            const response = await getRequest(`/api/interview_detail/${props.props.inter_id}/`);
            setInterviewDetailData(response);
        } catch (error) {
            console.error("Failed to fetch interview detail:", error);
            message.error("Unable to load interview detail data.");
        }
    };

    const openModal = () => {
        setDetailModalOpen(true);
        getInterviewDetailData();
    };

    const closeModal = () => {
        setDetailModalOpen(false);
        setInterviewDetailData(null);
    };

    const getVerboseChoice = (value) => {
        return ASSIGN_CHOICES[value] ?? "Мэдээлэл алга";
    };

    const getStatusChoice = (value) => {
        return INTERVIEW_STATUS_CHOICES[value] ?? "Мэдээлэл алга";
    };

    return (
        <Modal
            title="Ярилцлагын дэлгэрэнгүй"
            open={detailModalOpen}
            onCancel={closeModal}
            footer={null}
            width={1000}
        >
            {interviewDetailData ? (
                <>
                    <Divider />
                    <Title level={3}>Ярилцлага хийгчийн мэдээлэл</Title>
                    <Row gutter={16}>
                        <Col span={12}>
                            <strong>Овог:</strong> {interviewDetailData.last_name}
                        </Col>
                        <Col span={12}>
                            <strong>Нэр:</strong> {interviewDetailData.first_name}
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: "16px" }}>
                        <Col span={12}>
                            <strong>Алба хэлтэс:</strong> {interviewDetailData.department}
                        </Col>
                        <Col span={12}>
                            <strong>Албан тушаал:</strong> {interviewDetailData.title}
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: "16px" }}>
                        <Col span={12}>
                            <strong>Ярилцлага хийсэн огноо:</strong> {interviewDetailData.interviewed_date}
                        </Col>
                        <Col span={12}>
                            <strong>Ярилцагын шат:</strong> {interviewDetailData.level} {interviewDetailData.is_final ? '/Сүүлийн шатны ярилцлага/' : ''}
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: "16px" }}>
                        <Col span={16}>
                            <strong>Үр дүн:</strong> {getStatusChoice(interviewDetailData.status)}
                        </Col>
                    </Row>

                    <Divider />
                    {[
                        { label: "Харилцаа", short: "(өөрийгөө илэрхийлэх чадвар, сонсох чадвар)", value: interviewDetailData.communication },
                        { label: "Гадаад төрх", short: "(хувцаслалт, body language)", value: interviewDetailData.appearance },
                        { label: "Асуултад хариулах буй байдал", short: "(санаагаа оновчтой илэрхийлэх буй эсэх, логик сэтгэлгээ, харилцааг ойлголцол)", value: interviewDetailData.logic_skill },
                        { label: "Хандлага", short: "(ээлтэй байдал, урам зориг, зорилгодоо хүрэх тэмүүлэл)", value: interviewDetailData.attitude },
                        { label: "Идэвх санаачлага", short: "(бие даасан байдал, авхаалж самбаа, хөдөлмөрч зан чанар, идэвхтэй байдал)", value: interviewDetailData.independence },
                        { label: "Өөрийгөө хөгжүүлэх зан чанар", short: "(хариуцлагатай байдал, зорилго тодорхойлсон байдал, өөртөө итгэх итгэл)", value: interviewDetailData.responsibility },
                        { label: "Манлайлах болон багтаа ажиллах", short: "(идэвхтэй, ажил хэрэгч байдал)", value: interviewDetailData.leadership },
                        { label: "Мэдлэг, авьяас", short: "(ерөнхий чадвар, техникийн ур чадвар)", value: interviewDetailData.knowledge },
                        { label: "Нэгдсэн дүгнэлт", short: "(дээрх бүх үнэлгээ зүйлсийг нэгтгэж дүгнэх)", value: interviewDetailData.overall_score },
                    ].map((item, index) => (
                        <Row gutter={16} key={index} style={{ marginBottom: "16px" }}>
                            <Col span={18}>
                                <p><strong>{item.label}</strong> {item.short}:</p>
                            </Col>
                            <Col span={6}>
                                <span>{getVerboseChoice(item.value)}</span>
                            </Col>
                        </Row>
                    ))}

                    <Divider />
                    <Row gutter={16}>
                        <Col span={24}>
                            <strong>Анхаарал татсан чадварууд:</strong> {interviewDetailData.pros || "Мэдээлэл алга"}
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <strong>Ажиглагдсан сул тал:</strong> {interviewDetailData.cons || "Мэдээлэл алга"}
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <strong>Ерөнхий дүгнэлт:</strong> {interviewDetailData.main_overall || "Мэдээлэл алга"}
                        </Col>
                    </Row>

                    <Divider />
                    <Row gutter={16}>
                        <Col span={12}>
                            <strong>Нэгдсэн дүгнэлт (оноо):</strong> {interviewDetailData.conclution_points}
                        </Col>

                    </Row>

                    <Row gutter={16} style={{ marginTop: "16px" }}>
                        <Col span={24}>
                            <strong>Нэмэлт тайлбар/тэмдэглэгээ:</strong> {interviewDetailData.additional_note || "Мэдээлэл алга"}
                        </Col>
                    </Row>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Modal>
    );
});

export default InterviewDetail;
