import React from "react";
import Status from "../components/Status";
import Card from "../components/Card";
import { Backlog } from "../utils/icons";

const GroupByUsers = ({ userTktMap, userCounter,  userDetsMap }) => {
  
  return (
    <>
      <div className={`grid-5`} style={{ margin: "0 5rem" }}>
        {Object.entries(userTktMap).map(([userId, tickets], index) => (
          <div key={index}>
            <Status
              status={`${userDetsMap[userId]?.name || "Unknown User"}`}
              imgSvg={Backlog}
              count={tickets.length}
              user="user"
            />
            {tickets.map((ticket) => (
              <Card key={ticket.id} data={ticket} status={true} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default GroupByUsers;