import { Api } from 'src/service/base.api';
import { LayoutRenderer } from 'src/ui/LayoutRenderer';

import { Bound } from '../src/ui/Bound';
import { Text } from '../src/ui/Text';

export default async function Page() {
  const page = await new Api({ baseUrl: 'http://localhost:3001' }).page.getlistofPagemain();

  return (
    <Bound title='Глагне'>
      <LayoutRenderer layout={page.data}>
        <Text>Welcome to the dev-версия Юмечана!</Text>
      </LayoutRenderer>
    </Bound>
  );
}
