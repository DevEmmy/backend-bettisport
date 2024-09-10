export interface PollDto {
    question: string;
    format: string;
    choices: { text: string; votes: number; voters: string[] }[];
    duration: number;
    author: string; // ObjectId as string
    media: string
}

export interface UpdatePollDto {
    question?: string;
    format?: string;
    choices?: { text: string; votes: number; voters: string[] }[];
    duration?: number;
}

export interface VoteDto {
    pollId: string;
    choiceIndex: number;
    userId: string;
}
