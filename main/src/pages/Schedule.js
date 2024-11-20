import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button, Modal } from 'antd';
import { getRequest } from '../utils';
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
    const navigate = useNavigate();
    const [scheduleData, setScheduleData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const getScheduleData = async () => {
        try {
            const response = await getRequest(`/api/schedule_list/`);
            const events = response.map((schedule) => ({
                id: schedule.id,
                title: `Ажлын ярилцлага - ${schedule.interview}`,
                start: schedule.date_time,
                extendedProps: {
                    address: schedule.address,
                    created_at: schedule.created_at,
                    created_by: schedule.title + ' - ' + schedule.last_name + ' ' + schedule.first_name,
                    candidate_id: schedule.anket,
                },
            }));

            setScheduleData(events);
        } catch (error) {
            console.error('Failed to fetch candidate interview history:', error);
        }
    };

    useEffect(() => {
        getScheduleData();
    }, []);

    const handleEventClick = (clickInfo) => {
        setSelectedEvent(clickInfo.event);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedEvent(null);
    };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                events={scheduleData}
                editable={true}
                selectable={true}
                eventClick={handleEventClick}
            />

            <Modal
                title={selectedEvent ? selectedEvent.title : 'Ажлын ярилцлага'}
                open={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                width={700}
            >
                {selectedEvent && (
                    <>
                        <div>
                            <p><strong>Огноо:</strong> {selectedEvent.start.toLocaleString()}</p>
                            <p><strong>Уулзалтын байршил:</strong> {selectedEvent.extendedProps.address}</p>
                            <p><strong>Уулзалт товлосон хэрэглэгч:</strong> {selectedEvent.extendedProps.created_by}</p>
                            <p><strong>Уулзалт товлосон огноо:</strong> {selectedEvent.extendedProps.created_at}</p>
                        </div>
                        <Button block className='mt-2' onClick={() => navigate(`/candidate/${selectedEvent.extendedProps.candidate_id}`)}>
                            Ярилцлага хэсэгт очих
                        </Button>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Schedule;
