import { useState } from "react";
import { EditCustomer } from "./pages/EditCustomer";
import { OverviewCustomer } from "./pages/OverviewCustomer";
import { Container } from "react-bootstrap";
import { CreateCustomer } from "./pages/CreateCustomer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <>
      <Container className="mb-10">
        <Router>
          <Routes>
            <Route path="*" element={<CreateCustomer />} />
            <Route path="/createcustomer" element={<CreateCustomer />} />
            <Route path="/EditCustomer" element={<EditCustomer />} />
            <Route
              path="/overviewcustomer/:name"
              element={<OverviewCustomer />}
            />
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;
