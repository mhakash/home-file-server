import { useRouter } from 'next/router';
import { useHtml } from '../../lib/hooks/useHtml';
import DOMPurify from 'dompurify';

const HtmlPage = () => {
  const router = useRouter();
  const { f } = router.query;

  const q = Array.isArray(f) ? f[0] : f;

  const { data, error, loading } = useHtml(q ?? '');

  if (error) return <h1>Something went wrong</h1>;

  if (loading) return <div>Loading</div>;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }} />
    </>
  );
};

export default HtmlPage;
