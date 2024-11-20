import { Backlog, Done, InProgress } from "./icons";

export const statusOf = [InProgress, Done, Backlog];

export const getStatus = () => {
  return statusOf[Math.floor(Math.random() * statusOf.length)];
};