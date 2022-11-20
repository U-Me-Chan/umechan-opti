import { TypeSchema, Component } from 'core';
import { getThread } from '../api/service';
import { Post } from '../api/types';
import { threadState } from '../schemes/thread';

type T = Component<{ posts: Post[] }>;

class Thread implements T {
  name = 'Thread';
  state: T['state'] = { posts: [] };
  stateLoader: T['stateLoader'] = async (request) => {
    const { query } = request;
    const { threadId = '0' } = query as { threadId: string };
    const { payload: { thread_data: { replies } } } = await getThread(threadId);
    this.state = {
      posts: replies,
    };
  };
  stateTypeSchema: TypeSchema = threadState;
}

export default Thread;
