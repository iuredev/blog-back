# Blog Backend with Strapi

This is the backend service for a personal blog built with Strapi, a headless CMS. It provides a robust API for managing blog content, including posts, categories, and media.

## 🚀 Features

- Content Management System (CMS) for blog posts
- RESTful API endpoints
- Media management
- User authentication and authorization
- Custom content types and relations
- API documentation with Swagger

## 🛠️ Tech Stack

- [Strapi](https://strapi.io/) - Headless CMS
- [Node.js](https://nodejs.org/) - Runtime environment
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Docker](https://www.docker.com/) - Containerization

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL
- Docker (optional)

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd blog-back
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure your environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your database credentials and other configurations.

4. Start the development server:

```bash
npm run develop
# or
yarn develop
```

The server will start at `http://localhost:1337` by default.

## 📚 API Documentation

Once the server is running, you can access:

- Admin Panel: `http://localhost:1337/admin`
- API Documentation: `http://localhost:1337/documentation`

## 🔧 Available Scripts

- `npm run develop` - Start the development server with auto-reload
- `npm run start` - Start the production server
- `npm run build` - Build the admin panel
- `npm run strapi` - Run Strapi CLI commands

## 🐳 Docker Support

To run the project using Docker:

```bash
docker-compose up -d
```

## 📦 Database

This project uses PostgreSQL as the database. Make sure to:

1. Create a database
2. Update the database configuration in `.env`
3. Run migrations if needed

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Register a user through the admin panel
2. Use the login endpoint to get a JWT token
3. Include the token in the Authorization header for subsequent requests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Strapi team for the amazing headless CMS
- All contributors who have helped shape this project
