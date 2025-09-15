import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PaginationItem from "@mui/material/PaginationItem";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export default function PaginationRounded({ count, onChange, defaultPage }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        variant='outlined'
        shape='rounded'
        defaultChecked={defaultPage}
        defaultPage={defaultPage}
        onChange={(e, page) => {
          onChange(page);
        }}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: IoChevronBackOutline,
              next: IoChevronForwardOutline,
            }}
            {...item}
            style={{
              backgroundColor: item.selected ? "transparent" : "transparent",
              borderColor: item.selected ? "#206645" : "#DFE3E8",
              // border: "none",
              color: item.selected ? "#206645" : "black",
            }}
          />
        )}
      />
    </Stack>
  );
}
