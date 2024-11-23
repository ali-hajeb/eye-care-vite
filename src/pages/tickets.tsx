import { Box, Button, Card, Combobox, Container, Group, Input, InputBase, TextInput, Title, useCombobox } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { IPatient } from '../common/types';
import moment from 'jalali-moment';
import CustomTable from '../components/Table';
import { useNavigate } from 'react-router-dom';

export interface TicketsPageProps {}

export interface IQuestion {
  _id: string;
  from: string;
  userType: 'user' | 'doctor';
  alias: string;
  replyTo: string;
  ticketId: string;
  body: string;
  createdAt: string;
}

export interface ITicket {
  _id: string;
  patient: IPatient;
  title: string;
  body: string;
  messages: IQuestion[];
  createdAt: string;
}

const COMBO = ['کاربر', 'عنوان'];


const TicketsPage: React.FunctionComponent<TicketsPageProps> = () => {
  const navigate = useNavigate();
  
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [comboValue, setComboValue] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [questions, setQuestions] = useState<string[][]>();
  const [loadingState, setLoadingState] = useState(false);
  // const [error, setError] = useState();

  const options = COMBO.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const goToticketPage = (id: string) => {
    navigate(`/ticket/${id}`);
  };

  const onSearchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const onSearchClickHandler = () => {
    if (searchValue && comboValue) {
      const searchTypeIndex = comboValue === 'عنوان' ? 2 : 3;
      const results = questions?.filter((p) =>
        p[searchTypeIndex].includes(searchValue),
      );
      setQuestions(results);
    }
  };

  const quesBAK = useRef<string[][]>();

  useEffect(() => {
    setLoadingState(true);
    axiosInstance
      .get('/ticket', { params: { populate: ['patient'] } })
      .then((res) => {
        const data = res.data as ITicket[];
        const questions = data.map((q, i) => [
          q._id,
          `${i + 1}`,
          q.title,
          `${q.patient.firstName} ${q.patient.lastName}`,
          moment(q.createdAt).locale('fa').format('YYYY/MM/DD'),
        ]);

        setQuestions(questions);
        quesBAK.current = [...questions];
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoadingState(false));
  }, []);
  return (
    <Container>
      <Title>پرسش‌های بیماران</Title>
      <Card radius={'md'} shadow="md" mt={'md'}>
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
          <Button
            variant="outline"
            onClick={() => setQuestions(quesBAK.current)}
          >
            پاک کردن فیلتر
          </Button>
        </Group>
        {questions && (
          <CustomTable
            headers={['ردیف', 'عنوان', 'کاربر', 'تاریخ']}
            data={questions}
            striped
            highlightOnHover
            onRowClickHandler={goToticketPage}
            limit={15}
            showPages
          />
        )}
      </Card>
    </Container>
  );
};

export default TicketsPage;
