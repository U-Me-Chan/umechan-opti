import Link from 'next/link';
import { Box } from 'src/ui/Box';

export const Navbar = ({ items }: { items: { text: string; href: string }[] }) => {
  return (
    <Box tag='ul' flexDirection='column' margin={0} padding={0}>
      {items.map((item) => (
        <Box tag='li' key={item.text} margin={0} padding={0}>
          <Link href={item.href}>{item.text}</Link>
        </Box>
      ))}
    </Box>
  );
};
