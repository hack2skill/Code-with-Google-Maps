import { messaging } from "./firebase";
import { getToken, onMessage } from 'firebase/messaging';

export const generateToken = async () => {
  const token = await getToken(messaging, {vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY});
  if(token) {
      console.log(token);
      onMessage(messaging, (message) => {
        console.log(message);
          console.log(
            'New foreground notification from Firebase Messaging!',
            message.notification
          );
          new Notification(message.notification.title, { body: message.notification.body });
        });
  }
  return token;
}