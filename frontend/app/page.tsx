import { Api } from 'src/service/base.api';
import { LayoutRenderer } from 'src/ui/LayoutRenderer';

import { Bound } from '../src/ui/Bound';
import { Text, TextVariant } from '../src/ui/Text';

export default async function Page() {
  const page = await new Api({ baseUrl: 'http://localhost:3001' }).page.getlistofPagemain();

  return (
    <Bound title='Глагне'>
      <LayoutRenderer layout={page.data}>
        <Text variant={TextVariant.textHeading1}>Welcome to the dev-версия Юмечана!</Text>

        <Text>Новости этого клиента к чану</Text>
      </LayoutRenderer>
    </Bound>
  );
}
