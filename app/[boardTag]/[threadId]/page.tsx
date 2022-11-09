import { getThread } from 'src/service/api';

import { Bound } from '../../../src/ui/Bound';
import { Box } from '../../../src/ui/Box';
import { PostContainer } from '../../../src/ui/PostContainer';

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
    <Bound
      title={
        data.payload.thread_data.subject ||
        data.payload.thread_data.truncated_message?.slice(0, 20) ||
        threadId
      }
    >
      <Box
        flexDirection='column'
        gap={8}
        justifyContent='flex-start'
        alignItems='flex-start'
        maxWidth='100%'
      >
        <PostContainer post={data.payload.thread_data} />

        <hr style={{ width: '100%', border: '1px solid white' }} />

        {data.payload.thread_data.replies.map((post) => (
          <PostContainer key={post.id} post={post} />
        ))}
      </Box>
    </Bound>
  );
}
