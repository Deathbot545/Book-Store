import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { BookService } from './book.service';

const bookServiceMock: Pick<BookService, 'getBooks' | 'addBook' | 'updateBook' | 'deleteBook'> = {
  getBooks: () => of([]),
  addBook: (_payload) => of({ id: 1, title: '', author: '', isbn: '', publicationDate: '' }),
  updateBook: (_book) => of({ id: 1, title: '', author: '', isbn: '', publicationDate: '' }),
  deleteBook: (_id) => of(void 0)
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: BookService, useValue: bookServiceMock }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize in add mode', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isEditing).toBeFalse();
  });

  it('should render heading', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Book Management');
  });
});
