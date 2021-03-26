export interface PreloadTypes {
  method: string;
  data: any[];
}

export interface CreateGameTypes {
  world: (showWorld: boolean, grid: string, img: string, size: number) => void;
}

export interface LoadGameTypes {
  preload: (data: PreloadTypes[]) => void;
}
