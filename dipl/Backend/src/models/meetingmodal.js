import { Schema, model } from 'mongoose';

const meetingSchema = new Schema({
    meetingName: { type: String, required: true },
    meetingDescription: { type: String, required: true },
    meetingWith: { type: String, required: true },
    meetingDate: { type: Date, required: true },
    meetingTime: { type: String, required: true },
    hostedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    selectedUsers: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

export default model('Meeting', meetingSchema);
