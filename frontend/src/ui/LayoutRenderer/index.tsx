import React, { CSSProperties } from 'react';
import {
  ApiComponentBannerState,
  ApiComponentBoardState,
  ApiComponentFeedState,
  ApiComponentNavbarState,
  ApiComponentRadioPlayerState,
  ApiComponentThreadState,
  ApiLayoutRef,
} from 'src/service/base.api';

import Banner from '../Banner';
import Board from '../Board';
import { Box } from '../Box';
import Feed from '../Feed';
import { Navbar } from '../Navbar';
import { RadioAllPlayers } from '../RadioPlayer';
import Thread from '../Thread';

export const LayoutRenderer = ({
  layout,
  children,
}: {
  layout: ApiLayoutRef;
  children: React.ReactNode | null;
}) => {
  const content = layout.map((item) => {
    const key = `${item.type}_${item.name}`;

    if (item.type === 'layout') {
      return (
        <Box key={key} flexDirection={item.direction as CSSProperties['flexDirection']}>
          {(item.item as ApiLayoutRef).map((subItem) => (
            <LayoutRenderer
              key={`subitem_${key}_${subItem.type}_${subItem.name}`}
              layout={[subItem]}
            >
              {children}
            </LayoutRenderer>
          ))}
        </Box>
      );
    }

    if (item.name === 'Children') {
      return <React.Fragment key={key}>{children}</React.Fragment>;
    }

    if (item.name === 'Banner') {
      return <Banner key={key} data={item.item as ApiComponentBannerState} />;
    }

    if (item.name === 'Board') {
      return <Board key={key} data={item.item as ApiComponentBoardState} />;
    }

    if (item.name === 'Feed') {
      return <Feed key={key} data={item.item as ApiComponentFeedState} />;
    }

    if (item.name === 'Navbar') {
      return <Navbar key={key} items={item.item as ApiComponentNavbarState} />;
    }

    if (item.name === 'RadioPlayer') {
      return <RadioAllPlayers key={key} initialState={item.item as ApiComponentRadioPlayerState} />;
    }

    if (item.name === 'Thread') {
      return <Thread key={key} data={item.item as ApiComponentThreadState} />;
    }

    return (
      <pre key={key} style={{ whiteSpace: 'pre-wrap' }}>
        <code>{JSON.stringify(item, null, 2)}</code>
      </pre>
    );
  });

  return <>{content}</>;
};
