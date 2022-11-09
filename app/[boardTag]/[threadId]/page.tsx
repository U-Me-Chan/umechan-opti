import { getThread } from 'src/service/api';
import { PostContent } from 'src/ui/PostContent';

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
          <PostContent key={post.id} message={post.truncated_message || ''} />
        ))}
      </div>
    </>
  );
}
