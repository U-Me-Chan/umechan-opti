import { parse, Syntax } from '@textlint/markdown-to-ast';
import Link from 'next/link';
import { Box } from 'src/ui/Box';
import { Text, TextVariant } from 'src/ui/Text';

import { PostContentFixText, PostContentGetKey } from './utils';

export function PostContent({ message }: { message: string }) {
  return (
    <Box gap='8px' flexDirection='column' justifyContent='flex-start' alignItems='flex-start'>
      <MD root={parse(PostContentFixText(message))} />
    </Box>
  );
}

function MD({ root }: { root: ReturnType<typeof parse> }) {
  const children = root.children as ReturnType<typeof parse>[];

  switch (root.type) {
    case Syntax.BlockQuote:
      const raw = root.raw.replace('>', '');
      const num = Number(raw);

      if (isNaN(num)) {
        return (
          <Text color='colorGreen' variant={TextVariant.textBody1}>
            {'>'}

            {children.map((subRoot) => (
              <MD key={PostContentGetKey(subRoot)} root={subRoot} />
            ))}
          </Text>
        );
      }

      return (
        <Link href={`#post_${num}`}>
          <Text variant={TextVariant.textBody1} color='colorGreen'>
            {'>>'}

            {num}
          </Text>
        </Link>
      );

    case Syntax.Paragraph:
      return (
        <Text variant={TextVariant.textBody1}>
          {children.map((subRoot) => (
            <MD key={PostContentGetKey(subRoot)} root={subRoot} />
          ))}
        </Text>
      );

    case Syntax.Str:
      return <>{root.raw}</>;

    case Syntax.Emphasis:
      return (
        <Text variant={TextVariant.textBody1} fontStyle='italic'>
          {children.map((subRoot) => (
            <MD key={PostContentGetKey(subRoot)} root={subRoot} />
          ))}
        </Text>
      );

    case Syntax.Strong:
      return (
        <Text variant={TextVariant.textBodyBold1}>
          {children.map((subRoot) => (
            <MD key={PostContentGetKey(subRoot)} root={subRoot} />
          ))}
        </Text>
      );

    case Syntax.Delete:
      return (
        <Text
          variant={TextVariant.textBody1}
          style={{
            textDecoration: 'line-through',
          }}
        >
          {children.map((subRoot) => (
            <MD key={PostContentGetKey(subRoot)} root={subRoot} />
          ))}
        </Text>
      );

    case Syntax.List:
      return (
        <ul>
          {children.map((subRoot) => (
            <MD key={PostContentGetKey(subRoot)} root={subRoot} />
          ))}
        </ul>
      );

    case Syntax.ListItem:
      return (
        <li>
          {children.map((subRoot) => (
            <MD key={PostContentGetKey(subRoot)} root={subRoot} />
          ))}
        </li>
      );

    case Syntax.Code:
      // @ts-ignore
      return (
        <pre
          style={{
            whiteSpace: 'break-spaces',
            // @ts-ignore
            wordWrap: 'anywhere',
            fontSize: '12px',
          }}
        >
          {root.value}
        </pre>
      );

    case Syntax.CodeBlock:
      return (
        <pre
          style={{
            border: '1px solid darkgreen',
            borderRadius: '4px',
            padding: '4px',
            whiteSpace: 'pre-line',
            fontSize: '12px',
          }}
        >
          <code>[{`${root.lang}\n` || 'lang не указан\n'}]</code>

          <code>{String(root.value).replaceAll('\n\n', '\n')}</code>
        </pre>
      );

    case Syntax.Link:
      return (
        <Link
          href={String(root.url).replaceAll('.../', '')}
          target='_blank'
          rel='noreferrer'
          color='colorTextLink'
        >
          {children.map((subRoot) => (
            <MD key={PostContentGetKey(subRoot)} root={subRoot} />
          ))}
        </Link>
      );

    default:
      return (
        <>
          {children?.map((subRoot) => (
            <MD key={PostContentGetKey(subRoot)} root={subRoot} />
          ))}
        </>
      );
  }
}
