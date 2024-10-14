import React, { useState } from 'react';
import { Button, Group, Table, Text } from '@mantine/core';

export interface CustomTableProps {
  headers: string[];
  data: string[][];
  onRowClickHandler?: (id: string) => void;
  striped?: boolean;
  highlightOnHover?: boolean;
  limit?: number;
  showPages?: boolean
}

const CustomTable: React.FunctionComponent<CustomTableProps> = ({
  headers,
  data,
  striped,
  highlightOnHover,
  onRowClickHandler,
  limit = 10,
  showPages = false
}) => {
  const [start, setStart] = useState(0);
  const onRowClick = (id: string) => {
    onRowClickHandler && onRowClickHandler(id);
  };

  const pages = () => {
    const p = [];
    let total = 1;
    if (data.length >= limit) {
      total = Math.ceil(data.length / limit);
    }

    for (let i = 0; i < total; i++) {
      p.push(
        <Button
          size="compact-sm"
          variant={start === i ? 'default' : 'outline'}
          onClick={() => setStart(i)}
        >
          {i + 1}
        </Button>,
      );
    }
    return p;
  };

  return (
    <>
      <Table striped={striped} highlightOnHover={highlightOnHover}>
        <Table.Thead>
          {headers.map((h, i) => (
            <Table.Th key={h + i}>{h}</Table.Th>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {data
            .slice(start * limit, start * limit + limit)
            .map(([id, ...r]) => (
              <Table.Tr
                key={id}
                onClick={() => onRowClick(id)}
                style={{ cursor: 'pointer' }}
              >
                {r.map((c, i) => (
                  <Table.Td key={c + i}>{c}</Table.Td>
                ))}
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
      {showPages && (
        <>
          <Group align="center" justify="center" mt={'md'}>
            {pages()}
          </Group>
          <Text size="xs">تعداد کل: {data.length}</Text>
        </>
      )}
    </>
  );
};

export default CustomTable;
