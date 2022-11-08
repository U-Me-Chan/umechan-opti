import Link from 'next/link';
import { ApiResponse, Board, Post } from 'src/types/api';

export const Navbar = ({ data }: { data: ApiResponse<{ boards: Board[]; posts: Post[] }> }) => {
  return (
    <ul>
      <li key={'index'}>
        <Link href={`/`}>Глагне</Link>
      </li>

      {data.payload.boards.map((board) => (
        <li key={board.id}>
          <Link href={`/${board.tag}`}>{board.name}</Link>
        </li>
      ))}
    </ul>
  );
};
