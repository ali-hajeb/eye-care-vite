import { Button, Card, Center, Container, Group, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import CustomTable from '../components/Table';
import { useNavigate } from 'react-router-dom';
import moment from 'jalali-moment';

export interface BlogPageProps {}

export interface IPost {
  _id: string;
  createdAt: string;
  title: string;
  body: string;
  image?: string;
}

const BlogPage: React.FunctionComponent<BlogPageProps> = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<string[][]>([]);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(true);
    axiosInstance
      .get('/tip')
      .then((res) => {
        const posts: string[][] = (res.data as IPost[]).map((p, i) => [
          p._id,
          `${i + 1}`,
          p.title,
          moment(p.createdAt).locale('fa').format('YYYY/MM/DD')
        ]);
        setPosts(posts);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoadingState(false));
  }, []);

  const rowClickHandler = (id: string) => {
    navigate(`/blog/post/${id}`);
  };
  return (
    <Container fluid>
      <Group>
        <Title>مطالب</Title>
        <Button variant="subtle" onClick={() => navigate('/blog/new')} >
          افزودن
        </Button>
      </Group>
      <Card radius={'md'} shadow="md">
        {loadingState ? (
          <Center>در حال پردازش...</Center>
        ) : (
          <CustomTable
            headers={['ردیف', 'عنوان', 'تاریخ انتشار']}
            data={posts}
            highlightOnHover
            onRowClickHandler={rowClickHandler}
            limit={10}
            showPages
            striped
          />
        )}
      </Card>
    </Container>
  );
};

export default BlogPage;
