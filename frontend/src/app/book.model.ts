export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}

export type BookPayload = Omit<Book, 'id'>;
