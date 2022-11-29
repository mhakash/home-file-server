import { useRouter } from 'next/router';
import { useHtml } from '../../lib/hooks/useHtml';
import DOMPurify from 'dompurify';
import { normalizeQuery } from '../../lib/utils';

const HtmlPage = () => {
  const router = useRouter();
  const { f } = router.query;

  const q = normalizeQuery(f);

  const { data, error, loading } = useHtml(q);

  if (error) return <h1>Something went wrong</h1>;

  if (loading) return <div>Loading</div>;

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data, { FORCE_BODY: true }),
        }}
      />
    </>
  );
};

export default HtmlPage;
