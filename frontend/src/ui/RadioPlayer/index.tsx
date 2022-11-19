'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getRadioStatus } from '../../service/api';
import { RadioStatus } from '../../types/api';
import { isServer } from '../../utils';
import { Box } from '../Box';
import { Text, TextVariant } from '../Text';

export const RadioPlayer = ({
  mount,
  initialState,
}: {
  mount: { name: string; link: string; apiBasePath: string };
  initialState: RadioStatus;
}) => {
  const { link, apiBasePath } = mount;
  const [isPlaying, setIsPlaying] = useState(false);
  const [updateIntervalMs, setUpdateIntervalMs] = useState(60000);
  const [radioStatus, setRadioStatus] = useState<RadioStatus>(initialState);

  useEffect(() => {
    if (isServer()) {
      return;
    }

    setUpdateIntervalMs(() => (isPlaying ? 10000 : 60000));
  }, [isPlaying]);

  useEffect(() => {
    if (isServer()) {
      return;
    }

    getRadioStatus(apiBasePath)
      .then((res) => setRadioStatus(res))
      .catch(console.error);

    const intervalPointer = setInterval(() => {
      getRadioStatus(apiBasePath)
        .then((res) => setRadioStatus(res))
        .catch(console.error);
    }, updateIntervalMs);

    return () => clearInterval(intervalPointer);
  }, [updateIntervalMs]);

  const content = radioStatus?.streaming ? (
    <>
      <Box flexDirection='column' alignItems='center' width='100%' gap='4px'>
        <Text
          variant={TextVariant.textBody1}
          style={{
            whiteSpace: 'pre',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {radioStatus?.playlistData?.name}
        </Text>
      </Box>

      <Box gap='8px' width='100%' justifyContent='center'>
        <Box borderRadius='4px' overflow='hidden'>
          <Image
            src={`${apiBasePath}api/scanner/image/${radioStatus.currentFile}`}
            width={128}
            height={128}
            alt={radioStatus?.fileData?.id3Artist || ''}
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </Box>

      <Box alignItems='center'>
        <Text
          variant={TextVariant.textBodyBold1}
          style={{ textAlign: 'center' }}
        >{`${radioStatus?.fileData?.id3Artist} - ${radioStatus?.fileData?.id3Title}`}</Text>
      </Box>

      {isPlaying && <audio src={link} id={`radio_${mount}`} autoPlay={false} />}

      <Box gap='8px'>
        <button
          type='button'
          onClick={() => {
            setIsPlaying((flag) => {
              const next = !flag;

              setTimeout(() => {
                if (next) {
                  (document.getElementById(`radio_${mount}`) as HTMLAudioElement)
                    ?.play()
                    ?.catch(console.error);
                } else {
                  (document.getElementById(`radio_${mount}`) as HTMLAudioElement)?.pause();
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
              const tag = document.getElementById(`radio_${mount}`) as HTMLAudioElement;
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

  return (
    <Box
      flexDirection='column'
      alignItems='center'
      justifyContent='flex-start'
      gap='8px'
      width='100%'
    >
      {content}
    </Box>
  );
};
