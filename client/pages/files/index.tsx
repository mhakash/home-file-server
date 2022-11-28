import React from 'react';
import { useRouter } from 'next/router';
import { Group, ScrollArea, Table, Text, ActionIcon } from '@mantine/core';
import { IconFileDescription, IconFolder } from '@tabler/icons';
import { File, useFiles } from '../../lib/hooks/useFiles';

interface FileTableProps {
  data: File[];
  onFileClick: (file: File) => any;
}

const openableExt = ['.html', '.htm'];

const getRouteByExt = (ext: string, query: string): string => {
  const prefix = '/views/html?f=';

  if (ext === '.html' || ext === '.htm') return prefix + query;
  else return prefix + query;
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

            {e.fileType && openableExt.includes(e.fileType) && (
              <ActionIcon onClick={() => onFileClick(e)}>
                <IconFileDescription size={25} stroke={1.5} />
              </ActionIcon>
            )}
          </Group>
        )}
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Item Name</th>
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

  const q = Array.isArray(f) ? f[0] : f;

  const { files } = useFiles(q ?? '');

  const onFileClick = (row: File) => {
    const query = q ?? '';
    if (row.type === 'dir') {
      router.push('/files?f=' + query + '/' + row.name);
    } else {
      router.push(getRouteByExt(row.fileType ?? '', query + '/' + row.name));
    }
  };

  return (
    <>
      <div>
        {files && <FileTable data={files.files} onFileClick={onFileClick} />}
      </div>
    </>
  );
};

export default Files;
