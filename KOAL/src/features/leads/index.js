import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteLead, getLeadsContent } from "./leadSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Add New Lead",
        bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewLeadModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Leads() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleClick() {
    navigate("/dashboard");
  }
  useEffect(() => {
    dispatch(getLeadsContent());
  }, []);

  const getDummyStatus = (index) => {
    if (index % 5 === 0) return <div className="badge">Not Interested</div>;
    else if (index % 5 === 1)
      return <div className="badge badge-primary">In Progress</div>;
    else if (index % 5 === 2)
      return <div className="badge badge-secondary">Sold</div>;
    else if (index % 5 === 3)
      return <div className="badge badge-accent">Need Followup</div>;
    else return <div className="badge badge-ghost">Open</div>;
  };

  const deleteCurrentLead = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this lead?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Trucks"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="flex bg-red gap-3">
          <div className="card rounded w-96 bg-base-100 shadow-xl mb-3">
            <figure>
              <img
                src="https://images.pexels.com/photos/11087837/pexels-photo-11087837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Truck 1"
              />
            </figure>
            <div className="flex">
              <div>
                <div className="card-body">
                  <h2 className="card-title">Truck</h2>
                  <p>Online</p>
                </div>
              </div>
              <div>
                <div className="card-actions mt-10">
                  <Link to="/app/dashboard">
                    <button className="btn btn-primary">Open</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card rounded w-96 bg-base-100 shadow-xl mb-3">
            <figure>
              <img
                src="https://images.pexels.com/photos/11087837/pexels-photo-11087837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Truck 1"
              />
            </figure>
            <div className="flex">
              <div>
                <div className="card-body">
                  <h2 className="card-title">Truck</h2>
                  <p>Online</p>
                </div>
              </div>
              <div>
                <div className="card-actions mt-10">
                  <Link to="/app/dashboard">
                    <button className="btn btn-primary">Open</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card rounded w-96 bg-base-100 shadow-xl mb-3">
            <figure>
              <img
                src="https://images.pexels.com/photos/11087837/pexels-photo-11087837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Truck 1"
              />
            </figure>
            <div className="flex">
              <div>
                <div className="card-body">
                  <h2 className="card-title" onClick={handleClick}>
                    Truck
                  </h2>
                  <p>Online</p>
                </div>
              </div>
              <div>
                <div className="card-actions mt-10">
                  <Link to="/app/dashboard">
                    <button className="btn btn-primary">Open</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card rounded w-96 bg-base-100 shadow-xl mb-3">
            <figure>
              <img
                src="https://images.pexels.com/photos/11087837/pexels-photo-11087837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Truck 1"
              />
            </figure>
            <div className="flex">
              <div>
                <div className="card-body">
                  <h2 className="card-title" onClick={handleClick}>
                    Truck
                  </h2>
                  <p>Online</p>
                </div>
              </div>
              <div>
                <div className="card-actions mt-10">
                  <Link to="/app/dashboard">
                    <button className="btn btn-primary">Open</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TitleCard>
      <TitleCard
        title="Trains"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="flex bg-red gap-3">
          <div className="card rounded w-96 bg-base-100 shadow-xl mb-3">
            <figure>
              <img
                src="https://images.pexels.com/photos/11560608/pexels-photo-11560608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Train 1"
              />
            </figure>
            <div className="flex">
              <div>
                <div className="card-body">
                  <h2 className="card-title">Train</h2>
                  <p>Online</p>
                </div>
              </div>
              <div>
                <div className="card-actions mt-10">
                  <Link to="/app/dashboard">
                    <button className="btn btn-primary">Open</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card rounded w-96 bg-base-100 shadow-xl mb-3">
            <figure>
              <img
                src="https://images.pexels.com/photos/14269125/pexels-photo-14269125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Train 2"
              />
            </figure>
            <div className="flex">
              <div>
                <div className="card-body">
                  <h2 className="card-title">Train</h2>
                  <p>Online</p>
                </div>
              </div>
              <div>
                <div className="card-actions mt-10">
                  <Link to="/app/dashboard">
                    <button className="btn btn-primary">Open</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card rounded w-96 bg-base-100 shadow-xl mb-3">
            <figure>
              <img
                src="https://images.pexels.com/photos/11560608/pexels-photo-11560608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Train 3"
              />
            </figure>
            <div className="flex">
              <div>
                <div className="card-body">
                  <h2 className="card-title">Train</h2>
                  <p>Online</p>
                </div>
              </div>
              <div>
                <div className="card-actions mt-10">
                  <Link to="/app/dashboard">
                    <button className="btn btn-primary">Open</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card rounded w-96 bg-base-100 shadow-xl mb-3">
            <figure>
              <img
                src="https://images.pexels.com/photos/11560608/pexels-photo-11560608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Train 4"
              />
            </figure>
            <div className="flex">
              <div>
                <div className="card-body">
                  <h2 className="card-title">Train</h2>
                  <p>Online</p>
                </div>
              </div>
              <div>
                <div className="card-actions mt-10">
                  <Link to="/app/dashboard">
                    <button className="btn btn-primary">Open</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default Leads;
