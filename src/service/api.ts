import { ApiResponse, Board, BoardData, Post, RadioStatus, ThreadData } from 'src/types/api';

function api<T = unknown>(url: string | URL, init?: RequestInit): Promise<T> {
  return fetch(url, init)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    })
    .then((data) => {
      return data;
    });
}

export const getThread = (threadId: string) => {
  return api<ApiResponse<{ thread_data: ThreadData }>>(
    `http://pissykaka.scheoble.xyz/post/${threadId || '0'}`,
  );
};

export const getBoardData = (boardTag: string, page: number) => {
  const url = new URL(`http://pissykaka.scheoble.xyz/v2/board/${boardTag}`);
  url.searchParams.append('offset', (page * 20).toString());
  url.searchParams.append('limit', (20).toString());

  return api<ApiResponse<BoardData>>(url);
};

export const getAllBoards = () => {
  return api<ApiResponse<{ boards: Board[]; posts: Post[] }>>(
    'http://pissykaka.scheoble.xyz/v2/board',
  );
};

export const getRadioStatus = (url: string) => {
  return api<RadioStatus>(`${url}api/status/`);
};
