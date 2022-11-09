import Link from 'next/link';
import { ApiResponse, Board, Post } from 'src/types/api';

import { Box } from './Box';

export const Navbar = ({ data }: { data: ApiResponse<{ boards: Board[]; posts: Post[] }> }) => {
  return (
    <Box tag='ul' flexDirection='column' margin={0} padding={0}>
      <Box tag='li' key={'index'} margin={0} padding={0}>
        <Link href={`/`}>Глагне</Link>
      </Box>

      {data.payload.boards.map((board) => (
        <Box tag='li' key={board.id}>
          <Link href={`/${board.tag}`}>{board.name}</Link>
        </Box>
      ))}
    </Box>
  );
};
