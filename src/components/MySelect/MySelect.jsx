import { FormControl, MenuItem, Select } from "@mui/material";

const sortByValues = {
  title: "title",
  date: "date",
  organizer: "organizer",
};
const sortOrderValues = {
  asc: "asc",
  desc: "desc",
};

export default function MySelect({
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
}) {
  const handleChangeSortBy = (e) => {
    setSortBy(e.target.value);
  };
  const handleChangeSortOrder = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      <FormControl sx={{ m: 1, minWidth: 208 }}>
        <Select
          value={sortBy}
          onChange={handleChangeSortBy}
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
          <MenuItem value={sortByValues.title}>By title</MenuItem>
          <MenuItem value={sortByValues.date}>By date</MenuItem>
          <MenuItem value={sortByValues.organizer}>By organizer</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120, marginBottom: "24px" }}>
        <Select
          value={sortOrder}
          onChange={handleChangeSortOrder}
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
          <MenuItem value={sortOrderValues.asc}>a-Z</MenuItem>
          <MenuItem value={sortOrderValues.desc}>Z-a</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
