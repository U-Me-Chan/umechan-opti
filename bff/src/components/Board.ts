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
    const { board = 'b', page = '0' } = query as { board: string, page: string };
    const { payload: { posts } } = await getBoardData(board, Number(page));
    this.state = {
      posts: posts || [],
    };
  };
  stateTypeSchema: TypeSchema = boardState;
}

export default Board;
