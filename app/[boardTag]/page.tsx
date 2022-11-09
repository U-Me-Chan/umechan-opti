import Link from 'next/link';
import { getBoardData } from 'src/service/api';

import { Bound } from '../../src/ui/Bound';
import { Box } from '../../src/ui/Box';
import { PostContainer } from '../../src/ui/PostContainer';

export default async function Page({
  params: { boardTag },
}: {
  params: {
    boardTag: string;
  };
}) {
  const data = await getBoardData(boardTag, 0);

  return (
    <Bound title={boardTag}>
      <Box
        flexDirection='column'
        gap={8}
        justifyContent='flex-start'
        alignItems='flex-start'
        maxWidth='100%'
      >
        {data.payload.posts?.map((post) => (
          <Box
            key={post.id}
            flexDirection='column'
            gap={8}
            justifyContent='flex-start'
            alignItems='flex-start'
            maxWidth='100%'
            style={{ marginBottom: '20px' }}
          >
            <PostContainer post={post} opPost />

            <Box
              flexDirection='column'
              gap={8}
              justifyContent='flex-start'
              alignItems='flex-start'
              maxWidth='100%'
              style={{ paddingLeft: '20px' }}
            >
              {post.replies?.map((reply) => (
                <PostContainer key={reply.id} post={reply} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Bound>
  );
}
