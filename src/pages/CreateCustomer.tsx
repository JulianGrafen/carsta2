import React from "react";
import { useState } from "react";
import { Navbar } from "../components/navbar";

export function CreateCustomer() {
  const [name, setName] = useState("");
  const [kennzeichen, setKennzeichen] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Eingeliefert");
  const [dateOfCreation, setDateOfCreation] = useState(""); // State for date of creation
  const [artikelnummer, setArtikelnummer] = useState("");
  const [toggleError, setToggleError] = useState(true);

  ///TODO: Update function for updating the car status

  const validateEmail = (value: string) => {
    const isValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
    if (isValid === true) {
      setToggleError(false);
    } else {
      setToggleError(true);
      window.alert("E-Mail Adresse ist ungültig");
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Click");

    if (toggleError === false) {
      fetch("http://192.168.2.169:3002/customermail", {
        method: "POST",
        mode: "cors",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          kennzeichen,
          email,
          status,
          dateOfCreation,
        }),
      });
      window.alert("Kunde wurde gespeichert");

      setDateOfCreation(new Date().toISOString());

      await fetch("http://192.168.2.169:3002/createcustomer", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          kennzeichen,
          artikelnummer,
          email,
          status,
          dateOfCreation,
        }),
      });
    } else {
      window.alert("Bitte überprüfen Sie die Angaben.");
    }
  };
  return (
    <div className="mt-10 ml-10">
      <Navbar />
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="mt-5 mb-2 font-semibold" htmlFor="name">
          Name:
        </label>
        <input
          className="border rounded-lg p-2"
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label className="mt-5 mb-2 font-semibold" htmlFor="Kennzeichen">
          Modell:
        </label>
        <input
          className="border rounded-lg p-2"
          type="text"
          id="kennzeichen"
          value={kennzeichen}
          onChange={(event) => setKennzeichen(event.target.value)}
        />
        <label className="mt-5 mb-2 font-semibold" htmlFor="Artikelnummer">
          Artikelnummer:{" "}
        </label>
        <input
          className="border rounded-lg p-2"
          type="text"
          id="artikelnummer"
          value={artikelnummer}
          onChange={(event) => setArtikelnummer(event.target.value)}
        />
        <label className="mt-5 mb-2 font-semibold" htmlFor="email">
          E-Mail:
        </label>
        <input
          className="border rounded-lg p-2"
          type="text"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => validateEmail(email)}
        />
        <label className="mt-5 mb-2 font-semibold">Status:</label>
        <select
          className="border rounded-lg p-2"
          onChange={(event) => setStatus(event.target.value)}
        >
          <option selected value="Eingeliefert">
            Eingeliefert
          </option>
          <option value="Gecheckt">Gecheckt</option>
          <option value="Teile bestellt">Teile bestellt</option>
          <option value="Teile verbaut">Teile verbaut</option>
          <option value="Bereit zur Abholung">Bereit zur Abholung</option>
        </select>
        <button
          className="mt-4 bg-black text-white rounded-lg p-2"
          type="submit"
        >
          Speichern und E-Mail absenden
        </button>
      </form>
    </div>
  );
}
