import { Box, Card, Flex, Grid, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Calendar, CalendarProvider } from 'zaman';
import axiosInstance from '../services/axiosInstance';
import { IPerson } from '../components/PersonList/types';
import { useAppSelector } from '../store';
import PersonList from '../components/PersonList';

export interface NobatPageProps {}

const NobatPage: React.FunctionComponent<NobatPageProps> = () => {
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [nobat, setNobat] = useState<IPerson[]>();

  const { _id } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(calendarValue);
    calendarValue.setUTCHours(0, 0, 0, 0);
    axiosInstance
      .get('/nobat/doc/all', {
        params: {
          filter: { doctor: _id, date: calendarValue.toISOString() },
          limit: 5,
          populate: ['patient'],
        },
      })
      .then((res) => {
        const patients: IPerson[] = res.data.map(({ patient }) => ({
          id: patient._id,
          name: `${patient.firstName} ${patient.lastName}`,
          data: { idCode: patient.idCode },
        }));
        setNobat(patients);
      });
  }, [calendarValue, _id]);
  return (
    <Box>
      <Title>نوبت‌‌ها</Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Card shadow="md" radius={'md'}>
            <Flex align={'center'} justify={'center'}>
              <CalendarProvider locale="fa" round="x1">
                <Calendar
                  defaultValue={calendarValue}
                  onChange={(e) => setCalendarValue(new Date(e.value))}
                />
              </CalendarProvider>
            </Flex>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
          <PersonList list={nobat} link="/patients" showNumber showData />
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default NobatPage;
