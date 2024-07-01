"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
function slugify(str) {
    return str
        .toLowerCase() // Convert the string to lowercase
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple dashes with a single dash
        .replace(/^-+/, '') // Trim dashes from the start of the string
        .replace(/-+$/, ''); // Trim dashes from the end of the string
}
exports.slugify = slugify;
