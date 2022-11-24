'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { ApiComponentRadioPlayerState } from '../../service/base.api';
// import { getRadioStatus } from '../../service/api';
// import { RadioStatus } from '../../types/api';
import { isServer, UnwrapArray } from '../../utils';
import { Bound } from '../Bound';
import { Box } from '../Box';
import { Text, TextVariant } from '../Text';

export const RadioAllPlayers = ({
  initialState,
}: {
  initialState: ApiComponentRadioPlayerState;
}) => {
  const content = initialState.status?.map((item) => (
    <RadioPlayer key={item.mount?.name} initialState={item} />
  ));

  return <>{content}</>;
};

export const RadioPlayer = ({
  initialState,
}: {
  initialState: UnwrapArray<ApiComponentRadioPlayerState['status']>;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [updateIntervalMs, setUpdateIntervalMs] = useState(60000);
  // const [radioStatus, setRadioStatus] = useState<RadioStatus>(initialState);

  useEffect(() => {
    if (isServer()) {
      return;
    }

    // setUpdateIntervalMs(() => (isPlaying ? 10000 : 60000));
  }, [isPlaying]);

  useEffect(() => {
    if (isServer()) {
      return;
    }

    // getRadioStatus(apiBasePath)
    //   .then((res) => setRadioStatus(res))
    //   .catch(console.error);
    //
    // const intervalPointer = setInterval(() => {
    //   getRadioStatus(apiBasePath)
    //     .then((res) => setRadioStatus(res))
    //     .catch(console.error);
    // }, updateIntervalMs);

    // return () => clearInterval(intervalPointer);
  }, [updateIntervalMs]);

  const content = initialState?.status?.streaming ? (
    <>
      <Box gap='8px' width='100%' justifyContent='center'>
        <Box borderRadius='4px' overflow='hidden'>
          <Image
            src={`${initialState?.mount?.apiBasePath}api/scanner/image/${initialState?.status.currentFile}`}
            width={128}
            height={128}
            alt={initialState?.status?.fileData?.id3Artist || ''}
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </Box>

      <Box alignItems='center'>
        <Text
          variant={TextVariant.textBodyBold1}
          style={{ textAlign: 'center' }}
        >{`${initialState?.status?.fileData?.id3Artist} - ${initialState?.status?.fileData?.id3Title}`}</Text>
      </Box>

      {isPlaying && (
        <audio
          src={initialState?.mount?.link}
          id={`radio_${initialState?.mount?.name}`}
          autoPlay={false}
        />
      )}

      <Box gap='8px'>
        <button
          type='button'
          onClick={() => {
            setIsPlaying((flag) => {
              const next = !flag;

              setTimeout(() => {
                if (next) {
                  (
                    document.getElementById(
                      `radio_${initialState?.mount?.name}`,
                    ) as HTMLAudioElement
                  )
                    ?.play()
                    ?.catch(console.error);
                } else {
                  (
                    document.getElementById(
                      `radio_${initialState?.mount?.name}`,
                    ) as HTMLAudioElement
                  )?.pause();
                }
              }, 250);

              return next;
            });
          }}
        >
          {isPlaying ? '⏸' : '▶️'}
        </button>

        <input
          type='range'
          name='volume'
          min='0'
          max='100'
          value='100'
          onChange={(ev) => {
            try {
              const value = ev.target.valueAsNumber;
              const tag = document.getElementById(
                `radio_${initialState?.mount?.name}`,
              ) as HTMLAudioElement;
              tag.volume = value / 100;
            } catch {}
          }}
        />
      </Box>
    </>
  ) : (
    <>
      <Text>Радио сейчас оффлайн</Text>
    </>
  );

  const title = initialState?.status?.playlistData?.name
    ? `${initialState?.mount?.name}: ${initialState?.status?.playlistData?.name}`
    : initialState?.mount?.name || '';

  return (
    <Bound title={title}>
      <Box
        flexDirection='column'
        alignItems='center'
        justifyContent='flex-start'
        gap='8px'
        width='100%'
      >
        {content}
      </Box>
    </Bound>
  );
};
