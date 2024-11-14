require('dotenv').config();  // Load environment variables from the .env file
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './src/routes/router';  // Adjust the path as needed

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! This is WhatsApp by prottasa');
});

// Set the port using either the environment variable or a fallback default
const port = process.env.PORT || 3000;  // Default to 3000 if PORT is not set in .env

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
