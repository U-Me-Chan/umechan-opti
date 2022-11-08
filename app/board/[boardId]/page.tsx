import axios from 'axios';
import Link from 'next/link';
import { ApiResponse, BoardData } from 'src/types/api';

export default async function Page({
  params: { boardId },
}: {
  params: {
    boardId: string;
  };
}) {
  const data = (
    await axios.get<ApiResponse<BoardData>>(`http://pissykaka.scheoble.xyz/v2/board/${boardId}`, {
      params: { offset: 0, limit: 20 },
    })
  ).data;

  return (
    <>
      <h1>Board</h1>

      {data.payload.posts?.map((post) => (
        <div key={post.id}>
          <Link
            href={`/board/${boardId}/thread/${post.id}`}
          >{`thread ${post.id} - ${post.subject}`}</Link>
        </div>
      ))}
    </>
  );
}
