import axios from 'axios';
import { ApiResponse, ThreadData } from 'src/types/api';

export default async function Page({
  params: { boardId, threadId },
}: {
  params: {
    boardId: string;
    threadId: string;
  };
}) {
  const data = (
    await axios.get<ApiResponse<{ thread_data: ThreadData }>>(
      `http://pissykaka.scheoble.xyz/post/${threadId || '0'}`,
    )
  ).data;

  return (
    <>
      <h1>
        Thread {boardId} {threadId}
      </h1>

      <div>
        {data.payload.thread_data.replies.map((post) => (
          <div key={post.id}>{post.message}</div>
        ))}
      </div>
    </>
  );
}
