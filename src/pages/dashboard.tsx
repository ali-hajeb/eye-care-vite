import { Box, Grid, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import PersonList from '../components/PersonList';
import axiosInstance from '../services/axiosInstance';
import { IPatient } from '../common/types';
import { IPerson } from '../components/PersonList/types';
import { useAppSelector } from '../store';

export interface DashboardPageProps {}

const DashboardPage: React.FunctionComponent<DashboardPageProps> = () => {
  const [patients, setPatients] = useState<IPerson[]>();
  const [nobat, setNobat] = useState<IPerson[]>();

  const { _id } = useAppSelector((state) => state.user);

  useEffect(() => {
    axiosInstance
      .get('/user/doctor/all', { params: { limit: 5, populate: ['meds'] } })
      .then((res) => {
        const data = res.data as IPatient[];
        const patients: IPerson[] = data.map((p) => ({
          id: p._id,
          name: `${p.firstName} ${p.lastName}`,
          data: { ...p },
        }));

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
        const patients: IPerson[] = res.data.map(({ patient }) => ({
          id: patient._id,
          name: `${patient.firstName} ${patient.lastName}`,
          data: { ...patient },
        }));
        setNobat(patients);
      });
  }, [_id]);

  return (
    <Box>
      <Title>درود!</Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Box mt={'md'}>
            <Title order={2} mb={20}>
              بیماران
            </Title>
            <PersonList list={patients} link="/patients" />
          </Box>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Box mt={'md'}>
            <Title order={2} mb={20}>
              نوبت‌های امروز
            </Title>
            <PersonList list={nobat} link="/patients" />
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
