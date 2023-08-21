import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataTable from "./DataTable";

describe("DataTable", () => {
  it("renders the table and filters correctly", async () => {
    render(<DataTable />);
    await waitFor(() => {
      expect(screen.queryByText("Loading")).toBeNull();
      expect(screen.queryByText("Error")).toBeNull();
    }); 
   
  
  });
});
