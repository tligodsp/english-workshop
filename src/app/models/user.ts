import { Difficulty } from './difficulty';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class User {
    uid: string;
    email: string;
    displayName: string;
    totalExp: number;
    todayExp: number;
    streak: number; //days
    difficulty: Difficulty;
    difficultyId: string;
    totalPoints: number;
    role: string;
    photoURL: string; //url
    lastDidExercise: Timestamp;
}