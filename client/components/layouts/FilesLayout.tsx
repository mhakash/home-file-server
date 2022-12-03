import { useLocalStorage } from '@mantine/hooks';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export const FilesLayout = (props: PropsWithChildren) => {
  const [host] = useLocalStorage({ key: 'host' });

  if (!host) {
    return (
      <>
        <div>Host not defined</div>
        <Link href="/">Set host</Link>
      </>
    );
  }

  return (
    <>
      <div className="p-4">{props.children}</div>;
    </>
  );
};
