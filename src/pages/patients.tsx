import React, { useEffect, useState } from 'react';
import { IPatient } from '../common/types';
import { IPerson } from '../components/PersonList/types';
import axiosInstance from '../services/axiosInstance';
import PersonList from '../components/PersonList';
import { Container, Title } from '@mantine/core';

export interface PatientsPageProps {}

const PatientsPage: React.FunctionComponent<PatientsPageProps> = () => {
  const [patients, setPatients] = useState<IPerson[]>();
  useEffect(() => {
    axiosInstance
      .get('/user/doctor/all', { params: { populate: ['meds'] } })
      .then((res) => {
        const data = res.data as IPatient[];
        const patients: IPerson[] = data.map((p) => ({
          id: p._id,
          name: `${p.firstName} ${p.lastName}`,
          data: { ...p },
        }));

        setPatients(patients);
      });
  }, []);
  return (
    <Container fluid>
      <Title order={1} mb={20}>
        بیماران
      </Title>
      <PersonList list={patients} />
    </Container>
  );
};

export default PatientsPage;
