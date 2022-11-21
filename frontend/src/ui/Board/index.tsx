import React, { FC, memo } from 'react';

import { ApiComponentBoardState } from '../../service/base.api';
import { Bound } from '../Bound';
import { Box } from '../Box';
import { PostContainer } from '../PostContainer';

interface BoardProps {
  data: ApiComponentBoardState;
}

const Board: FC<BoardProps> = ({ data }) => {
  return (
    <Bound title={'board'}>
      <Box
        flexDirection='column'
        gap={8}
        justifyContent='flex-start'
        alignItems='flex-start'
        maxWidth='100%'
      >
        {data.posts?.map((post) => (
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
};

export default memo(Board);
