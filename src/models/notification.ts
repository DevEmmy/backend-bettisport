import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  message: string;
  read: boolean;
}

const notificationSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

const Notification = mongoose.model<INotification>('Notification', notificationSchema);

export default  Notification;
