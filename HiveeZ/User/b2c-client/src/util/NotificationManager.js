import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { generateToken } from "../firebase/messaging";
import { useUser } from '../context/user.context'
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/user.slice";

const checkPushManager = async () => {
  if (!("PushManager" in window)) {
    console.log("Push notification not supported");
    return;
  }
};

const checkNotificationSupport = async () => {
  if (!("Notification" in window)) {
    console.log("Notification API not supported");
    return;
  }
};

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then(function (registration) {
        console.log("[FCM SW]: SCOPE: ", registration.scope);
        return registration.scope;
      })
      .catch(function (err) {
        return err;
      });
  }
};

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  return permission !== "granted";
};

const checkAllPermissions = async () => {
  // await registerServiceWorker();
  await checkPushManager();
  await checkNotificationSupport();
};

const getCurrentLocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const useNotificationLogic = () => {
  const navigate = useNavigate();
  const {state} = useLocation()
  const [loading, setLoading] = useState(false);

  let token = null;

  const subscribeToNotifications = async (e) => {
    e?.preventDefault();
    const phone = e?.target?.phone?.value;
    console.log(phone);
    if (await requestNotificationPermission()) {
      console.log("Permission not granted");
      return;
    }
    console.log("Permission granted");
    try {
      setLoading(true);
      token = await generateToken();
      const { coords } = await getCurrentLocation();
      const location_info = {
        lat: coords.latitude,
        lon: coords.longitude,
      };
      console.log(location_info);
      const res = await axiosInstance.post(
        "/user/register",
        { token, phone, location_info },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      console.log("Subscribed to notifications");
      const notificationData = res.data.notification_data
      await new Promise(resolve => setTimeout(resolve, 2000));
      e?.target?.setAttribute("data-valid", "true");  
      navigate("/auth/verify", { state: { notificationData } });
    } catch (err) {
      console.log(err);
      console.log("Failed to subscribe");
      if (token === null) subscribeToNotifications(e);
    }
    finally {
      setLoading(false);
    }
  };

  const dispatch = useDispatch()

  const [otpVerified, setOtpVerified] = useState(false);

  const verifyOtp = async (otp) => {
    
    console.log(otp);
    
    const {user_id} = state?.notificationData
    
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "/user/verify",
        { user_id, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
        setOtpVerified(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(res);
      console.log("Verified OTP");
      console.log(state?.notificationData);
      dispatch(login(state?.notificationData))
      navigate("/");
    } catch (err) {
      console.log(err);
      console.log("Failed to verify OTP");
    }
    finally {
      setLoading(false);
      setOtpVerified(false);
    }
  }

    return { subscribeToNotifications, verifyOtp, loading, otpVerified };
};

export { checkAllPermissions, useNotificationLogic };