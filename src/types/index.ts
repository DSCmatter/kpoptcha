export interface Idol {
    id: string;
    name: string;
    group: string;
    images: string[];
}

export interface Tile {
    id: string;
    isTarget: boolean;
    src: string;
}

export interface Task {
    target: Idol;
    tiles: Tile[];
}