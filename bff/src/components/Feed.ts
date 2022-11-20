import { threadState } from './../schemes/thread';
import { TypeSchema, Component } from 'core';
import { getThread } from '../api/service';
import { Post } from '../api/types';
import { FEED_THREAD } from '../constants';

type T = Component<{ posts: Post[] }>;

class Feed implements T {
  name = 'Feed';
  state: T['state'] = { posts: [] };
  stateLoader = async () => {
    const { payload: { thread_data: { replies } } } = await getThread(FEED_THREAD.threadId);
    this.state = {
      posts: replies.filter(_ => FEED_THREAD.whitelist.includes(Number(_.id).toString())).reverse(),
    };
  };
  stateTypeSchema: TypeSchema = threadState;
}

export default Feed;
