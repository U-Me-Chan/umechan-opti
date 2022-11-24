import { TypeSchema, Component } from 'core';
import { getBoardData } from '../api/service';
import { Post } from '../api/types';
import { boardState } from '../schemes/board';

type T = Component<{ posts: Post[] }>;

class Board implements T {
  name = 'Board';
  state: T['state'] = { posts: [] };
  stateLoader: T['stateLoader'] = async (request) => {
    const { query } = request;
    const { boardId = 'b', page = '0' } = query as { boardId: string, page: string };
    const { payload: { posts } } = await getBoardData(boardId, Number(page));
    this.state = {
      posts: posts || [],
    };
  };
  stateTypeSchema: TypeSchema = boardState;
}

export default Board;
