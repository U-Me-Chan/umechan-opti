import { Api } from 'src/service/base.api';
import { LayoutRenderer } from 'src/ui/LayoutRenderer';

export default async function Page({
  params: { boardTag, threadId },
}: {
  params: {
    boardTag: string;
    threadId: string;
  };
}) {
  const page = await new Api({ baseUrl: 'http://localhost:3001' }).page.getlistofPagethread({
    threadId,
  });

  return <LayoutRenderer layout={page.data} children={null} />;
}
