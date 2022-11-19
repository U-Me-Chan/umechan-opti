import Link from 'next/link';

import { Post } from '../../types/api';
import { Box } from '../Box';
import { PostContent } from '../PostContent';
import { PostMedia } from '../PostMedia';
import { Text } from '../Text';

export const PostContainer = ({ post, opPost }: { post: Post; opPost?: boolean }) => {
  return (
    <Box
      backgroundColor={opPost ? 'colorBgPrimary' : 'colorBgSecondary'}
      borderRadius={4}
      padding={8}
      flexDirection='column'
      gap={8}
      minWidth={320}
      maxWidth='100%'
    >
      <Box gap={8}>
        <Text>#{post.id}</Text>

        {opPost && <Link href={`/${post.board?.tag}/${post.id}`}>В тред</Link>}
      </Box>

      <Box flexWrap='wrap' maxWidth='100%' gap={8}>
        {Boolean(post.media?.images) && <PostMedia data={post.media?.images || []} />}

        {Boolean(post.media?.youtubes) && <PostMedia data={post.media?.youtubes || []} />}
      </Box>

      <Box maxWidth='100%'>
        <PostContent message={post.truncated_message || ''} />
      </Box>
    </Box>
  );
};
