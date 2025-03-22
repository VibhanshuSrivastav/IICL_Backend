import mongoose, {Schema, Document} from "mongoose";

interface CourseData extends Document {
    course:string;
}

const CourseSchema:Schema = new Schema({
    course : {type:String, required:true }
});

const CourseModel = mongoose.model<CourseData>('Course', CourseSchema);

export default CourseModel ;

