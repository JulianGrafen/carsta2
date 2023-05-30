import React from "react";
import { Nav as NavbarBS, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="mb-5 flex ">
      <div className="nav-link">
        <Link
          to="/editcustomer"
          className="tmt-4 bg-black text-white rounded-lg p-2"
        >
          Kunden bearbeiten
        </Link>
      </div>
      <div className="nav-link">
        <Link
          to="/createcustomer"
          className="text-white bg-black py-2 px-3 rounded-lg"
        >
          Kunde erstellen
        </Link>
      </div>
    </div>
  );
}
