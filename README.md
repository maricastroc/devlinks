
![image](https://github.com/user-attachments/assets/af9d3e26-b8b3-47df-a210-7d574444309e)


# Mail Tracking Service System

This is an email tracking service that allows you to monitor opens and clicks on email campaigns. The application allows you to create and manage campaigns, send emails to subscriber lists, track interactions with templates, and view campaign statistics. The front-end is built with React.js, and the back-end is powered by Laravel and PHP.

## 📋 Features

- Campaign Management: Create, view, and delete email campaigns.
- Email Lists: Create and manage email lists of subscribers.
- Subscribers: Manage subscribers, including the ability to add, edit, and remove them.
- Email Tracking: Track email opens and click activity.
- Email Templates: Create and customize email templates for campaigns.
- Campaign Statistics: View open and click rates for each campaign.

## 🛠 Technologies Used

- Laravel (PHP): Backend to manage the system, user authentication, and business logic.
- React.js: Frontend for user interaction.
- SQLite: Database used to store data locally.
- Tailwind CSS: CSS framework for styling.
- Inertia.js: Framework for integration between Laravel backend and React frontend.
- SQLite: Relational database for storing campaign data, email lists, and subscriber information.

## ⚙️ Key Concepts

- Authentication Middleware: Ensures only authorized users can access campaign data.
- Factories & Seeders: Used for generating and seeding test data (campaigns, subscribers).
- Controllers: Handle campaign logic and interactions.
- Models: Represent database tables and relationships (e.g., Campaign, Subscriber).
- Queues & Jobs: Queue background tasks like sending emails and tracking events to improve performance.

## 🔧 How to Run the Project

### Prerequisites
Before running the project, you need to have the following dependencies installed:

- PHP (version 8.0 or higher)
- Composer (for managing PHP dependencies)
- Node.js (for running React)
- NPM (package manager for Node.js)

### Steps to Run the Project

> Clone the repository:

```bash
git clone https://github.com/maricastroc/sitemark
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
DB_CONNECTION=sqlite
DB_DATABASE=/path/to/your/database/database.sqlite
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

> ⏩ The React server will be available at [http://localhost:3000](http://localhost:3000).

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
