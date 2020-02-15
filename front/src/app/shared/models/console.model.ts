import { Game } from './game.model';

export interface Console {
    id: number;
    name: string;
    version: string;
    games: Game[];
}
