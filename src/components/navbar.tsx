import React from "react";
import { Nav as NavbarBS, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
export function Navbar() {
  return (
    <div className="mb-5 flex justify-between">
      <div className="bg-white rounded">
        <Link to="/editcustomer">Kunden bearbeiten</Link>
      </div>
      <div className="bg-white rounded">
        <Link to="/createcustomer">Kunde erstellen</Link>
      </div>
    </div>
  );
}
