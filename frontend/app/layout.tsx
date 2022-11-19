import { Inter } from '@next/font/google';
import { EXTERNAL_LINKS, RADIOS_LINKS } from 'src/constants';
import { getAllBoards, getRadioStatus } from 'src/service/api';
import { Box } from 'src/ui/Box';
import { Navbar } from 'src/ui/Navbar';
import { RadioPlayer } from 'src/ui/RadioPlayer';

import { RadioStatus } from '../src/types/api';
import { Bound } from '../src/ui/Bound';

const font = Inter({ subsets: ['cyrillic'], weight: ['400', '700'] });

export default async function RootLayout({ children }: { children: JSX.Element }) {
  const data = await getAllBoards();
  const radioStatuses: Record<string, RadioStatus> = {};

  await Promise.all(
    RADIOS_LINKS.map((mount) =>
      getRadioStatus(mount.apiBasePath).then((status) => (radioStatuses[mount.name] = status)),
    ),
  );

  return (
    <html lang='en' className={font.className}>
      <head>
        <title>Юмечан</title>

        <style
          dangerouslySetInnerHTML={{
            __html: '* { box-sizing: border-box; } main > div { width: 100%; }',
          }}
        />
      </head>

      <Box
        tag='body'
        gap={8}
        margin={0}
        padding={8}
        justifyContent='center'
        alignItems='flex-start'
        backgroundColor='colorBgPrimary'
      >
        <Box tag='nav' width={256} flexDirection='column' gap={8}>
          <Bound title='Досочки'>
            <Navbar
              items={[
                { text: 'Глагне', href: '/' },
                ...data.payload.boards.map((board) => ({
                  text: board.name,
                  href: `/${board.tag}`,
                })),
              ]}
            />
          </Bound>

          <Bound title='Ссылочки'>
            <Navbar items={EXTERNAL_LINKS} />
          </Bound>
        </Box>

        <Box tag='main' width={1024}>
          {children}
        </Box>

        <Box width={256} flexDirection='column' gap={8}>
          {RADIOS_LINKS.map((mount) => (
            <Bound key={mount.name} title={mount.name}>
              <RadioPlayer mount={mount} initialState={radioStatuses[mount.name]} />
            </Bound>
          ))}
        </Box>
      </Box>
    </html>
  );
}
