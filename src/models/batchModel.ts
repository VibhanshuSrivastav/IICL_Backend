import mongoose, { Schema, Document } from 'mongoose';

interface BatchData extends Document {
    course: string;
    time: string;
    franhciseId:string;
}

const BatchSchema: Schema = new Schema({
    course: { type: String, required: true },
    time: { type: String, required: true },
    franchiseId : {type: String }
});

const BatchModel = mongoose.model<BatchData>('Batch', BatchSchema);

export default BatchModel;