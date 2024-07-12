// models/Notification.js
import { Schema, model } from 'mongoose';

const NotificationSchema = new Schema({
  type: {
    type: String,
    enum: ['Meeting_Reminder', 'other'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
   recipient: {
    type: Schema.Types.ObjectId,
    ref: 'Meeting',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
});

export default model('MeetingNotification', NotificationSchema);