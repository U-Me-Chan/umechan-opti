import { Inter } from '@next/font/google';
import { RADIOS_LINKS } from 'src/constants';
import { getAllBoards, getRadioStatus } from 'src/service/api';
import { Box } from 'src/ui/Box';
import { Navbar } from 'src/ui/Navbar';
import { RadioPlayer } from 'src/ui/RadioPlayer';

import { RadioStatus } from '../src/types/api';

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

        <style dangerouslySetInnerHTML={{ __html: '* { box-sizing: border-box; }' }} />
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
        <Box tag='nav' width={256} border='colorGreen'>
          <Navbar data={data} />
        </Box>

        <Box tag='main' width={1024} border='colorGreen'>
          {children}
        </Box>

        <Box width={256} flexDirection='column' gap={8}>
          {RADIOS_LINKS.map((mount) => (
            <Box key={mount.name} border='colorBgSecondary' padding={4} borderRadius={4}>
              <RadioPlayer mount={mount} initialState={radioStatuses[mount.name]} />
            </Box>
          ))}
        </Box>
      </Box>
    </html>
  );
}
