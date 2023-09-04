import  Link from 'next/link';

function NewsPage() {
  return (
    <>
      <h1>The News page</h1>
      <ul>
        <li>
          <Link href="/news/nextjs-is-a-great-framework">Link</Link>
        </li>
        <li>Something else</li>
      </ul>
    </>
  );
}

export default NewsPage;
