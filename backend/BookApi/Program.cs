var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy
            .SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularDev");

var books = new List<Book>();
var nextId = 1;

app.MapGet("/api/books", () =>
{
    return Results.Ok(books);
})
.WithName("GetBooks")
.WithOpenApi();

app.MapGet("/api/books/{id:int}", (int id) =>
{
    var book = books.FirstOrDefault(b => b.Id == id);
    return book is null ? Results.NotFound() : Results.Ok(book);
})
.WithName("GetBookById")
.WithOpenApi();

app.MapPost("/api/books", (Book book) =>
{
    var newBook = book with { Id = nextId++ };
    books.Add(newBook);
    return Results.Created($"/api/books/{newBook.Id}", newBook);
})
.WithName("CreateBook")
.WithOpenApi();

app.MapPut("/api/books", (Book book) =>
{
    var index = books.FindIndex(b => b.Id == book.Id);
    if (index < 0)
        return Results.NotFound();

    books[index] = book;
    return Results.Ok(book);
})
.WithName("UpdateBook")
.WithOpenApi();

app.MapDelete("/api/books/{id:int}", (int id) =>
{
    var index = books.FindIndex(b => b.Id == id);
    if (index < 0)
        return Results.NotFound();

    books.RemoveAt(index);
    return Results.NoContent();
})
.WithName("DeleteBook")
.WithOpenApi();

app.Run();

public record Book(int Id, string Title, string Author, string ISBN, DateOnly PublicationDate);
