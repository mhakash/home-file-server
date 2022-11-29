import React from 'react';
import { useRouter } from 'next/router';
import { Group, ScrollArea, Table, Text, Button } from '@mantine/core';
import { IconFileDescription, IconFolder } from '@tabler/icons';
import { File, useFiles } from '../../lib/hooks/useFiles';
import { FilesLayout } from '../../components/layouts/FilesLayout';
import { normalizeQuery } from '../../lib/utils';

interface FileTableProps {
  data: File[];
  onFileClick: (file: File) => any;
}

const getRouteByExt = (ext: string, query: string): string => {
  const prefix = '/views/';

  if (ext === '.html' || ext === '.htm') return prefix + 'html?f=' + query;
  else return prefix + 'text?f=' + query;
};

const FileTable = ({ data, onFileClick }: FileTableProps) => {
  const rows = data.map((e) => (
    <tr key={e.name}>
      <td>
        {e.type === 'dir' ? (
          <Group
            onClick={() => onFileClick(e)}
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            <IconFolder size={25} stroke={1.5} />
            <Text>{e.name}</Text>
          </Group>
        ) : (
          <Group>
            <IconFileDescription size={25} stroke={1.5} />
            <Text size="sm">{e.name}</Text>
          </Group>
        )}
      </td>
      <td>
        {e.type === 'file' && (
          <Button onClick={() => onFileClick(e)} variant="light" size="xs">
            View
          </Button>
        )}
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{}} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Item Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

const Files = () => {
  const router = useRouter();
  const { f } = router.query;

  const q = normalizeQuery(f);

  const { files } = useFiles(q);

  const onFileClick = (row: File) => {
    const query = q ?? '';
    if (row.type === 'dir') {
      router.push('/files?f=' + query + '/' + row.name);
    } else {
      router.push(getRouteByExt(row.fileType ?? '', query + '/' + row.name));
    }
  };

  return (
    <FilesLayout>
      {files && files.files && (
        <FileTable data={files.files} onFileClick={onFileClick} />
      )}
    </FilesLayout>
  );
};

export default Files;
