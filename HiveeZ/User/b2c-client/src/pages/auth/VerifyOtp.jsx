import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OTPInput from "otp-input-react";
import { useNotificationLogic } from "../../util/NotificationManager";
import Spinner from "../../components/Spinner";
import OtpVerifiedIcon from "../../assets/otp_verified.svg";

function VerifyOtp() {
  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.notificationData) {
      navigate('/auth')
    }
  }, [state]);

  const { verifyOtp, loading, otpVerified } = useNotificationLogic();

  const [OTP, setOTP] = useState("");

  return (
    <>
      {!otpVerified && <p className="otp-prompt">We've sent an OTP.</p>}
      <form
        className="auth-form"
        id="otp-form"
        data-valid={otpVerified ? "true" : "false"}
        onSubmit={(e) => {
          e.preventDefault();
          verifyOtp(OTP);
        }}
      >
        <OTPInput
          value={OTP}
          onChange={setOTP}
          autoFocus
          OTPLength={6}
          otpType="number"
          disabled={loading}
        />
        {!otpVerified && (
          <>
            <p id="resend-otp-prompt" className="otp-prompt">
              Didn't get the OTP? <button className="anchor">Resend OTP</button>
            </p>
            <button disabled={loading} type="submit">
              {loading ? <Spinner /> : "Finish Set Up"}
            </button>
          </>
        )}
      </form>
      {otpVerified && <img src={OtpVerifiedIcon} />}
    </>
  );
}

export default VerifyOtp;
