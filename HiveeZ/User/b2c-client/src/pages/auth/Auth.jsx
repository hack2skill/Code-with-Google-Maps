import { useNotificationLogic } from "../../util/NotificationManager";
import { LiaPhoneSolid } from "react-icons/lia";
import { Outlet } from "react-router-dom";
import Spinner from "../../components/Spinner";

const Auth = () => {
  const { subscribeToNotifications, loading } = useNotificationLogic();

  return (
    <main className="auth-screen">
      <h2>Log In or Sign Up</h2>
      <form data-valid="false" className="auth-form" onSubmit={subscribeToNotifications}>
        <div id="phone-input" className="input-div">
          <LiaPhoneSolid className="icon" />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            maxLength={10}
            required
          />
        </div>
        <button disabled={loading} type="submit">{loading ? <Spinner/> :  "Continue"}</button>
      </form>
      <Outlet />
    </main>
  );
};

export default Auth;
