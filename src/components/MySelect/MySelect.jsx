import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const selectValues = {
  title: "title",
  date: "date",
  organizator: "organizator",
};

export default function MySelect() {
  const [sortBy, setSortBy] = useState("");

  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 208, marginBottom: "24px" }}>
      <Select
        value={sortBy}
        onChange={handleChange}
        displayEmpty
        sx={{
          fontFamily: "Inter",
          borderRadius: "100px",
          padding: "0 32px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#656565",
          },
        }}
      >
        <MenuItem value="">
          <em>-</em>
        </MenuItem>
        <MenuItem value={selectValues.title}>By title</MenuItem>
        <MenuItem value={selectValues.date}>By date</MenuItem>
        <MenuItem value={selectValues.organizator}>By organizator</MenuItem>
      </Select>
    </FormControl>
  );
}
