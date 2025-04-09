import cors from 'cors';

const corsOptions = {
    origin: '*', // Change to specific origins in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
};

export default cors(corsOptions);
