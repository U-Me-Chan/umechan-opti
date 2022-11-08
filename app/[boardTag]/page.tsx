import Link from 'next/link';
import { getBoardData } from 'src/service/api';

export default async function Page({
  params: { boardTag },
}: {
  params: {
    boardTag: string;
  };
}) {
  const data = await getBoardData(boardTag, 0);

  return (
    <>
      <h1>{`Board ${boardTag}`}</h1>

      {data.payload.posts?.map((post) => (
        <div key={post.id}>
          <Link href={`/${boardTag}/${post.id}`}>{`thread ${post.id} - ${post.subject}`}</Link>
        </div>
      ))}
    </>
  );
}
