import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Book, BookPayload } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/books`;

  constructor(private readonly http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  addBook(payload: BookPayload): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, payload);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(this.baseUrl, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
