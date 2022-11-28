import { useRouter } from 'next/router';
import useSWR from 'swr';
import { http } from '../../lib/api/http';

const getHtmlFile = async (f: string) => {
  const res = await http.get('/file/html', { params: { f } });
  return res.data;
};

const useHtml = (f: string) => {
  const { data, error } = useSWR(['/file/html', f], () => getHtmlFile(f));
  return {
    error,
    data,
    loading: !data && !error,
  };
};

const HtmlPage = () => {
  const router = useRouter();
  const { f } = router.query;

  const q = Array.isArray(f) ? f[0] : f;

  const { data, error, loading } = useHtml(q ?? '');

  if (error) return <h1>Something went wrong</h1>;

  if (loading) return <div>Loading</div>;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </>
  );
};

export default HtmlPage;
