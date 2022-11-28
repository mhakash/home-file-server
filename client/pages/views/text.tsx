import { useRouter } from 'next/router';
import { useHtml } from '../../lib/hooks/useHtml';
import { Prism } from '@mantine/prism';

const TextViewerPage = () => {
  const router = useRouter();
  const { f } = router.query;

  const q = Array.isArray(f) ? f[0] : f;

  const { data, error, loading } = useHtml(q ?? '');

  if (error) return <h1>Something went wrong</h1>;

  if (loading) return <div>Loading</div>;

  return (
    <>
      <Prism language="tsx">{data}</Prism>
    </>
  );
};

export default TextViewerPage;
