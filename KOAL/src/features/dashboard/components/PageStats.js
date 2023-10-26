import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";

function PageStats({}) {
  return (
    <div className="stats bg-base-100 shadow">
      <div className="stat">
        <div className="stat-figure invisible md:visible">
          <HeartIcon className="w-8 h-8" />
        </div>
        <div className="stat-title">ETA</div>
        <div className="stat-value">6 hr 35 min</div>
        <div className="stat-desc">21% faster than last delivery</div>
      </div>

      <div className="stat">
        <div className="stat-figure invisible md:visible">
          <BoltIcon className="w-8 h-8" />
        </div>
        <div className="stat-title">Current Location</div>
        <div className="stat-value">Pranpur</div>
        <div className="stat-desc">Maharashtra, India</div>
      </div>
    </div>
  );
}

export default PageStats;
