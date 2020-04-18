import { Game } from './game.model';

export interface Console {
    id: string;
    name: string;
    version: string;
    games: Game[];
}
