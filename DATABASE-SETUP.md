# Database Setup Guide

This guide will help you set up the PostgreSQL database for the OUTSINC application.

## Prerequisites

- PostgreSQL 12 or higher installed
- Access to create databases and users

## Setup Steps

### 1. Create Database and User

```bash
# Login to PostgreSQL as superuser
sudo -u postgres psql

# Create database
CREATE DATABASE outsinc;

# Create user (change password)
CREATE USER outsinc_user WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE outsinc TO outsinc_user;

# Exit psql
\q
```

### 2. Run Schema Script

```bash
# Navigate to the config directory
cd server/config

# Run the schema script
psql -U outsinc_user -d outsinc -f database.sql

# You will be prompted for the password
```

### 3. (Optional) Load Sample Data

```bash
# Load sample data for testing
psql -U outsinc_user -d outsinc -f seed-data.sql
```

### 4. Configure Environment Variables

Copy `.env.example` to `.env` and update with your database credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=outsinc
DB_USER=outsinc_user
DB_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret_key_change_in_production
```

## Verify Setup

Start the server and check the connection:

```bash
npm install
npm start
```

You should see: `Database connected successfully`

## Sample Data

The seed data includes:

- 4 partner agencies
- 10 FAQ entries across different categories
- 4 upcoming events
- 3 blog posts (news, blog, impact update)
- 4 eLearning courses

## Security Notes

- **Change the default passwords** in production
- **Generate a strong JWT secret** (at least 32 random characters)
- Consider using environment-specific configurations
- Enable SSL connections for production databases
- Implement regular backups

## Troubleshooting

### Connection Issues

If you see connection errors:

1. Check PostgreSQL is running: `sudo systemctl status postgresql`
2. Verify database exists: `psql -U postgres -l`
3. Check user permissions
4. Verify firewall settings if connecting remotely

### Permission Issues

If you see permission errors:

```sql
-- Grant all necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO outsinc_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO outsinc_user;
```

### Schema Updates

To reset the database (⚠️ WARNING: This will delete all data):

```bash
psql -U outsinc_user -d outsinc -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
psql -U outsinc_user -d outsinc -f database.sql
psql -U outsinc_user -d outsinc -f seed-data.sql
```

## Next Steps

After setting up the database:

1. Create an admin user through the API or directly in the database
2. Configure email settings for notifications
3. Set up backup procedures
4. Configure monitoring and logging
5. Review and adjust database connection pool settings based on load

## Support

For issues with database setup, check:
- PostgreSQL logs: `/var/log/postgresql/`
- Application logs in the console
- Database connection settings in `.env`
