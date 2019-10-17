const { execSync } = require("child_process");
const config = require("../src/config");
const logger = require("../src/config/logger");

try {
  logger.debug("Creating database...");
  execSync(`sudo -u postgres psql -c "CREATE DATABASE ${config.dbName};"`);
  execSync(
    `sudo -u postgres psql -c "CREATE USER ${config.dbUser} WITH ENCRYPTED PASSWORD '${config.dbPassword}';"`
  );
  execSync(
    `sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ${config.dbName} TO ${config.dbUser};"`
  );
  execSync(`sudo -u postgres psql -c "ALTER ROLE ${config.dbUser} superuser;"`);
  logger.debug("Created database.");
} catch (error) {
  logger.error(error);
}
