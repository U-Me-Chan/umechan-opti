export type ApiResponse<T> = {
  payload: T;
  version: string;
  error: null;
};

export type Board = {
  id: number;
  tag: string;
  name: string;
  threads_count: number;
};

export type BoardData = {
  count?: number;
  posts?: Post[];
};

export type Post = {
  id?: number;
  poster?: string;
  subject?: string;
  message?: string;
  timestamp?: number;
  board?: Board;
  parent_id?: number | null;
  updated_at?: number;
  estimate?: number;
  replies?: Post[];
  replies_count?: number;
  is_verify?: boolean;
  board_id?: number;
  media?: Media;
  truncated_message?: string;
  datetime?: Date;
};

export type Media = {
  images?: Image[];
  youtubes?: YouTube[];
};

export type Image = {
  link?: string;
  preview?: string;
};

export type YouTube = {
  link?: string;
  preview?: string;
};

export type ThreadData = Post & {
  replies: Post[];
};

export type RadioStatus = {
  scheduling?: boolean;
  playing?: boolean;
  syncing?: boolean;
  streaming?: boolean;
  currentFile?: string;
  thumbnailPath?: string;
  fileData?: FileData;
  playlistData?: PlaylistData;
  currentPlaylistId?: string;
};

export type FileData = {
  filehash?: string;
  path?: string;
  name?: string;
  type?: string;
  id3Artist?: string;
  id3Title?: string;
  duration?: number;
  trimStart?: number;
  trimEnd?: number;
};

export type PlaylistData = {
  id?: number;
  name?: string;
  type?: string;
};
