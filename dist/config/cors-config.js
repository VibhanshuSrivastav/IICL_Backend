import cors from 'cors';
const corsOptions = {
    origin: '*', // Change to specific origins in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
export default cors(corsOptions);
