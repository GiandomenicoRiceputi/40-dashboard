// lib/logger.ts
const logger = {
  info: (message: string) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`Info: ${message}`);
    }
  },
  error: (message: string, error: Error) => {
    console.error(`Error: ${message}`, error);
  },
};

export default logger;
