import { Inter } from '@next/font/google';
import { getAllBoards } from 'src/service/api';
import { Navbar } from 'src/ui/Navbar';

const font = Inter({ subsets: ['cyrillic'] });

export default async function RootLayout({ children }: { children: JSX.Element }) {
  const data = await getAllBoards();

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
