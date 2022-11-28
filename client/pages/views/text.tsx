import { useRouter } from 'next/router';
import { useHtml } from '../../lib/hooks/useHtml';

const TextViewerPage = () => {
  const router = useRouter();
  const { f } = router.query;

  const q = Array.isArray(f) ? f[0] : f;

  const { data, error, loading } = useHtml(q ?? '');

  if (error) return <h1>Something went wrong</h1>;

  if (loading) return <div>Loading</div>;

  return (
    <>
      <pre>{data}</pre>
      {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
    </>
  );
};

export default TextViewerPage;
