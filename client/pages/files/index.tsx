import React from 'react';
import { useRouter } from 'next/router';
import { Group, ScrollArea, Table, Text, Button } from '@mantine/core';
import { IconFileDescription, IconFolder } from '@tabler/icons';
import { File, useFiles } from '../../lib/hooks/useFiles';
import { FilesLayout } from '../../components/layouts/FilesLayout';
import { normalizeQuery } from '../../lib/utils';
import Link from 'next/link';

interface FileTableProps {
  data: File[];
  getLink: (file: File) => any;
}

const getRouteByExt = (ext: string, query: string): string => {
  const prefix = '/views/';

  if (ext === '.html' || ext === '.htm') return prefix + 'html?f=' + query;
  else return prefix + 'text?f=' + query;
};

const FileTable = ({ data, getLink }: FileTableProps) => {
  const rows = data.map((e) => (
    <tr key={e.name}>
      <td>
        {e.type === 'dir' ? (
          <Link href={getLink(e)} className="text-inherit no-underline">
            <Group className="group">
              <IconFolder size={25} stroke={1.5} />
              <Text className="group-hover:text-sky-600">{e.name}</Text>
            </Group>
          </Link>
        ) : (
          <Group>
            <IconFileDescription size={25} stroke={1.5} />
            <Link href={getLink(e)} className="text-inherit no-underline">
              <Text size="sm" className="hover:underline decoration-sky-500">
                {e.name}
              </Text>
            </Link>
          </Group>
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

  const getLink = (row: File): string => {
    const query = q ?? '';
    if (row.type === 'dir') {
      return '/files?f=' + query + '/' + row.name;
    } else {
      return getRouteByExt(row.fileType ?? '', query + '/' + row.name);
    }
  };

  return (
    <FilesLayout>
      {files && files.files && (
        <FileTable data={files.files} getLink={getLink} />
      )}
    </FilesLayout>
  );
};

export default Files;
