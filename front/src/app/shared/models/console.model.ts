import { Game } from './game.model';

export interface Console {
    name: string;
    version: string;
    games: Game[];
}
