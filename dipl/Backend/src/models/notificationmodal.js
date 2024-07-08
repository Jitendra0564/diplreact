// models/Notification.js
import { Schema, model } from 'mongoose';

const NotificationSchema = new Schema({
  type: {
    type: String,
    enum: ['reschedule_request', 'task_update', 'other'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task'
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

export default model('Notification', NotificationSchema);