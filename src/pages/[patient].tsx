import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IMedicine, IPatient } from '../common/types';
import axiosInstance from '../services/axiosInstance';
import {
  Box,
  Card,
  Container,
  Grid,
  Group,
  Text,
  Title,
} from '@mantine/core';
import { patientInfoFields } from '../features/UserAuthentication/constants/patientInfo';
import { transformValue } from '../utils/dataPresentation';
import { doubleDigit } from '../utils';
import moment from 'jalali-moment';
import Styles from './Styles.module.css';

type MedicineUsage = {
  [time: string]: boolean;
};
interface MedicineUsageDay extends Record<string, string | MedicineUsage> {
  // date: string;
}
export interface PatientPageProps {}

const PatientPage: React.FunctionComponent<PatientPageProps> = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const [patient, setPatient] = useState<IPatient>();
  const [medicineUsage, setMedicineUsage] = useState<MedicineUsageDay[]>();

  const createMedicineUsageCalendar = (meds: IMedicine[]) => {
    console.log('here');
    const usageCalendar: MedicineUsageDay[] = [];

    const today = new Date();
    const startFromDate = new Date(meds[0].startFrom);
    const days = Math.abs(today.getDate() - startFromDate.getDate()) + 1;

    for (let i = 0; i < days; i++) {
      const d = new Date();
      const tomorrow = new Date();
      d.setDate(d.getDate() - 1 * i);
      tomorrow.setDate(d.getDate() + 1);
      d.setSeconds(0);
      let day: MedicineUsageDay = { date: d.toISOString().split('T')[0] };
      for (const med of meds) {
        const medStartFrom = new Date(med.startFrom);
        console.log(
          '[d]',
          moment(medStartFrom).locale('fa').format('YYYY/MM/DD'),
          moment(tomorrow).locale('fa').format('YYYY/MM/DD'),
        );
        if (medStartFrom <= tomorrow) {
          // console.log('[d]', moment(day.date).locale('fa').format('YYYY/MM/DD'), med)
          let reminders = {};
          for (const r of med.reminders) {
            reminders = { ...reminders, [r]: false };
          }
          day = { ...day, [med.name]: reminders };
        }
      }
      usageCalendar.push(day);
    }

    for (const med of meds) {
      if (med.usageHistory)
        for (const usage of med.usageHistory) {
          for (const day of usageCalendar) {
            if (med.name in day) {
              if (day.date === usage.date.split('T')[0]) {
                const u = new Date(usage.date);
                const reminder = `${doubleDigit(u.getHours())}:${doubleDigit(
                  u.getMinutes(),
                )}`;
                (day[med.name] as MedicineUsage)[reminder] = true;
              }
            }
          }
        }
    }

    console.log('[calendar]', usageCalendar);
    setMedicineUsage(usageCalendar.reverse());

    return usageCalendar;
  };

  useEffect(() => {
    console.log(medicineUsage);
  }, [medicineUsage]);

  useEffect(() => {
    if (state && state.data) {
      setPatient(state.data);
    } else {
      axiosInstance
        .get('/user/doctor/all', {
          params: { filter: { _id: id }, populate: ['meds', 'nobat'] },
        })
        .then((res) => {
          const p = res.data as IPatient[];
          const medicineUsage = p[0].meds;
          if (medicineUsage && medicineUsage.length > 0) {
            medicineUsage.sort((a, b) => {
              const aDate = new Date(a.startFrom);
              const bDate = new Date(b.startFrom);
              return aDate.getTime() - bDate.getTime();
            });
            createMedicineUsageCalendar(medicineUsage);
            console.log('drugHistory', medicineUsage);
          }
          setPatient(p[0]);
        });
    }
  }, [id, state]);

  return (
    <Container fluid>
      {/* <Avatar size={'xl'} /> */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 12, lg: 4 }}>
          <Title mb={'md'}>مشخصات بیمار</Title>
          <Card radius={'md'} dir="rtl" shadow={'sm'}>
            {patient &&
              Object.keys(patient).map((p) => {
                console.log(
                  p,
                  patient[p as keyof IPatient],
                  patient[p as keyof IPatient] === null,
                  typeof patient[p as keyof IPatient],
                );
                if (patient[p as keyof IPatient] !== null) {
                  return (
                    <Group align="baseline" mb={'sm'}>
                      <Text fw={700}>
                        {patientInfoFields[p as keyof IPatient]}
                      </Text>
                      <Text id={p}>
                        {transformValue(
                          p as keyof IPatient,
                          patient[p as keyof IPatient],
                        )}
                      </Text>
                    </Group>
                  );
                }
              })}
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 12, lg: 8 }}>
          <Title>تاریخچه مصرف دارو</Title>
          <Group wrap="wrap" mt={'md'}>
            {medicineUsage &&
              medicineUsage.map((u, i) => {
                const { date, ...meds } = u;
                const m = moment(date).locale('fa');
                const day = `${m.format('DD')} ${m.format('MMMM')}`;
                console.log(u);
                return (
                  <Card radius={'md'} dir="rtl" shadow={'sm'} key={i} >
                    <Text className={Styles.sample_farsi_digits} fw={700} mb={'sm'}>
                      {day}
                    </Text>
                    {Object.keys(meds).map((m, i) => (
                      <div key={i}>
                        <Text size="sm">
                          {m}:{' '}
                          {Object.keys(meds[m] as MedicineUsage).map((q, i) => (
                            <span key={i} title={q}>
                              {(meds[m] as MedicineUsage)[q] ? '✅' : '❌'}
                            </span>
                          ))}
                        </Text>
                      </div>
                    ))}
                  </Card>
                );
              })}
          </Group>
          <Box></Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default PatientPage;
