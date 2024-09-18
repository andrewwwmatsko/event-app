import { TextField } from "@mui/material";

export default function Filter() {
  return (
    <TextField
      id="outlined-controlled"
      label="Search"
      value=""
      onChange={() => {}}
      sx={{
        display: "block",
        width: "200px",
        margin: "0 auto",
        marginBottom: "20px",
      }}
    />
  );
}
