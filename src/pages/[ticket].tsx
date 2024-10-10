import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import { IQuestion, ITicket } from './tickets';
import { IPatient } from '../common/types';
import { useAppSelector } from '../store';
import { userLocalStorageKey } from '../features/UserAuthentication/constants';
import { IUserSignUpObject } from '../features/UserAuthentication/types/user';
import { isAxiosError } from 'axios';
import { IconInfoCircle, IconTrash } from '@tabler/icons-react';
import { theme } from '../theme';
import { doubleDigit } from '../utils';

interface IResponse {
  code: number;
  message: string;
}

const toTime = (date: string) => {
  const d = new Date(date);
  return `${doubleDigit(d.getHours())}:${doubleDigit(d.getMinutes())}`;
};

export interface TicketPageProps {}

const TicketPage: React.FunctionComponent<TicketPageProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loadingState, setLoadingState] = useState(false);
  const [ticket, setTicket] = useState<ITicket>();
  const [messages, setMessages] = useState<IQuestion[]>();
  const [answer, setAnswer] = useState('');
  const [res, setRes] = useState<IResponse | null>();

  const { _id } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/ticket/${id}`, { params: { populate: ['patient', 'messages'] } })
        .then((res) => {
          const data = res.data as ITicket;
          setTicket(data);
        })
        .catch((err) => {
          console.error(err);
          navigate(-1);
        })
        .finally(() => setLoadingState(false));
    }
  }, [id]);

  const formSubmitHandler = (e: React.FormEvent) => {
    e?.preventDefault();
    const user = JSON.parse(
      localStorage.getItem('profile') || '{}',
    ) as IUserSignUpObject;
    console.log(user);
    const alias = `دکتر ${user.firstName} ${user.lastName} - ${user.major} ${user.field}`;
    const ans = {
      from: _id,
      userType: 'doctor',
      alias,
      ticketId: id,
      body: answer,
    };
    console.log(ans);
    setLoadingState(true);
    axiosInstance
      .post(`/question/doc`, ans)
      .then((res) => {
        setRes({ code: 200, message: 'پاسخ با موفقیت منتشر شد.' });
        setTicket((prev) => ({
          ...prev,
          messages: [...prev?.messages, res.data.newQuestion],
        }));
        setTimeout(() => {
          setRes(null);
        }, 1500);
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          setRes({
            code: err.response?.status || 500,
            message: 'مشکلی در ارسال درخواست پیش آمده‌است!',
          });
        }
      })
      .finally(() => setLoadingState(false));
  };

  const onDeleteQuestion = (id: string) => {
    setLoadingState(true);
    axiosInstance
      .delete('/question/doc/' + id)
      .then((res) => {
        setTicket((prev) => {
          const updated = prev?.messages.filter((m) => m._id !== id);
          return { ...prev, messages: updated };
        });
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          setRes({
            code: err.response?.status || 500,
            message: 'مشکلی در ارسال درخواست پیش آمده‌است!',
          });
        }
      })
      .finally(() => setLoadingState(false));
  };

  const answerInputChangeHandler = (
    e: React.FormEvent<HTMLTextAreaElement>,
  ) => {
    setAnswer(e.currentTarget.value);
  };

  return (
    <Container>
      <Card radius={'md'} shadow="md">
        {ticket && (
          <>
            <Text>
              {`${(ticket.patient as IPatient).firstName} ${
                (ticket.patient as IPatient).lastName
              } پرسیده:`}
            </Text>
            <Title order={2}>{ticket.title}</Title>
            <Card my={'md'} mx={'lg'} p={'lg'} shadow={'none'} radius={'md'}>
              {ticket.body}
            </Card>
            <Flex direction={'column'}>
              {ticket.messages.map((t) => (
                <Box
                  mb={'sm'}
                  style={{
                    alignSelf: t.from === _id ? 'flex-start' : 'flex-end',
                  }}
                >
                  <Group>
                    <Card
                      bg={t.from === _id ? 'blue.6' : 'gray.3'}
                      radius={'md'}
                      pb={2}
                      c={t.from === _id ? '#f5f5f5' : 'dark.9'}
                      key={t._id}
                    >
                      <Text fs={'italic'} fw={'bolder'} size="lg">
                        {t.alias}
                      </Text>
                      {t.body.split('\n').map(function (item, i) {
                        return (
                          <span key={t._id + i}>
                            {item}
                            <br />
                          </span>
                        );
                      })}
                      <Text size="xs" dir="ltr">
                        {toTime(t.createdAt)}
                      </Text>
                    </Card>
                    {t.from === _id && (
                      <Button
                        variant="transparent"
                        radius={'xl'}
                        onClick={() => onDeleteQuestion(t._id)}
                        loading={loadingState}
                      >
                        <IconTrash size={24} color="#bbb" />
                      </Button>
                    )}
                  </Group>
                </Box>
              ))}
            </Flex>
            <Box>
              <form onSubmit={formSubmitHandler}>
                <Title order={3} mb={'sm'}>
                  پاسخ
                </Title>
                {res?.code && (
                  <Alert
                    variant="light"
                    color={res.code > 300 ? 'red' : 'lime'}
                    title={res.message}
                    icon={<IconInfoCircle />}
                  />
                )}
                <Textarea onChange={answerInputChangeHandler} />
                <Button type="submit" mt={'sm'} loading={loadingState}>
                  پاسخ
                </Button>
              </form>
            </Box>
          </>
        )}
      </Card>
    </Container>
  );
};

export default TicketPage;
