import { Box, Card, Grid, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { IPatient } from '../common/types';
import { useAppSelector } from '../store';
import CustomTable from '../components/Table';
import { useNavigate } from 'react-router-dom';
import { ITicket } from './tickets';
import moment from 'jalali-moment';

export interface DashboardPageProps {}

const DashboardPage: React.FunctionComponent<DashboardPageProps> = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState<string[][]>();
  const [nobat, setNobat] = useState<string[][]>();
  const [tickets, setTickets] = useState<string[][]>();

  const { _id } = useAppSelector((state) => state.user);

  useEffect(() => {
    axiosInstance
      .get('/user/doctor/all', { params: { limit: 5, populate: ['meds'] } })
      .then((res) => {
        const data = res.data as IPatient[];
        const patients: string[][] = data.map((p, i) => [
          p._id,
          i + 1,
          `${p.firstName} ${p.lastName}`,
          p.idCode,
        ]);

        setPatients(patients);
      });
    const d = new Date();
    d.setUTCHours(0, 0, 0, 0);
    axiosInstance
      .get('/nobat/doc/all', {
        params: {
          filter: { doctor: _id, date: d.toISOString() },
          limit: 5,
          populate: ['patient'],
        },
      })
      .then((res) => {
        const patients: string[][] = res.data.map(({ patient }, i) => [
          patient._id,
          i + 1,
          `${patient.firstName} ${patient.lastName}`,
          patient.idCode,
        ]);
        setNobat(patients);
      });

    axiosInstance
      .get('/ticket', { params: { populate: ['patient'] } })
      .then((res) => {
        const data = res.data as ITicket[];
        const tickets = data.map((q, i) => [
          q._id,
          `${i + 1}`,
          q.title,
          `${q.patient.firstName} ${q.patient.lastName}`,
          moment(q.createdAt).locale('fa').format('YYYY/MM/DD'),
        ]);

        setTickets(tickets);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [_id]);

  const goToPatientPage = (id: string) => {
    navigate(`/patients/${id}`);
  };

  return (
    <Box>
      <Title>درود!</Title>
      <Grid mt={'md'}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="md" radius={'md'}>
            <Title order={2} mb={'md'}>
              بیماران
            </Title>
            {patients && (
              <CustomTable
                headers={['ردیف', 'نام و نام خانوادگی', 'کد ملی']}
                data={patients}
                highlightOnHover
                limit={5}
                striped
                onRowClickHandler={goToPatientPage}
              />
            )}
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="md" radius={'md'} mih={'100%'}>
            <Title order={2} mb={'md'}>
              نوبت‌های امروز
            </Title>
            {nobat && (
              <CustomTable
                headers={['ردیف', 'نام و نام خانوادگی', 'کد ملی']}
                data={nobat}
                highlightOnHover
                limit={5}
                striped
                onRowClickHandler={goToPatientPage}
              />
            )}
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12 }}>
          <Card shadow="md" radius={'md'}>
            <Title order={2} mb={'md'}>
              پرسش‌های بیماران
            </Title>
            {tickets && (
              <CustomTable
                headers={['ردیف', 'عنوان', 'کاربر', 'تاریخ']}
                data={tickets}
                highlightOnHover
                limit={5}
                striped
                onRowClickHandler={(id) => navigate('/ticket/' + id)}
              />
            )}
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
