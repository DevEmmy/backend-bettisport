export interface CategoryDto {
    title: string;
    description: string;
    slug: string;
    parentCategory?: string;
}

export interface UpdateCategoryDto {
    title?: string;
    description?: string;
    slug?: string;
    parentCategory?: string;
}
