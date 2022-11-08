import { Inter } from '@next/font/google';
import axios from 'axios';
import { ApiResponse, Board, Post } from 'src/types/api';
import { Navbar } from 'src/ui/Navbar';

const font = Inter({ subsets: ['cyrillic'] });

export default async function RootLayout({ children }: { children: JSX.Element }) {
  const data = (
    await axios.get<ApiResponse<{ boards: Board[]; posts: Post[] }>>(
      'http://pissykaka.scheoble.xyz/v2/board',
    )
  ).data;

  return (
    <html lang='en' className={font.className}>
      <body>
        <nav>
          <Navbar data={data} />
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
