# Library Management System

## Schema Decisions

The database uses separate `Genre` and `Book` models with a one-to-many relationship. A genre can contain many books, while each book references one genre through `genreId`.

This avoids duplicating genre names and descriptions across book records, makes genre updates consistent, and uses a foreign key to enforce referential integrity. The `onDelete: Restrict` rule prevents deleting a genre that is still referenced by books.

The `Role` enum restricts user roles to `PATRON` and `LIBRARIAN`.
