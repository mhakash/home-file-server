import { Button, Group, Input, Text, useMantineTheme } from '@mantine/core';
import { IconUpload, IconFile, IconX } from '@tabler/icons';
import { Dropzone, DropzoneProps, FileWithPath } from '@mantine/dropzone';
import { useState } from 'react';

import axios from 'axios';
import { useInputState, useLocalStorage } from '@mantine/hooks';
import Link from 'next/link';

const http = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  headers: {
    'Content-type': 'application/json',
  },
});

const upload = (file: any, onUploadProgress: any) => {
  let formData = new FormData();

  formData.append('file', file);
  formData.append('url', 'myurl');

  return http.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
};

function BaseDemo(props: Partial<DropzoneProps>) {
  const theme = useMantineTheme();
  const [allFiles, setFiles] = useState<Array<FileWithPath>>([]);
  const [progress, setProgress] = useState(0);

  const onFileUpload = () => {
    let currentFile = allFiles[0];
    if (!currentFile) {
      console.log('no file');
      return;
    }

    setProgress(0);

    upload(currentFile, (event: any) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        // setMessage(response.data.message);
        // return UploadService.getFiles();
        console.log(response);
      })
      .then((files) => {
        // setFileInfos(files.data);
      })
      .catch(() => {
        setProgress(0);
        // setMessage("Could not upload the file!");
        // setCurrentFile(undefined);
      });

    // setSelectedFiles(undefined);
  };

  return (
    <>
      <Dropzone
        onDrop={(files) => setFiles(files)}
        onReject={(files) => console.log('rejected files', files)}
        // maxSize={3 * 1024 ** 2}
        // accept={IMAGE_MIME_TYPE}
        {...props}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 220, pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === 'dark' ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFile size={50} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag files here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>

      <div>
        {allFiles.map((e, i) => (
          <div key={e.name + i}>{e.name}</div>
        ))}
      </div>

      <button onClick={onFileUpload}>upload</button>
      <div>progress {progress}</div>
    </>
  );
}
export default function Home() {
  const [inputHost, setInputHost] = useInputState('');
  const [host, setHost] = useLocalStorage({ key: 'host', defaultValue: '' });

  return (
    <div>
      <div>host: {host}</div>
      <div style={{ maxWidth: '800px' }}>
        <BaseDemo />
      </div>
      <Link href={'/files'}>View files</Link>

      <div className="max-w-xl p-4">
        <Input
          type="text"
          value={inputHost}
          onChange={setInputHost}
          className="py-2"
        />
        <Button
          onClick={() => {
            setHost(inputHost);
            console.log(inputHost);
          }}
        >
          Apply host
        </Button>
      </div>
    </div>
  );
}
