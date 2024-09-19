import { toast } from "react-hot-toast";

export const makeToast = (text, icon) => {
  toast(text, {
    icon: icon,
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};

export const failedToast = (text) => {
  toast.error(text);
};
