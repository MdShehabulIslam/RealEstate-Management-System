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
  const [rent_amount, setAmount] = useState("");
  const [rent_status, setStatus] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!contact.trim()) newErrors.contact = "Contact number is required";
    if (!house_no.trim()) newErrors.house_no = "House number is required";
    if (!street.trim()) newErrors.street = "Street address is required";
    if (!postal_code.trim()) newErrors.postal_code = "Postal code is required";
    if (!rent_amount) newErrors.rent_amount = "Rent amount is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const clientData = {
        name,
        email,
        contact,
        house_no,
        street,
        postal_code,
        rent_amount: Number(rent_amount),
        rent_status,
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
    setErrors({});
  }, [mode, clientData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="relative transform overflow-hidden rounded-lg bg-base-200 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md text-gray-600 hover:text-gray-800 focus:outline-none text-2xl font-bold"
              onClick={onClose}
            >
              ×
            </button>
          </div>

          <div className="bg-base-200 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-2xl font-semibold leading-6 mb-6 text-primary">
                  {mode === "edit" ? "Edit Tenant Information" : "Add New Tenant"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-base-content mb-1">
                        Tenant Name
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered w-full bg-base-100 ${errors.name ? 'input-error' : 'focus:input-primary'}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter tenant name"
                      />
                      {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-base-content mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`input input-bordered w-full bg-base-100 ${errors.email ? 'input-error' : 'focus:input-primary'}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                      />
                      {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-base-content mb-1">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered w-full bg-base-100 ${errors.contact ? 'input-error' : 'focus:input-primary'}`}
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Enter contact number"
                      />
                      {errors.contact && <p className="text-error text-xs mt-1">{errors.contact}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-base-content mb-1">
                        House / Apartment No.
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered w-full bg-base-100 ${errors.house_no ? 'input-error' : 'focus:input-primary'}`}
                        value={house_no}
                        onChange={(e) => setHouseNum(e.target.value)}
                        placeholder="Enter house/apartment number"
                      />
                      {errors.house_no && <p className="text-error text-xs mt-1">{errors.house_no}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-base-content mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered w-full bg-base-100 ${errors.street ? 'input-error' : 'focus:input-primary'}`}
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Enter street address"
                      />
                      {errors.street && <p className="text-error text-xs mt-1">{errors.street}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-base-content mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered w-full bg-base-100 ${errors.postal_code ? 'input-error' : 'focus:input-primary'}`}
                        value={postal_code}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Enter postal code"
                      />
                      {errors.postal_code && <p className="text-error text-xs mt-1">{errors.postal_code}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-base-content mb-1">
                        Monthly Rent
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/70">
                          $
                        </span>
                        <input
                          type="number"
                          className={`input input-bordered w-full pl-7 bg-base-100 ${errors.rent_amount ? 'input-error' : 'focus:input-primary'}`}
                          value={rent_amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.rent_amount && <p className="text-error text-xs mt-1">{errors.rent_amount}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-base-content mb-1">
                        Rent Status
                      </label>
                      <select
                        value={rent_status ? "Paid" : "Unpaid"}
                        onChange={(e) => setStatus(e.target.value === "Paid")}
                        className="select select-bordered w-full bg-base-100 focus:select-primary"
                      >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end gap-3">
                    <button
                      type="button"
                      className="btn btn-outline btn-neutral hover:bg-base-300"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary hover:btn-primary-focus"
                    >
                      {mode === "edit" ? "Save Changes" : "Add Tenant"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
