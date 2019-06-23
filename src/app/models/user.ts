import { Difficulty } from './difficulty';

export class User {
    totalExp: number;
    todayExp: number;
    streak: number; //days
    difficulty: Difficulty;
    totalPoints: number;
    role: string;
}