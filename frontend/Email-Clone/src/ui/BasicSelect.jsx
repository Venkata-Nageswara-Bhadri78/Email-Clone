import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ setMailsSize }) {
  const [size, setSize] = React.useState("");

  const handleChange = (event) => {
    setSize(event.target.value);
    setMailsSize(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 140 }}>
      <FormControl
        fullWidth
        size="small"
        sx={{
          "& .MuiInputLabel-root": {
            fontSize: "0.85rem",
            color: "text.secondary",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "5px",
            backgroundColor: "white",
            "& fieldset": {
              borderColor: "grey.300",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: 1.5,
            },
          },
        }}
      >
        <InputLabel id="mailsize-label">Mails Size</InputLabel>
        <Select
          labelId="mailsize-label"
          id="mailsize"
          value={size}
          label="Mails Size"
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "5px",
                mt: 1,
                boxShadow: 3,
                "& .MuiMenuItem-root": {
                  fontSize: "0.9rem",
                  py: 0.7,
                },
              },
            },
          }}
        >
          {[...Array(11)].map((_, i) => {
            const val = i + 5;
            return (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
