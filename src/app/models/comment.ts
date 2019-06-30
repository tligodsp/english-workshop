import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface UpvoteUser {
    uid: string;
    upvote: number;
}

export interface Comment {
    id: string;
    authorId: string;
    content: string;
    upvote: number;
    timeDate?: Date;
    time: Timestamp;
    upvoteUsers?: UpvoteUser[];
}