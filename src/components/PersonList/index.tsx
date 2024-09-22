import React from 'react';
import { IPerson } from './types';
import { Box, Group, Skeleton, Stack, Text } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import styles from './PersonList.module.css';
import { Link } from 'react-router-dom';

export interface PersonListProps {
  list: IPerson[] | undefined;
  link?: string;
  showNumber?: boolean;
  showData?: boolean;
}

const PersonList: React.FunctionComponent<PersonListProps> = ({
  list,
  link,
  showNumber = false,
  showData = false,
}) => {
  return (
    <Stack className={styles.list}>
      {list ? (
        <>
          {list.length ? (
            list.map((p, i) => (
              <Group>
                {showNumber && <Text>{i + 1}</Text>}
                <PersonListItem key={p.name + i} {...p} showData={showData} />
              </Group>
            ))
          ) : (
            <Text my={5} py={5} ta={'center'}>
              موردی برای نمایش وجود ندارد‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍!
            </Text>
          )}
          {link && (
            <div className={styles.listMoreButton}>
              <Link to={link}>بیشتر ...</Link>
            </div>
          )}
        </>
      ) : (
        <>
          <PersonListItemSkeleteon />
          <PersonListItemSkeleteon />
          <PersonListItemSkeleteon />
          <PersonListItemSkeleteon />
          <PersonListItemSkeleteon />
        </>
      )}
    </Stack>
  );
};

export interface PersonListItemProps extends IPerson {
  showData?: boolean;
}
const PersonListItem: React.FunctionComponent<PersonListItemProps> = ({
  name,
  id,
  data,
  showData,
}) => {
  const _data = [];
  if (showData && data) for (const d in data) _data.push(data[d]);
  return (
    <Link to={`/patients/${id}`} state={data} className={styles.item}>
      <Group align="center">
        <IconUser className={styles.linkIcon} stroke={1.5} />
        <Box flex={1} miw={250}>
          <Text>{name}</Text>
        </Box>
        {_data.map((d, i) => (
          <Text key={i}>{d as string}</Text>
        ))}
      </Group>
    </Link>
  );
};

const PersonListItemSkeleteon: React.FunctionComponent = () => {
  return (
    <Group>
      <Skeleton height={25} circle />
      <Skeleton height={25} width={150} radius="md" />
    </Group>
  );
};

export { PersonListItem };

export default PersonList;
