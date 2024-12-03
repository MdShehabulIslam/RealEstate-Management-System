import { useState, useEffect } from "react";
import "./App.css";
import ModalForm from "./components/ModalForm";
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import Login from "./components/Login";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/clients");
      setTableData(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchClients();
    }
  }, [isLoggedIn]);

  const handleOpen = (mode, client) => {
    setClientData(client);
    setModalMode(mode);
    setIsOpen(true);
  };

  const handleSubmit = async (newClientData) => {
    if (modalMode === "add") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/clients",
          newClientData
        );
        console.log("Client added:", response.data);
        setTableData((prevData) => [...prevData, response.data]);
      } catch (error) {
        console.error("Error adding client:", error);
      }
    } else {
      console.log("Updating client with ID:", clientData.id);
      try {
        const response = await axios.put(
          `http://localhost:3000/api/clients/${clientData.id}`,
          newClientData
        );
        console.log("Client updated:", response.data);
        setTableData((prevData) =>
          prevData.map((client) =>
            client.id === clientData.id ? response.data : client
          )
        );
      } catch (error) {
        console.error("Error updating client:", error);
      }
    }
  };

  const handleReset = async () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all rent statuses to 'Pending'?"
    );
    if (confirmReset) {
      try {
        // Step 1: Reset rent statuses on the backend
        await axios.post("http://localhost:3000/api/clients/reset-rent-status");

        // Step 2: Fetch the updated data from the backend
        const response = await axios.get("http://localhost:3000/api/clients");

        // Step 3: Update the local state with the updated data from the backend
        setTableData(response.data);

        alert("Rent statuses have been reset.");
      } catch (err) {
        setError(err.message);
        alert("Failed to reset rent statuses.");
      }
    }
  };

  const handleLogin = (email, password) => {
    const validEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === validEmail && password === validPassword) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setTableData([]);
    setSearchTerm("");
    setIsOpen(false);
    setModalMode("add");
    setClientData(null);
    setError(null);
  };

  return (
    <div className="App min-h-screen bg-base-200">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <NavBar 
            onOpen={() => handleOpen("add")} 
            onSearch={setSearchTerm} 
            handleLogout={handleLogout}
          />
          <div className="container mx-auto px-4">
            <TableList
              setTableData={setTableData}
              tableData={tableData}
              handleOpen={handleOpen}
              searchTerm={searchTerm || ""}
              handleReset={handleReset}
            />
            <ModalForm
              isOpen={isOpen}
              OnSubmit={handleSubmit}
              onClose={() => setIsOpen(false)}
              mode={modalMode}
              clientData={clientData}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
