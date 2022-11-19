import { parse } from '@textlint/markdown-to-ast';

export const PostContentGetKey = (root: ReturnType<typeof parse>) => {
  if (!root.loc) {
    return JSON.stringify(root);
  }

  return `${root.loc.start.column}_${root.loc.start.line}_${root.loc.end.column}_${root.loc.end.line}`;
};

export const PostContentFixText = (text: string): string => {
  const strings = text.split('\n');
  const newed = strings.reduce<string[]>((acc, cur) => {
    if (cur.startsWith('>>')) {
      const [num, ...other] = cur
        .replaceAll('>>', '')
        .split(' ')
        .map((i) => i.trim());
      return [...acc, ...[`>${num}`, other.join(' ')]];
    }

    return [...acc, cur];
  }, []);

  return newed.join('\n\n');
};
