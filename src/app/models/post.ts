import { Comment, UpvoteUser } from './comment';
import { User } from './user';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface Post {
    id: string;
    title: string;
    authorId: string; //userId
    author?: User;
    categoryId: string; //courseId
    content: string;
    upvote: number;
    commentList: Comment[];
    timeDate?: Date;
    time: Timestamp;
    upvoteUsers?: UpvoteUser[]
}