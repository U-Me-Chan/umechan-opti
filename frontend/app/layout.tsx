import { Inter } from '@next/font/google';
import { Api } from 'src/service/base.api';
import { Box } from 'src/ui/Box';
import { LayoutRenderer } from 'src/ui/LayoutRenderer';

const font = Inter({ subsets: ['cyrillic'], weight: ['400', '700'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const page = await new Api({ baseUrl: 'http://localhost:3001' }).page.getlistofPagemainlayout();

  return (
    <html lang='ru' className={font.className}>
      <head>
        <title>Юмечан</title>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              * { box-sizing: border-box; }
              div[data-nextjs-scroll-focus-boundary] { width: 100%; }
              .layout__LeftSidebar, .layout__RightSidebar {
                width: 100%;
                max-width: 256px;
                gap: 8px;
              }
              .layout__Children {
                width: 100%;
                max-width: 1024px;
              }
            `,
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
        <LayoutRenderer layout={page.data} children={children} />
      </Box>
    </html>
  );
}
