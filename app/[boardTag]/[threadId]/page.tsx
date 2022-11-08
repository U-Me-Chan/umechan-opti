import { getThread } from 'src/service/api';

export default async function Page({
  params: { boardTag, threadId },
}: {
  params: {
    boardTag: string;
    threadId: string;
  };
}) {
  const data = await getThread(threadId);

  return (
    <>
      <h1>{`Thread ${boardTag} ${threadId}`}</h1>

      <div>
        {data.payload.thread_data.replies.map((post) => (
          <div key={post.id}>{post.message}</div>
        ))}
      </div>
    </>
  );
}
