import Link from 'next/link';
import { Box } from 'src/ui/Box';

import { ApiComponentNavbarState } from '../../service/base.api';

export const Navbar = ({ items }: { items: ApiComponentNavbarState }) => {
  return (
    <Box tag='ul' flexDirection='column' margin={0} padding={0}>
      {items.links?.map((item) => (
        <Box tag='li' key={item.title} margin={0} padding={0}>
          <Link href={item.href || '/'}>{item.title}</Link>
        </Box>
      ))}
    </Box>
  );
};
