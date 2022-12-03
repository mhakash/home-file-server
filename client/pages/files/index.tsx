import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { Group, ScrollArea, Table, Text, Breadcrumbs } from '@mantine/core';
import { IconFileDescription, IconFolder } from '@tabler/icons';
import { File, useFiles } from '../../lib/hooks/useFiles';
import { FilesLayout } from '../../components/layouts/FilesLayout';
import { normalizeQuery, pathJoin } from '../../lib/utils';
import Link from 'next/link';
import { useId } from '@mantine/hooks';

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

const breadCrumbItems = (q: string, id: string) => {
  const parts = q.split('/');

  const items = parts.map((e, i) => {
    if (!e) return null;

    const href = pathJoin(...parts.slice(0, i + 1));
    return (
      <Link
        href={'/files?f=' + href}
        key={id + i}
        className="no-underline text-inherit hover:underline"
      >
        <Text>{e}</Text>
      </Link>
    );
  });

  return items;
};

const Files = () => {
  const id = useId();

  const router = useRouter();
  const { f } = router.query;
  const q = normalizeQuery(f);
  const { files: filesByQuery } = useFiles(q);
  const files = filesByQuery?.files;

  const getLink = (row: File): string => {
    const query = q ?? '';
    if (row.type === 'dir') {
      return '/files?f=' + pathJoin(query, row.name);
    } else {
      return getRouteByExt(row.fileType ?? '', pathJoin(query, row.name));
    }
  };

  return (
    <FilesLayout>
      <Breadcrumbs className="m-4 flex flex-wrap">
        <Link href="/files">home</Link>
        {breadCrumbItems(q, id)}
      </Breadcrumbs>
      <div>
        {files && (
          <FileTable
            data={files.sort((a, b) =>
              a.name.localeCompare(b.name, undefined, { numeric: true })
            )}
            getLink={getLink}
          />
        )}
      </div>
    </FilesLayout>
  );
};

export default Files;
