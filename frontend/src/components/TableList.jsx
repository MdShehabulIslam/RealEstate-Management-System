import axios from "axios";
import { useState } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function TableList({
  handleOpen,
  tableData,
  setTableData,
  searchTerm,
  handleReset,
}) {
  let obj = new Date();
  let monthIndex = obj.getUTCMonth();
  let year = obj.getUTCFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = monthNames[monthIndex];

  const [error, setError] = useState(null);

  // Sort data by ID before filtering
  const sortedData = [...tableData].sort((a, b) => a.id - b.id);

  const filteredData = sortedData.filter((client) => {
    const rentStatusText = client.rent_status ? "Paid" : "Pending";

    const contactWithoutSpaces = client.contact.replace(/\s+/g, "");
    const searchTermWithoutSpaces = searchTerm
      .replace(/\s+/g, "")
      .toLowerCase();

    return (
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contactWithoutSpaces.includes(searchTermWithoutSpaces) ||
      client.house_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.postal_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rentStatusText.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/clients/${id}`);
        setTableData((prevData) =>
          prevData.filter((client) => client.id !== id)
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      <div className="relative z-0">
        <div className="overflow-x-auto m-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 text-start">
              <h2 className="text-xl font-bold ml-4">
                {month} {year}
              </h2>
            </div>
            <div>
              <button
                className="btn btn-error rounded-xl mr-4 flex items-center gap-2"
                onClick={async () => {
                  try {
                    const confirmReset = window.confirm(
                      "Are you sure you want to reset all rent statuses to 'Unpaid'? This action cannot be undone."
                    );
                    
                    if (confirmReset) {
                      const response = await axios.post(
                        "http://localhost:3000/api/clients/reset-rent-status"
                      );

                      if (response.status === 200 && Array.isArray(response.data)) {
                        // Update the table data with the response from the server
                        setTableData(response.data);
                        setError(null);
                        // Show success message
                        const successMessage = document.createElement('div');
                        successMessage.className = 'toast toast-top toast-end';
                        successMessage.innerHTML = `
                          <div class="alert alert-success">
                            <span>Successfully reset all rent statuses to Unpaid.</span>
                          </div>
                        `;
                        document.body.appendChild(successMessage);
                        setTimeout(() => successMessage.remove(), 3000);
                      } else {
                        setError("No tenants found to update.");
                      }
                    }
                  } catch (err) {
                    setError(err.response?.data?.message || "Failed to reset rent statuses. Please try again.");
                    // Show error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'toast toast-top toast-end';
                    errorMessage.innerHTML = `
                      <div class="alert alert-error">
                        <span>${err.response?.data?.message || "Failed to reset rent statuses. Please try again."}</span>
                      </div>
                    `;
                    document.body.appendChild(errorMessage);
                    setTimeout(() => errorMessage.remove(), 3000);
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Reset All
              </button>
            </div>
          </div>
        </div>

        <div className="px-4">
          {error && <div className="alert alert-error mb-4">{error}</div>}
          
          <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Tenant Name</th>
                  <th>Contact Info</th>
                  <th>Property Details</th>
                  <th>Monthly Rent</th>
                  <th className={"text-center"}>Rent Status ({month} {year})</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No tenants found matching your search
                    </td>
                  </tr>
                ) : (
                  filteredData.map((client) => (
                    <tr key={client.id} className="hover">
                      <td>{client.name}</td>
                      <td>
                        <div>{client.email}</div>
                        <div>{client.contact}</div>
                      </td>
                      <td>
                        <div>House: {client.house_no}</div>
                        <div>{client.street}</div>
                        <div>Postal: {client.postal_code}</div>
                      </td>
                      <td className={"text-center"}>${client.rent_amount}</td>
                      <td className="text-center">
                        <div 
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
                            client.rent_status 
                            ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200' 
                            : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                          }`}
                          onClick={async () => {
                            try {
                              const response = await axios.put(
                                `http://localhost:3000/api/clients/${client.id}`,
                                { ...client, rent_status: !client.rent_status }
                              );
                              if (response.status === 200) {
                                setTableData(prevData =>
                                  prevData.map(item =>
                                    item.id === client.id ? { ...item, rent_status: !item.rent_status } : item
                                  )
                                );
                              }
                            } catch (err) {
                              console.error("Error updating rent status:", err);
                            }
                          }}
                        >
                          <span className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                              client.rent_status 
                                ? 'bg-green-500' 
                                : 'bg-red-500'
                            }`} />
                            {client.rent_status ? 'Paid' : 'Unpaid'}
                          </span>
                        </div>
                      </td>
                      <td className="flex gap-2">
                        <button
                          onClick={() => handleOpen("edit", client)}
                          className="btn btn-warning rounded-xl w-15"
                        >
                          <BorderColorOutlinedIcon />
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="btn btn-error rounded-xl w-15"
                        >
                          <DeleteOutlineOutlinedIcon />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredData.map((client) => (
          <div key={client.id} className="bg-base-200 p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{client.name}</h3>
              <div 
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
                  client.rent_status 
                  ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200' 
                  : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    client.rent_status 
                      ? 'bg-green-500' 
                      : 'bg-red-500'
                  }`} />
                  {client.rent_status ? 'Paid' : 'Unpaid'}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-semibold">Email:</span> {client.email}</p>
              <p className="text-sm"><span className="font-semibold">Contact:</span> {client.contact}</p>
              <p className="text-sm"><span className="font-semibold">Address:</span> {client.house_no}, {client.street}</p>
              <p className="text-sm"><span className="font-semibold">Postal Code:</span> {client.postal_code}</p>
              <p className="text-sm"><span className="font-semibold">Rent Amount:</span> {client.rent_amount}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleOpen("edit", client)}
                className="btn btn-warning btn-sm rounded-xl flex-1"
              >
                Edit <BorderColorOutlinedIcon />
              </button>
              <button
                className="btn btn-error btn-sm rounded-xl flex-1"
                onClick={() => handleDelete(client.id)}
              >
                Delete <DeleteOutlineOutlinedIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
