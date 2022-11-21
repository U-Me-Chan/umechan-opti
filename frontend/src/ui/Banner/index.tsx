'use client';

import Image from 'next/image';
import React, { FC, memo, useEffect, useState } from 'react';

import { ApiComponentBannerState } from '../../service/base.api';
import { isServer } from '../../utils';
import { Box } from '../Box';

type BannerProps = {
  data: ApiComponentBannerState;
};

const Banner: FC<BannerProps> = ({ data }) => {
  const [current, setCurrent] = useState(data.current || 0);

  useEffect(() => {
    if (isServer()) {
      return;
    }

    const pointer = setInterval(() => setCurrent((_) => _ + 1), 30000);
    return () => clearInterval(pointer);
  }, []);

  return (
    <Box
      justifyContent='center'
      width='100%'
      border='colorBgSecondary'
      borderRadius='4px'
      overflow='hidden'
    >
      <Image alt='Banner' height={100} src={(data.bannersUrls || [])[current]} width={300} />
    </Box>
  );
};

export default memo(Banner);
