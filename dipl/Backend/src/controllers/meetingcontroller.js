import Meeting from '../models/meetingmodal.js'; 
import MeetingNotification from '../models/MeetingNotificatonModal.js';
import mongoose from 'mongoose';

// POST /api/meetings/assign
export async function assignMeeting(req, res) {
    try {
      const {
        meetingName,
        meetingDescription,
        meetingWith,
        meetingDate,
        meetingTime,
        selectedUsers,
      } = req.body;
      const hostedBy = req.user.id;
      // Validate that selectedUsers contains valid ObjectIds
      const validatedUsers = selectedUsers.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );

      const newMeeting = new Meeting({
        meetingName,
        meetingDescription,
        meetingWith,
        meetingDate,
        meetingTime,
        hostedBy,
        selectedUsers: validatedUsers,
      });

      await newMeeting.save();
      // Schedule notifications for the meeting
      const notificationTimes = calculateNotificationTimes(
        Meeting.meetingDate,
        Meeting.meetingTime
      );
      for (const time of notificationTimes) {
        await MeetingNotification.create({
          type: "Meeting_Reminder",
          message: `Reminder: "${
            Meeting.meetingName
          }" at ${time.toLocaleString()}`,
          recipient: Meeting._id, // or appropriate recipient field
        });
      }

      res.status(201).json({ message: "Meeting assigned successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

function calculateNotificationTimes(meetingDate, meetingTime) {
    const times = [];
    const meetingDateTime = new Date(`${meetingDate}T${meetingTime}`);
    const now = new Date();
    const timeDiff = meetingDateTime.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
  
    if (hoursDiff > 1) {
      for (let i = 1; i <= Math.floor(hoursDiff); i++) {
        times.push(new Date(meetingDateTime.getTime() - i * 60 * 60 * 1000));
      }
    }
    if (hoursDiff <= 1) {
      for (let i = 5; i <= Math.floor(hoursDiff * 60); i += 5) {
        times.push(new Date(meetingDateTime.getTime() - i * 60 * 1000));
      }
    }
    return times;
  }

export async function getMeetings(req, res) {
    try {
        const authenticatedUserId = req.user.id;
        const isAdmin = req.user.isAdmin;

        let meetings;

        if (isAdmin) {
            meetings = await Meeting.find()
                .populate('hostedBy', 'name')
                .populate('selectedUsers', 'name');
        } else {
            meetings = await Meeting.find({
                $or: [
                    { hostedBy: authenticatedUserId },
                    { selectedUsers: authenticatedUserId }
                ]
            })
            .populate('hostedBy', 'name')
            .populate('selectedUsers', 'name');
        }
        res.json(meetings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


export async function getNotifications(req, res) {
    try {
      //console.log("in Notification");
      const notifications = await MeetingNotification.find({ recipient: req.user.id });
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
  };

export async function deleteMeeting(req, res) {
    try {
        const meetingId = req.params.id;
        const authenticatedUserId = req.user.id;
        const isAdmin = req.user.isAdmin;

        const meeting = await Meeting.findById(meetingId);

        if (!meeting) {
            return res.status(404).json({ msg: 'Meeting not found' });
        }

        if (!isAdmin && meeting.hostedBy.toString() !== authenticatedUserId) {
            return res.status(403).json({ msg: 'Access denied. Only admins or the creator can delete meetings.' });
        }

        await Meeting.deleteOne({ _id: meetingId });

        res.json({ msg: 'Meeting successfully deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
