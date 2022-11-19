import { RadioStatus } from './../api/types';
import { RADIOS_LINKS } from './../constants';
import { getRadioStatus } from './../api/service';
import { TypeSchema, Component } from 'core';

class RadioPlayer implements Component<{ status: { mount: { name: string; link: string; apiBasePath: string }, status: RadioStatus }[] }> {
  name = 'RadioPlayer';
  state: { status: { mount: { name: string; link: string; apiBasePath: string }, status: RadioStatus }[] } = { status: [] };
  stateLoader = async () => {
    const status: { mount: { name: string; link: string; apiBasePath: string }, status: RadioStatus }[] = [];

    try {
      await Promise.all(
        RADIOS_LINKS.map((mount) =>
          getRadioStatus(mount.apiBasePath).then((data) => {
            status.push({ mount, status: data });
          }),
        ),
      );
    } catch {}

    this.state = { status };
  };
  stateTypeSchema: TypeSchema = {
    type: 'object',
    properties: {
      status: {
        type: 'array',
        of: {
          type: 'object',
          properties: {
            mount: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                link: { type: 'string' },
                apiBasePath: { type: 'string' },
              },
            },
            status: {
              type: 'object',
              properties: {
                scheduling: { type: 'boolean' },
                playing: { type: 'boolean' },
                syncing: { type: 'boolean' },
                streaming: { type: 'boolean' },
                currentFile: { type: 'string' },
                thumbnailPath: { type: 'string' },
                fileData: {
                  type: 'object',
                  properties: {
                    filehash: { type: 'string' },
                    path: { type: 'string' },
                    name: { type: 'string' },
                    id3Artist: { type: 'string' },
                    id3Title: { type: 'string' },
                  },
                },
                playlistData: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    type: { type: 'string' },
                  }
                },
              },
            },
          },
        },
      },
    },
  };
}

export default RadioPlayer;
