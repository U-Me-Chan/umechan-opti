import axios from "axios";
import { API_URI, PAGE_SIZE } from "src/constants";
import { Board, BoardData } from "src/types/board";
import { Post, ThreadData } from "src/types/post";

type ApiResponse<T> = {
    payload: T;
    version: string;
    error: null;
};

export const apiCall = async <T,>(url: string, params?: Record<string, string | number | undefined>): Promise<T> => {
    const uri = `${API_URI}${url}`;
    const { data } = await axios.get<ApiResponse<T>>(uri, { params });
    return data.payload;
}

export const getAll = async (): Promise<{ posts: Post[]; boards: Board[] }> => {
    return await apiCall<{ posts: Post[]; boards: Board[] }>('/board/all');
}

export const getBoard = async (tag?: string, offset?: number): Promise<BoardData> => {
    return (await apiCall<{ board_data: BoardData }>(`/board/${tag || 'test'}`, { limit: PAGE_SIZE, offset })).board_data;
}

export const getPost = async (id?: string): Promise<ThreadData> => {
    return (await apiCall<{ thread_data: ThreadData }>(`/post/${id || '0'}`)).thread_data;
}
