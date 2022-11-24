import React, { FC, memo } from 'react';

import { ApiComponentThreadState } from '../../service/base.api';
import { Bound } from '../Bound';
import { Box } from '../Box';
import { PostContainer } from '../PostContainer';

interface ThreadProps {
  data: ApiComponentThreadState;
}

const Thread: FC<ThreadProps> = ({ data }) => {
  return (
    <Bound title='Тред'>
      <Box
        flexDirection='column'
        gap={8}
        justifyContent='flex-start'
        alignItems='flex-start'
        maxWidth='100%'
        style={{ marginBottom: '20px' }}
      >
        {data.posts?.map((post) => (
          <PostContainer key={post.id} post={post} />
        ))}
      </Box>
    </Bound>
  );
};

export default memo(Thread);
