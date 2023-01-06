import { useClipboard } from '@mantine/hooks';
import { NextPage } from 'next';
import { usePasswords } from '../../lib/hooks/usePasswords';
import {
  IconEye,
  IconEyeOff,
  IconClipboard,
  IconCheck,
  IconCopy,
} from '@tabler/icons';
import { ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { PropsWithChildren, useState } from 'react';

interface Password {
  id: number;
  key: string;
  name: string;
  password: string;
}

const MyCopyButton = (props: { value: string }) => {
  return (
    <CopyButton value={props.value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip
          label={copied ? 'copied' : 'copy'}
          withArrow
          position="right"
          className="ml-4"
        >
          <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};

const PasswordItem = (props: PropsWithChildren<{ item: Password }>) => {
  const [hidden, setHidden] = useState(true);
  const { item } = props;

  return (
    <>
      <div className="font-semibold">{item.key}</div>
      <div className="flex">
        <div>{item.name}</div>
        <div>
          <MyCopyButton value={item.name} />
        </div>
      </div>
      <div className="flex items-center">
        <div>{hidden ? '********' : item.password}</div>
        <div>
          <MyCopyButton value={item.password} />
        </div>
      </div>
      <div className="flex justify-end">
        <ActionIcon color="indigo" onClick={() => setHidden((e) => !e)}>
          {hidden ? (
            <IconEye size={16} stroke={1.5} />
          ) : (
            <IconEyeOff size={16} stroke={1.5} />
          )}
        </ActionIcon>
      </div>
    </>
  );
};

const PasswordPage: NextPage = () => {
  const { data, error, loading } = usePasswords();
  const passwords: Password[] = data?.password ?? [];

  const clipBoard = useClipboard();

  if (loading) return <div>Loading</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="font-bold text-xl mb-8">Passwords</div>

      {passwords.map((e) => (
        <div
          key={e.id}
          className="grid grid-cols-4 p-2 border-0 border-y border-solid border-gray-300 gap-4"
        >
          <PasswordItem item={e} />
        </div>
      ))}
    </div>
  );
};

export default PasswordPage;
