import React, { FC, memo } from 'react';

import { ApiComponentFeedState } from '../../service/base.api';
import { Box } from '../Box';
import { PostContainer } from '../PostContainer';

interface FeedProps {
  data: ApiComponentFeedState;
}

const Feed: FC<FeedProps> = ({ data }) => {
  return (
    <Box
      flexDirection='column'
      gap={8}
      justifyContent='flex-start'
      alignItems='flex-start'
      maxWidth='100%'
    >
      {data.posts?.map((post) => (
        <PostContainer key={post.id} post={post} />
      ))}
    </Box>
  );
};

export default memo(Feed);
