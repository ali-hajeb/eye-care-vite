import { Box, Card, Flex, Grid, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Calendar, CalendarProvider } from 'zaman';
import axiosInstance from '../services/axiosInstance';
import { useAppSelector } from '../store';
import CustomTable from '../components/Table';
import { useNavigate } from 'react-router-dom';

export interface NobatPageProps {}

const NobatPage: React.FunctionComponent<NobatPageProps> = () => {
  const navigate = useNavigate();
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [nobat, setNobat] = useState<string[][]>();

  const { _id } = useAppSelector((state) => state.user);

  useEffect(() => {
    // console.log(moment(calendarValue).locale('fa').format('YYYY/MM/DD'));
    console.log(calendarValue);
    const updated = new Date(calendarValue);
    updated.setUTCHours(0, 0, 0, 0);
    // calendarValue.setUTCHours(0, 0, 0, 0);
    axiosInstance
      .get('/nobat/doc/all', {
        params: {
          filter: { doctor: _id, date: updated.toISOString() },
          limit: 5,
          populate: ['patient'],
        },
      })
      .then((res) => {
        console.log(res.data)
        const patients: string[][] = res.data.map(({ patient }, i) => [
          patient._id,
          i + 1,
          `${patient.firstName} ${patient.lastName}`,
          patient.idCode,
        ]);
        setNobat(patients);
      });
  }, [calendarValue, _id]);

  const goToPatientPage = (id: string) => {
    navigate(`/patients/${id}`);
  };
  return (
    <Box>
      <Title>نوبت‌‌ها</Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Card shadow="md" radius={'md'} px={1} py={5}>
            <Flex align={'center'} justify={'center'}>
              <CalendarProvider locale="fa" round="x1">
                <Calendar
                  defaultValue={calendarValue}
                  onChange={(e) => {
                    console.log(e.value);
                    setCalendarValue(new Date(e.value));
                  }}
                />
              </CalendarProvider>
            </Flex>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
          <Card shadow="md" radius={'md'}>
            <Title order={2} mb={'md'}>
              بیماران
            </Title>

            {nobat && (
              <CustomTable
                headers={['ردیف', 'نام و نام خانوادگی', 'کد ملی']}
                data={nobat}
                highlightOnHover
                limit={10}
                showPages
                striped
                onRowClickHandler={goToPatientPage}
              />
            )}
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default NobatPage;
