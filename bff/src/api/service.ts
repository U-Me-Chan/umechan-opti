import fetch, { RequestInit } from 'node-fetch';
import { ApiResponse, Board, BoardData, Post, RadioStatus, ThreadData } from './types';

function api<T = unknown>(url: string, init?: RequestInit): Promise<T> {
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

export const getRadioStatus = (url: string) => {
  return api<RadioStatus>(`${url}api/status/`);
};

export const getAllBoards = () => {
  return api<ApiResponse<{ boards: Board[]; posts: Post[] }>>(
    'http://pissykaka.scheoble.xyz/v2/board',
  );
};

export const getThread = (threadId: string) => {
  return api<ApiResponse<{ thread_data: ThreadData }>>(
    `http://pissykaka.scheoble.xyz/post/${threadId || '0'}`,
  );
};
