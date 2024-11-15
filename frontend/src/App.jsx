import { useState, useEffect } from "react";
import "./App.css";
import ModalForm from "./components/ModalForm";
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/clients");
      setTableData(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

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
      console.log("modal mode Add");
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

  // const handleReset = async () => {
  //   const confirmReset = window.confirm(
  //     "Are you sure you want to reset all rent statuses to 'Pending'?"
  //   );
  //   if (confirmReset) {
  //     try {
  //       // Call the backend to reset all statuses
  //       await axios.post("http://localhost:3000/api/clients/reset-rent-status");

  //       // Update the local state
  //       setTableData((prevData) =>
  //         prevData.map((client) => ({
  //           ...client,
  //           rent_status: "Pending", // Set rent_status to "Pending" (or false)
  //         }))
  //       );
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   }
  // };

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

  return (
    <div className="App">
      <NavBar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
      <TableList
        setTableData={setTableData}
        tableData={tableData}
        handleOpen={handleOpen}
        searchTerm={searchTerm}
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
  );
}

export default App;
