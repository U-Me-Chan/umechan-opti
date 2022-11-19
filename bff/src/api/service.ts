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
