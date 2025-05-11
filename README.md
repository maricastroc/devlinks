
![image](https://github.com/user-attachments/assets/dfbe3892-35a7-4b81-b322-88c564771610)


# Link Management System

This is a link management system that allows users to create, store, share and manage links with detailed information. The application uses PostgreSQL for database management and provides user-friendly interfaces to handle link details efficiently.

## 📋 Features

- Create, read, update, delete custom links
- View link previews in mobile mockup
- Custom link ordering
- Form validations for missing URL, incorrect or URL pattern for platform
- Select predefined profile theme
- Full appearance customization (Background color, Link button styles/colors,  Typography (font family and color)
- Add/edit profile details (Profile Picture, Name, E-mail, Username for custom URL)
- Receive validations if the profile details form is saved with no username
- Custom URL (e.g., devlinks.com/@yourusername)
- Support for fully custom links (beyond predefined platforms)
- Preview users' DevLinks profiles and copy the link to your clipboard


## 🛠 Technologies Used

- Laravel (PHP): Backend to manage the system, user authentication, and business logic.
- PostgreSQL: Relational database for storing link and user data.
- React.js: Frontend for user interaction.
- Tailwind CSS: CSS framework for styling.
- Inertia.js: Framework for integration between Laravel backend and React frontend.

## 🔧 How to Run the Project

### Prerequisites
Before running the project, you need to have the following dependencies installed:

- PHP (version 8.0 or higher)
- Composer (for managing PHP dependencies)
- Node.js (for running React)
- NPM (package manager for Node.js)

## 🌐 Hosting

The project is hosted on [Railway](https://railway.app), providing a scalable and reliable environment for deployment. You can access the live version of the application [here](https://devlinks-maricastroc.up.railway.app/).

### Steps to Run the Project

> Clone the repository:

```bash
git clone https://github.com/maricastroc/devlinks
```

> Install PHP dependencies:

```bash
composer install
```

> Configure environment variables:

```bash
cp .env.example .env
```

> Configure the environment variables in the .env file, especially the ones related to the database (SQLite):

```bash
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

> Generate the Laravel application key:

```bash
php artisan key:generate
```

> Install Node.js dependencies:

```bash
npm install
```

> Build the front-end files:

```bash
npm run build
```

> Start the server for the Laravel backend::

```bash
php artisan serve
```

> Start the server for the React front-end:
```bash
npm run dev
```

> ⏩ The React server will be available at [http://localhost:3000](http://localhost:8000).

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
