import { format } from "date-fns";

export const formatDate = (date) => {
  return format(new Date(date), "P", { addSuffix: true });
};

export const formatTime = (date) => {
  return format(new Date(date), "h a");
};
