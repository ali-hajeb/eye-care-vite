import React, { useEffect, useRef, useState } from 'react';
import { IPatient } from '../common/types';
import axiosInstance from '../services/axiosInstance';
import {
  Box,
  Button,
  Card,
  Combobox,
  Container,
  Group,
  Input,
  InputBase,
  TextInput,
  Title,
  useCombobox,
} from '@mantine/core';
import CustomTable from '../components/Table';
import { useNavigate } from 'react-router-dom';

export interface PatientsPageProps {}

const COMBO = ['نام', 'کد ملی'];

const PatientsPage: React.FunctionComponent<PatientsPageProps> = () => {
  const navigate = useNavigate();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [comboValue, setComboValue] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [patients, setPatients] = useState<string[][]>();

  const patientBAK = useRef<string[][]>();

  const options = COMBO.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const onSearchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  useEffect(() => {
    axiosInstance
      .get('/user/doctor/all', { params: { populate: ['meds'] } })
      .then((res) => {
        const data = res.data as IPatient[];
        const patients: string[][] = data.map((p, i) => [
          p._id,
          `${i + 1}`,
          `${p.firstName} ${p.lastName}`,
          p.idCode,
        ]);

        setPatients(patients);
        patientBAK.current = [...patients]
      });
  }, []);

  const goToPatientPage = (id: string) => {
    navigate(`/patients/${id}`);
  };
  const onSearchClickHandler = () => {
    if (searchValue && comboValue) {
      const searchTypeIndex = comboValue === 'نام' ? 2 : 3;
      const results = patients?.filter(p => p[searchTypeIndex].includes(searchValue));
      setPatients(results)
    }
  };
  return (
    <Container fluid>
      <Title order={1} mb={20}>
        بیماران
      </Title>
      {/* <PersonList list={patients} /> */}
      <Card radius={'md'} shadow="md">
        <Group mb={'md'}>
          <TextInput
            placeholder="عبارت جستجو"
            type="search"
            value={searchValue}
            onChange={onSearchHandler}
          />
          <Box>
            <Combobox
              store={combobox}
              onOptionSubmit={(val) => {
                setComboValue(val);
                combobox.closeDropdown();
              }}
            >
              <Combobox.Target>
                <InputBase
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron />}
                  rightSectionPointerEvents="none"
                  onClick={() => combobox.toggleDropdown()}
                >
                  {comboValue || (
                    <Input.Placeholder>انتخاب فیلتر</Input.Placeholder>
                  )}
                </InputBase>
              </Combobox.Target>

              <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
          </Box>
          <Button onClick={onSearchClickHandler}>جستجو</Button>
          <Button variant='outline' onClick={() => setPatients(patientBAK.current)}>پاک کردن فیلتر</Button>
        </Group>
        {patients && (
          <CustomTable
            headers={['ردیف', 'نام و نام خانوادگی', 'کد ملی']}
            data={patients}
            striped
            highlightOnHover
            onRowClickHandler={goToPatientPage}
            limit={15}
            showPages
          />
        )}
      </Card>
    </Container>
  );
};

export default PatientsPage;
