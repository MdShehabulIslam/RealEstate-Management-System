import { useState, useEffect } from "react";

export default function ModalForm({
  isOpen,
  onClose,
  mode,
  OnSubmit,
  clientData,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [house_no, setHouseNum] = useState("");
  const [street, setStreet] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [rent_amount, setAmount] = useState();
  const [rent_status, setStatus] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value === "Paid");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientData = {
        name,
        email,
        contact,
        house_no,
        street,
        postal_code,
        rent_amount: Number(rent_amount),
        rent_status: rent_status,
      };
      await OnSubmit(clientData);
      onClose();
    } catch (err) {
      console.error("Error adding client", err);
    }
  };

  useEffect(() => {
    if (mode === "edit" && clientData) {
      setName(clientData.name);
      setEmail(clientData.email);
      setContact(clientData.contact);
      setHouseNum(clientData.house_no);
      setStreet(clientData.street);
      setPostalCode(clientData.postal_code);
      setAmount(clientData.rent_amount);
      setStatus(clientData.rent_status);
    } else {
      setName("");
      setEmail("");
      setContact("");
      setHouseNum("");
      setStreet("");
      setPostalCode("");
      setAmount("");
      setStatus(false);
    }
  }, [mode, clientData]);

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "Edit Client" : "Client Details"}
          </h3>
          <form method="dialog" onSubmit={handleSubmit}>
            <label className="input input-bordered my-4 flex items-center gap-2">
              Name
              <input
                type="text"
                className="grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered my-4 flex items-center gap-2">
              Email
              <input
                type="text"
                className="grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered my-4 flex items-center gap-2">
              Contact
              <input
                type="text"
                className="grow"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </label>

            <label className="input input-bordered my-4 flex items-center gap-2">
              House / Apartment
              <input
                type="text"
                className="grow"
                value={house_no}
                onChange={(e) => setHouseNum(e.target.value)}
              />
            </label>

            <label className="input input-bordered my-4 flex items-center gap-2">
              Street
              <input
                type="text"
                className="grow"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </label>

            <label className="input input-bordered my-4 flex items-center gap-2">
              Postal Code
              <input
                type="text"
                className="grow"
                value={postal_code}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </label>

            <div className="flex mb-4 justify-between my-4">
              <label className="input input-bordered mr-4 flex items-center gap-2">
                Rent
                <input
                  type="number"
                  className="grow"
                  value={rent_amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>
              <select
                value={rent_status ? "Paid" : "Payment Pending"}
                className="select select-bordered w-full max-w-xs"
                onChange={handleStatusChange}
              >
                <option>Pending</option>
                <option>Paid</option>
              </select>
            </div>

            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>

            <button type="submit" className="btn btn-success">
              {" "}
              {mode === "edit" ? "Save Changes" : "Add Client"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
