# Library Management System API

A RESTful Library Management System built with NestJS, TypeScript,
Prisma ORM and PostgreSQL.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Role-based authorization (PATRON and LIBRARIAN)
- Book CRUD operations
- Genre CRUD operations
- Book search and genre filtering
- Pagination with validated limits
- PostgreSQL database integration

## Technology Stack

- NestJS
- TypeScript
- PostgreSQL (Neon)
- Prisma ORM
- Passport JWT
- bcrypt
- class-validator
- class-transformer

## Requirements

- Node.js
- npm
- PostgreSQL database

## Installation

Clone the repository and enter the API directory:

```bash
git clone git@github.com:Alpha-elvo/library-management-system.git
cd library-management-system/api
npm install
