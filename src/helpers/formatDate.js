import { format, formatDistanceToNow } from "date-fns";

export const formatDate = (date) => {
  return format(new Date(date), "P", { addSuffix: true });
};
