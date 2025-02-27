import React from "react";
import "./ExploreEvents.css";
import { event_list } from "../../assets/frontend_assets/assets";

const ExploreEvents = ({ category, setCategory }) => {
  return (
    <div className="explore-events" id="explore-events">
      <h1>Explore Our List Of Events</h1>
      <p className="explore-events-text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci natus
        nostrum id dolor incidunt voluptas, autem nobis corrupti tenetur cumque
        numquam enim omnis cum harum deserunt distinctio aut iste a?
      </p>
      <div className="explore-events-list">
        {event_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.event_name ? "All" : item.event_name
                )
              }
              key={index}
              className="explore-evets-list-items"
            >
              <img
                className={category === item.event_name ? "active" : ""}
                src={item.event_image}
                alt=""
              />
              <p>{item.event_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreEvents;
