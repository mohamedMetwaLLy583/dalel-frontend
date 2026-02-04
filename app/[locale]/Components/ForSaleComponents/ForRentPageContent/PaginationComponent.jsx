"use client";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";

export default function PaginationComponent({
  locale,
  currentPage,
  totalPages,
  handlePageChange, // Accept handlePageChange as a prop
}) {
  const router = useRouter();

  const isRTL = locale === "ar";

  return (
    <Stack spacing={1}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange} // Call the passed function on page change
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            components={{
              previous: () => (
                <span
                  style={{
                    backgroundColor: "#dedede",
                    color: "#766b83",
                    width: "80px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    padding: "3px",
                    fontSize: "12px",
                  }}
                >
                  {!isRTL ? <>Previous</> : <>السابق</>}
                </span>
              ),
              next: () => (
                <span
                  style={{
                    backgroundColor: "#18ad8f",
                    color: "#fff",
                    width: "80px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    padding: "3px",
                    fontSize: "12px",
                  }}
                >
                  {!isRTL ? <>Next</> : <>التالي</>}
                </span>
              ),
            }}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#18ad8f",
                color: "#fff",
              },
              "&:not(.Mui-selected)": {
                backgroundColor: "transparent",
                color: "#18ad8f",
              },
            }}
          />
        )}
      />
    </Stack>
  );
}
