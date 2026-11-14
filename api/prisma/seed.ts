import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  max: 1,
  connectionTimeoutMillis: 30000,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const genres = [
    { name: 'Science Fiction', description: 'Speculative science and future worlds' },
    { name: 'Fantasy', description: 'Magic, mythology and imaginary worlds' },
    { name: 'Mystery', description: 'Investigations and unexplained events' },
    { name: 'Biography', description: 'Accounts of real people and their lives' },
    { name: 'Technology', description: 'Computing, engineering and innovation' },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });
  }

  const books = [
    { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', publishedYear: 1965, genre: 'Science Fiction' },
    { title: 'Foundation', author: 'Isaac Asimov', isbn: '9780553293357', publishedYear: 1951, genre: 'Science Fiction' },
    { title: 'Neuromancer', author: 'William Gibson', isbn: '9780441569595', publishedYear: 1984, genre: 'Science Fiction' },

    { title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227', publishedYear: 1937, genre: 'Fantasy' },
    { title: 'A Wizard of Earthsea', author: 'Ursula K. Le Guin', isbn: '9780547773742', publishedYear: 1968, genre: 'Fantasy' },
    { title: 'The Name of the Wind', author: 'Patrick Rothfuss', isbn: '9780756404741', publishedYear: 2007, genre: 'Fantasy' },

    { title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle', isbn: '9780451528018', publishedYear: 1902, genre: 'Mystery' },
    { title: 'Gone Girl', author: 'Gillian Flynn', isbn: '9780307588371', publishedYear: 2012, genre: 'Mystery' },
    { title: 'The Big Sleep', author: 'Raymond Chandler', isbn: '9780394758282', publishedYear: 1939, genre: 'Mystery' },

    { title: 'Long Walk to Freedom', author: 'Nelson Mandela', isbn: '9780316548182', publishedYear: 1994, genre: 'Biography' },
    { title: 'Steve Jobs', author: 'Walter Isaacson', isbn: '9781451648539', publishedYear: 2011, genre: 'Biography' },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank', isbn: '9780553296983', publishedYear: 1947, genre: 'Biography' },

    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', publishedYear: 2008, genre: 'Technology' },
    { title: 'The Pragmatic Programmer', author: 'David Thomas and Andrew Hunt', isbn: '9780135957059', publishedYear: 1999, genre: 'Technology' },
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', isbn: '9781449373320', publishedYear: 2017, genre: 'Technology' },
  ];

  for (const book of books) {
    const genre = await prisma.genre.findUniqueOrThrow({
      where: { name: book.genre },
    });

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
        genreId: genre.id,
      },
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publishedYear: book.publishedYear,
        genreId: genre.id,
      },
    });
  }

  console.log('Seed completed: 5 genres and 15 books.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
