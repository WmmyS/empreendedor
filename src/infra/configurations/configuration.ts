export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
    userTokenLimit: process.env.JWT_USER_TOKEN_LIMIT ?? 5,
  },
  docs: {
    title: process.env.DOCS_TITLE,
    description: process.env.DOCS_DESCRIPTION,
    version: process.env.DOCS_VERSION,
    url: process.env.DOCS_URL,
  },
  storage: {
    region: process.env.STORAGE_REGION,
    bucketName: process.env.STORAGE_BUCKET_NAME,
    endpoint: process.env.STORAGE_ENDPOINT,
    accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
    secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY,
  }

});