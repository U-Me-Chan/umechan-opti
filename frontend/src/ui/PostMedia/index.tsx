import Image from 'next/image';

import { MediaItem } from '../../types/api';
import { Box } from '../Box';
import styles from './styles.module.css';

export const PostMedia = ({ data }: { data: MediaItem[] }) => {
  return (
    <>
      {data.map((item) => (
        <Box key={item.preview} height={320} className={styles.root}>
          <Image src={item.preview || ''} alt={item.preview || ''} fill unoptimized />
        </Box>
      ))}
    </>
  );
};
