import './App.css';
import { useEffect, useState } from 'react'
import axios from "axios";
import DisplayBar from './components/DisplayBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GroupByStatus from './pages/GroupByStatus';
import GroupByPriority from './pages/GroupByPriority';
import GroupByUsers from './pages/GroupByUsers';
import SortByPriority from './pages/SortByPriority';
import SortByTitle from './pages/SortByTitle';

function App() {
 
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const [userCounter, setuserCounter] = useState(0);
  const [userDetsMap,setuserDetsMap] = useState({});
  const [userTktMap,setuserTktMap] = useState({});
 
  const [statusCounters,setStatusCounters] = useState(
  {
    todo: 0,
    inprogress: 0,
    backlog: 0,
    done: 0,
    cancelled: 0,
 });

  const [groupedStatusTickets, setGroupedStatusTickets] = useState({
  todo: [],
  inprogress: [],
  backlog: [],
  done: [],
  cancelled: [],
});

 
  const [priorityCounters,setPriorityCounters] = useState(
  {
    urgent: 0,
    high: 0,
    medium: 0,
    low: 0,
    noPriority: 0,
  }
 );
  const [groupedPriorityTickets, setGroupedPriorityTickets] = useState({
  urgent: [],
  high: [],
  medium: [],
  low: [],
  noPriority: [],
});

  const [sortTitle, setSortTitle] = useState([]);
  

  const fetchTicketsandUsers = async () => {
  try {
    const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
    setTickets(response.data.tickets);
    setUsers(response.data.users);
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
};
  
  const groupAndSortTickets = () => {
    const counts = {
    todo: 0,
    inprogress: 0,
    backlog: 0,
    done: 0,
    cancelled: 0,
  };

    const grouped = {
    todo: [],
    inprogress: [],
    backlog: [],
    done: [],
    cancelled: [],
  };

    const groupByPriority = {
    urgent: [],
    high: [],
    medium: [],
    low: [],
    noPriority: [],
  };
  const priorityCounts = {
    urgent: 0,
    high: 0,
    medium: 0,
    low: 0,
    noPriority: 0,
  };
  tickets.forEach((ticket) =>
  {
    const normalStatus = ticket.status === "In progress" ? "inprogress" : ticket.status.toLowerCase();

  if (counts.hasOwnProperty(normalStatus)) {
    counts[normalStatus]++;
    grouped[normalStatus].push(ticket);
  }
  if(ticket.priority===0)
    {
      priorityCounts.noPriority++;
      groupByPriority.noPriority.push(ticket);
    }
  else if(ticket.priority===1)
    {
        priorityCounts.low++;
        groupByPriority.low.push(ticket);
    }
  else if(ticket.priority===2)
    {
      priorityCounts.medium++;
      groupByPriority.medium.push(ticket);
    } 
    else if(ticket.priority===3)
    {
      priorityCounts.high++;
      groupByPriority.high.push(ticket);
    }
    else if(ticket.priority===4)
    {
      priorityCounts.urgent++;
      groupByPriority.urgent.push(ticket);
    } 
    else
    {
      console.log("null priority");
    }
  })
  setStatusCounters(counts);
  setGroupedStatusTickets(grouped);
  setPriorityCounters(priorityCounters);
  setGroupedPriorityTickets(groupByPriority);
  const sorted = tickets.sort((a, b) => a.title.localeCompare(b.title));
  setSortTitle(sorted);
};


 useEffect(()=>
  {
    fetchTicketsandUsers()
  },[]);

  useEffect(() => {
    groupAndSortTickets();
  }, [tickets,users]); 
  
  useEffect(() => {
    const userMap = {};
    const userDetails = {};
    const populatedTickets = tickets.map((ticket) => {
      const user = users.find((user) => user.id === ticket.userId);
      return {
        ...ticket,
        user: user
          ? { id: user.id, name: user.name, available: user.available }
          : null,
      };
    });
    populatedTickets.forEach((ticket) => {
      const userId = ticket.userId;
      const user = users.find((user) => user.id === ticket.userId);
  
      if (user) {
        userDetails[user.id] = { id: user.id, name: user.name };
      }
  
      if (!userMap[userId]) {
        userMap[userId] = [];
      }
      userMap[userId].push(ticket);
    });
  
    setuserCounter(Object.keys(userMap).length);
    setuserDetsMap(userDetails);
    setuserTktMap(userMap);
  }, [users]);
  


 


  return (
    <>
    <BrowserRouter>
        <DisplayBar />
        <Routes>
          <Route
            path="/"
            element={
              <GroupByStatus
                statusCounters={statusCounters}
                groupedStatusTickets={groupedStatusTickets}
              />
            }
          />
          <Route
            path="/priority"
            element={
              <GroupByPriority
                priorityCounts={priorityCounters}
                groupedPriorityTickets={groupedPriorityTickets}
              />
            }
          />
          <Route
            path="/users"
            element={
              <GroupByUsers
                userCounter={userCounter}
                userTktMap={userTktMap}
                userDetsMap={userDetsMap}
              />
            }
          />
          <Route
            path="/sort/priority"
            element={
              <SortByPriority
                priorityCounters={priorityCounters}
                groupedPriorityTickets={groupedPriorityTickets}
              />
            }
          />
          <Route
            path="/sort/title"
            element={
              <SortByTitle statusCounters={statusCounters} sortTitle={sortTitle} />
            }
          />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;

