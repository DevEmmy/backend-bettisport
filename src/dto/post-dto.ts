export interface PostDto {
    title: string;
    author: string; // ObjectId as string
    content: string;
    media?: string;
    publish?: boolean;
    categories?: string[]; // Array of ObjectId as strings
    menCategories?: string[];
    womenCategories?: string[];
    excerpt?: string;
    format?: string;
    tags?: string[];
    featuredImage?: string;
    nationality?: string;
    highlight?: string;
    photoSplash?: string;
    slug?: string;
}

export interface UpdatePostDto {
    title?: string;
    content?: string;
    media?: string;
    publish?: boolean;
    categories?: string[];
    menCategories?: string[];
    womenCategories?: string[];
    excerpt?: string;
    format?: string;
    tags?: string[];
    featuredImage?: string;
    nationality?: string;
    highlight?: string;
    photoSplash?: string;
    slug?: string;
    reads?: number;
}
