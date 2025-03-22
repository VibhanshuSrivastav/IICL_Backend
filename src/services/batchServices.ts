import mongoose, { Document, Schema } from 'mongoose';

// Define the Batch schema
const batchSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Define the Batch interface
interface IBatch extends Document {
    name: string;
    description: string;
    createdAt: Date;
}

// Create the Batch model
const Batch = mongoose.model<IBatch>('Batch', batchSchema);

// Function to add a new batch
export const addBatch = async (name: string, description: string): Promise<IBatch> => {
    const newBatch = new Batch({ name, description });
    return await newBatch.save();
};

// Function to fetch batch options
export const fetchBatchOptions = async (): Promise<IBatch[]> => {
    return await Batch.find().select('name description').exec();
};