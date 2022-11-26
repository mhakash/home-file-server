import React from 'react';
import { useRouter } from 'next/router';
import { ScrollArea, Table, Text } from '@mantine/core';
import { File, useFiles } from '../../lib/hooks/useFiles';

interface FileTableProps {
  data: File[];
  onFileClick: (file: File) => any;
}

const FileTable = ({ data, onFileClick }: FileTableProps) => {
  const rows = data.map((e) => (
    <tr key={e.name}>
      {e.type === 'dir' ? (
        <td onClick={() => onFileClick(e)}>{e.name}</td>
      ) : (
        <td>{e.name}</td>
      )}
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
    router.push('/files?f=' + query + '/' + row.name);
  };

  return (
    <>
      <div>f</div>
      <Text>Files</Text>

      <div>
        {files && <FileTable data={files.files} onFileClick={onFileClick} />}
      </div>
    </>
  );
};

export default Files;
