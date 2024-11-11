import axios from "axios";
import { useState } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function TableList({
  handleOpen,
  tableData,
  setTableData,
  searchTerm,
}) {
  let obj = new Date();
  let monthIndex = obj.getUTCMonth(); // Month index (0 for January, 11 for December)
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

  const filteredData = tableData.filter((client) => {
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
      {error && <div className="alert alert-error">{error}</div>}

      <div className="overflow-x-auto m-4">
        <div className="flex justify-between items-center">
          <div className="flex-1 text-start">
            <h2 className="text-xl font-bold ml-4">
              {month} {year}
            </h2>
          </div>
          <div>
            <button className="btn btn-error rounded-xl mr-4">
              Reset <RestartAltIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>House / Apartment</th>
              <th>Street</th>
              <th>Postal Code</th>
              <th>Rent Amount</th>
              <th className={"text-center"}>Rent Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((client) => (
              <tr key={client.id} className="hover">
                <th>{client.id}</th>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.contact}</td>
                <td className={"text-center"}>{client.house_no}</td>
                <td>{client.street}</td>
                <td className={"text-center"}>{client.postal_code}</td>
                <td className={"text-center"}>{client.rent_amount}</td>
                <td>
                  <button
                    className={`btn rounded-full w-30 ${
                      client.rent_status
                        ? `btn-success w-full`
                        : `btn-outline btn-accent`
                    }`}
                  >
                    {client.rent_status ? "Paid" : "Pending"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleOpen("edit", client)}
                    className="btn btn-warning rounded-xl w-15"
                  >
                    Edit <BorderColorOutlinedIcon />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-error rounded-xl w-15"
                    onClick={() => handleDelete(client.id)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
