import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignDate: {
      type: Date,
      required: true,
    },
    DueDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Cancelled', 'Done'],
      default: 'Pending',
    },
  
    history: [
      {
        eventType: {
          type: String,
          enum: ['Scheduled', 'Rescheduled'],
          required: true,
        },
        eventDate: {
          type: Date,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        remarks: String,
      },
    ],
    rescheduleRequested: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

export default model('Task', taskSchema);
