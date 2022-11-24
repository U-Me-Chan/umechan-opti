import { Api } from 'src/service/base.api';
import { LayoutRenderer } from 'src/ui/LayoutRenderer';

export default async function Page({
  params: { boardTag },
}: {
  params: {
    boardTag: string;
  };
}) {
  const page = await new Api({ baseUrl: 'http://localhost:3001' }).page.getlistofPageboard({
    boardId: boardTag,
    page: '0',
  });

  return <LayoutRenderer layout={page.data} children={null} />;
}
