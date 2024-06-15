export interface CommentDto {
    author: string; // ObjectId as string
    comment: string;
    inResponse: string; // ObjectId as string
}

export interface UpdateCommentDto {
    comment?: string;
}
