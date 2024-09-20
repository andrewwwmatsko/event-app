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

export default function MySelect({ setSearchParams, searchParams }) {
  const sortBy = searchParams.get("sortBy") ?? "";
  const sortOrder = searchParams.get("sortOrder") ?? "";

  const handleChangeSortBy = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };
  const handleChangeSortOrder = (e) => {
    searchParams.set("sortOrder", e.target.value);
    setSearchParams(searchParams);
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
            <span>Sort By</span>
          </MenuItem>
          <MenuItem value={sortByValues.title}>By title</MenuItem>
          <MenuItem value={sortByValues.date}>By date</MenuItem>
          <MenuItem value={sortByValues.organizer}>By organizer</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 180, marginBottom: "24px" }}>
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
            <span>Sort order</span>
          </MenuItem>
          <MenuItem value={sortOrderValues.asc}>a-Z</MenuItem>
          <MenuItem value={sortOrderValues.desc}>Z-a</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
