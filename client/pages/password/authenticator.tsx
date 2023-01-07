import { CopyButton, RingProgress } from '@mantine/core';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import totp from 'totp-generator';
import { showNotification } from '@mantine/notifications';

const secret = 'VWHDLTU6SN6KHYTH';

interface AuthTokenItem {
  user: string;
  issuer: string;
  token: string;
  progress: number;
}

const AuthTokenItem = (props: AuthTokenItem) => {
  const { issuer, user, token, progress } = props;

  return (
    <CopyButton value={token} timeout={2000}>
      {({ copied, copy }) => (
        <div
          className="flex justify-between border-b border-gray-500 my-4 py-2 cursor-pointer"
          onClick={() => {
            copy();
            showNotification({ message: 'copied to clipboard' });
          }}
        >
          <div className="flex flex-col">
            <div className="font-semibold text-sm">
              {issuer} ({user})
            </div>
            <div className="text-lg">{token}</div>
          </div>
          <div>
            <RingProgress
              roundCaps
              size={50}
              thickness={6}
              sections={[
                { value: progress, color: progress > 75 ? 'red' : 'blue' },
              ]}
            />
          </div>
        </div>
      )}
    </CopyButton>
  );
};

const AuthenticatorPage: NextPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [time, setTime] = useState<number | null>(null);

  const progress = (((time ?? 0) % 30) / 30) * 100;

  useEffect(() => {
    const timeout = setInterval(generateToken, 1000);
  }, []);

  const generateToken = () => {
    setTime(new Date().getSeconds());
    const newToken = totp(secret);

    setToken(newToken);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-lg font-semibold">Authenticator</div>

      {token ? (
        <>
          <AuthTokenItem
            issuer="Github"
            user="mhaksh"
            token={token}
            progress={progress}
          />
          <AuthTokenItem
            issuer="Github"
            user="mhaksh"
            token={token}
            progress={progress}
          />
        </>
      ) : (
        'No token available'
      )}
    </div>
  );
};

export default AuthenticatorPage;
