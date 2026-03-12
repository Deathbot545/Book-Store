import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book, BookPayload } from './book.model';
import { BookService } from './book.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  books: Book[] = [];
  isLoading = false;
  errorMessage = '';
  isEditing = false;
  showForm = false;

  form: Book = {
    id: 0,
    title: '',
    author: '',
    isbn: '',
    publicationDate: ''
  };

  constructor(private readonly bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load books. Ensure the backend API is running.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.form.title || !this.form.author || !this.form.isbn || !this.form.publicationDate) {
      return;
    }

    if (this.isEditing) {
      this.bookService.updateBook(this.form).subscribe({
        next: () => {
          this.closeForm();
          this.loadBooks();
        },
        error: () => {
          this.errorMessage = 'Failed to update book.';
        }
      });
      return;
    }

    const payload: BookPayload = {
      title: this.form.title,
      author: this.form.author,
      isbn: this.form.isbn,
      publicationDate: this.form.publicationDate
    };

    this.bookService.addBook(payload).subscribe({
      next: () => {
        this.closeForm();
        this.loadBooks();
      },
      error: () => {
        this.errorMessage = 'Failed to add book.';
      }
    });
  }

  openForm(): void {
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  editBook(book: Book): void {
    this.form = { ...book };
    this.isEditing = true;
    this.errorMessage = '';
    this.openForm();
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.loadBooks();
      },
      error: () => {
        this.errorMessage = 'Failed to delete book.';
      }
    });
  }

  resetForm(): void {
    this.form = {
      id: 0,
      title: '',
      author: '',
      isbn: '',
      publicationDate: ''
    };
    this.isEditing = false;
  }
}
