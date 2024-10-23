import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Importing icons
import displayIcon from "./icons_FEtask/Display.svg"; // Display icon
import todoIcon from "./icons_FEtask/To-do.svg"; // To-do icon
import inProgressIcon from "./icons_FEtask/in-progress.svg"; // In Progress icon
import backlogIcon from "./icons_FEtask/Backlog.svg"; // Backlog icon
import doneIcon from "./icons_FEtask/Done.svg"; // Done icon
import urgentIcon from "./icons_FEtask/SVG - Urgent Priority colour.svg"; // Urgent icon
import highPriorityIcon from "./icons_FEtask/Img - High Priority.svg"; // High priority icon
import mediumPriorityIcon from "./icons_FEtask/Img - Medium Priority.svg"; // Medium priority icon
import lowPriorityIcon from "./icons_FEtask/Img - Low Priority.svg"; // Low priority icon
import noPriorityIcon from "./icons_FEtask/No-priority.svg"; // No priority icon
import moreOptionsIcon from "./icons_FEtask/add.svg"; // More options icon
import addIcon from "./icons_FEtask/add.svg"; // Add icon

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch tickets and users from the API
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching the data!", error);
      });
  }, []);

  const groupTickets = (tickets, groupBy) => {
    return tickets.reduce((groups, ticket) => {
      const key = groupBy === "user" ? ticket.userId : ticket.status;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(ticket);
      return groups;
    }, {});
  };

  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortBy === "priority") {
        return b.priority - a.priority;
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const groupedTickets = groupTickets(tickets, groupBy);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to get priority icon
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return urgentIcon;
      case 3:
        return highPriorityIcon;
      case 2:
        return mediumPriorityIcon;
      case 1:
        return lowPriorityIcon;
      case 0:
        return noPriorityIcon;
      default:
        return noPriorityIcon; // Default to no priority if not recognized
    }
  };

  // Function to get user's name by ID
  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown User";
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Todo":
        return todoIcon;
      case "In progress":
        return inProgressIcon;
      case "Backlog":
        return backlogIcon;
      case "Done":
        return doneIcon;
      default:
        return null; // No icon for unknown status
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="display-control" onClick={toggleDropdown}>
          <img src={displayIcon} alt="Display" className="display-icon" />
          <span>Display</span>
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="form-control">
              <label>Grouping</label>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="form-control">
              <label>Ordering</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </header>

      <div className="kanban-board">
        {groupBy === "user"
          ? Object.keys(groupedTickets).map((userId) => {
              const userName = getUserName(userId); // Get username for the grouped user
              return (
                <div className="kanban-column" key={userId}>
                  <div className="ticket-header">
                    <span className="ticket-user">{userName}</span>
                    <img
                      src={moreOptionsIcon}
                      alt="More options"
                      className="more-options"
                    />
                  </div>
                  {sortTickets(groupedTickets[userId]).map((ticket) => (
                    <div key={ticket.id} className="ticket-card">
                      <h5 className="ticket-title">{ticket.title}</h5>
                      <div className="priority-bar">
                        <img
                          src={getPriorityIcon(ticket.priority)}
                          alt="Priority"
                          className="priority-icon"
                        />
                        <span>
                          {ticket.priority === 0
                            ? "No priority"
                            : `Priority ${ticket.priority}`}
                        </span>
                      </div>
                      <div className="ticket-status">
                        <img
                          src={getStatusIcon(ticket.status)}
                          alt="Status"
                          className="status-icon"
                        />
                        <span>{ticket.status}</span>
                      </div>
                    </div>
                  ))}
                  <img src={addIcon} alt="Add" className="add-icon" />
                </div>
              );
            })
          : Object.keys(groupedTickets).map((group) => (
              <div className="kanban-column" key={group}>
                <div className="kanban-header">
                  <img
                    src={getStatusIcon(group)} // Using the status icon
                    alt={group}
                  />
                  <span>{group.charAt(0).toUpperCase() + group.slice(1)}</span>
                </div>
                {sortTickets(groupedTickets[group]).map((ticket) => (
                  <div key={ticket.id} className="ticket-card">
                    <div className="ticket-header">
                      <span className="ticket-user">
                        {getUserName(ticket.userId)}
                      </span>
                      <img
                        src={moreOptionsIcon}
                        alt="More options"
                        className="more-options"
                      />
                    </div>
                    <h5 className="ticket-title">{ticket.title}</h5>
                    <div className="priority-bar">
                      <img
                        src={getPriorityIcon(ticket.priority)}
                        alt="Priority"
                        className="priority-icon"
                      />
                      <span>
                        {ticket.priority === 0
                          ? "No priority"
                          : `Priority ${ticket.priority}`}
                      </span>
                    </div>
                    <div className="ticket-status">
                      <img
                        src={getStatusIcon(ticket.status)}
                        alt="Status"
                        className="status-icon"
                      />
                      <span>{ticket.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
      </div>
    </div>
  );
};

export default App;
