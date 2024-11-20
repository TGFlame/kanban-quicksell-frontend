import { UrgentPriority, HighPriority, MediumPriority, LowPriority, NoPriority } from "./icons";

export const priorityIcons = {
  4: UrgentPriority,   
  3: HighPriority,      
  2: MediumPriority,    
  1: LowPriority,       
  0: NoPriority       
};

export const getPriorityIcon = (priority) => {
  return priorityIcons[priority] || NoPriority;
};