import { RadioStatus } from './../api/types';
import { RADIOS_LINKS } from './../constants';
import { getRadioStatus } from './../api/service';
import { TypeSchema, Component } from 'core';
import { radioPlayerState } from '../schemes/radioPlayer';

type Status = {
  mount: {
    name: string;
    link: string;
    apiBasePath: string;
  };
  status: RadioStatus;
};

type T = Component<{ status: Status[]; }>;

class RadioPlayer implements T {
  name = 'RadioPlayer';
  state: T['state'] = { status: [] };
  stateLoader = async () => {
    const status: Status[] = [];

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
  stateTypeSchema: TypeSchema = radioPlayerState;
}

export default RadioPlayer;
