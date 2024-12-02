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
        <div className="modal-box w-11/12 max-w-3xl p-4 sm:p-6">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="font-bold text-lg py-4">
              {mode === "edit" ? "Edit Tenant Information" : "Add New Tenant"}
            </h3>
            <form method="dialog" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="input input-bordered flex items-center gap-2">
                  Tenant Name
                  <input
                    type="text"
                    className="grow"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Email
                  <input
                    type="email"
                    className="grow"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Contact Number
                  <input
                    type="text"
                    className="grow"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  House / Apartment No.
                  <input
                    type="text"
                    className="grow"
                    value={house_no}
                    onChange={(e) => setHouseNum(e.target.value)}
                    required
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Street Address
                  <input
                    type="text"
                    className="grow"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Postal Code
                  <input
                    type="text"
                    className="grow"
                    value={postal_code}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="input input-bordered flex items-center gap-2">
                  Monthly Rent
                  <input
                    type="number"
                    className="grow"
                    value={rent_amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </label>
                <select
                  value={rent_status ? "Paid" : "Unpaid"}
                  className="select select-bordered w-full"
                  onChange={handleStatusChange}
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div className="modal-action flex justify-between mt-6">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  {mode === "edit" ? "Save Changes" : "Add Tenant"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
