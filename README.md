# Portfolio Hero

A modern portfolio website with a blog system and admin interface.

## Features

- Modern, responsive design
- Blog system with rich content support
  - Text content
  - Images with captions
  - Videos
  - Podcasts/Audio
  - Subheadings and sections
- Admin interface for content management
- Authentication system
- CI/CD pipeline with GitHub Actions

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma (SQLite)
- Framer Motion
- Shadcn/ui

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-hero.git
cd portfolio-hero
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```env
DATABASE_URL="file:./dev.db"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin"
```

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - React components
- `/lib` - Utility functions and shared logic
- `/prisma` - Database schema and migrations
- `/public` - Static assets
- `/types` - TypeScript type definitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 