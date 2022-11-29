import { PropsWithChildren } from 'react';

export const FilesLayout = (props: PropsWithChildren) => {
  return <div className="p-4">{props.children}</div>;
};
