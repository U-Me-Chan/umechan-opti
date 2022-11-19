import { Box } from '../Box';
import { Text, TextVariant } from '../Text';

export const Bound = ({ children, title }: { children: JSX.Element; title: string }) => {
  return (
    <Box
      flexDirection='column'
      border='colorBgSecondary'
      borderRadius={4}
      width='100%'
      maxWidth='100%'
    >
      <Box backgroundColor='colorBgSecondary' padding={4}>
        <Text variant={TextVariant.textBodyBold1}>{title}</Text>
      </Box>

      <Box padding={4} maxWidth='100%'>
        {children}
      </Box>
    </Box>
  );
};
