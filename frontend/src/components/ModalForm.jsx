import { useState, useEffect } from "react";

export default function ModalForm({
  isOpen,
  onClose,
  mode,
  OnSubmit,
  clientData,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    house_no: "",
    street: "",
    postal_code: "",
    rent_amount: "",
    rent_status: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.contact.trim()) newErrors.contact = "Contact number is required";
    if (!formData.house_no.trim()) newErrors.house_no = "House number is required";
    if (!formData.street.trim()) newErrors.street = "Street address is required";
    if (!formData.postal_code.trim()) newErrors.postal_code = "Postal code is required";
    if (!formData.rent_amount) newErrors.rent_amount = "Rent amount is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await OnSubmit(formData);
      onClose();
    } catch (err) {
      console.error("Error adding client", err);
    }
  };

  useEffect(() => {
    if (mode === "edit" && clientData) {
      setFormData(clientData);
    } else {
      setFormData({
        name: "",
        email: "",
        contact: "",
        house_no: "",
        street: "",
        postal_code: "",
        rent_amount: "",
        rent_status: false,
      });
    }
    setErrors({});
  }, [mode, clientData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              {mode === "edit" ? "Edit Tenant Information" : "Add New Tenant"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Tenant Name</span>
              </label>
              <input
                type="text"
                required
                className={`input input-bordered w-full focus:ring-2 focus:ring-blue-500 ${errors.name ? 'input-error' : ''}`}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Email</span>
              </label>
              <input
                type="email"
                required
                className={`input input-bordered w-full focus:ring-2 focus:ring-blue-500 ${errors.email ? 'input-error' : ''}`}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Contact Number</span>
              </label>
              <input
                type="tel"
                required
                className={`input input-bordered w-full focus:ring-2 focus:ring-blue-500 ${errors.contact ? 'input-error' : ''}`}
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
              />
              {errors.contact && <p className="text-error text-xs mt-1">{errors.contact}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">House / Apartment No.</span>
              </label>
              <input
                type="text"
                required
                className={`input input-bordered w-full focus:ring-2 focus:ring-blue-500 ${errors.house_no ? 'input-error' : ''}`}
                value={formData.house_no}
                onChange={(e) =>
                  setFormData({ ...formData, house_no: e.target.value })
                }
              />
              {errors.house_no && <p className="text-error text-xs mt-1">{errors.house_no}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Street Address</span>
              </label>
              <input
                type="text"
                required
                className={`input input-bordered w-full focus:ring-2 focus:ring-blue-500 ${errors.street ? 'input-error' : ''}`}
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
              />
              {errors.street && <p className="text-error text-xs mt-1">{errors.street}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Postal Code</span>
              </label>
              <input
                type="text"
                required
                className={`input input-bordered w-full focus:ring-2 focus:ring-blue-500 ${errors.postal_code ? 'input-error' : ''}`}
                value={formData.postal_code}
                onChange={(e) =>
                  setFormData({ ...formData, postal_code: e.target.value })
                }
              />
              {errors.postal_code && <p className="text-error text-xs mt-1">{errors.postal_code}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Monthly Rent</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/70">
                  $
                </span>
                <input
                  type="number"
                  required
                  className={`input input-bordered w-full pl-7 focus:ring-2 focus:ring-blue-500 ${errors.rent_amount ? 'input-error' : ''}`}
                  value={formData.rent_amount}
                  onChange={(e) =>
                    setFormData({ ...formData, rent_amount: e.target.value })
                  }
                />
              </div>
              {errors.rent_amount && <p className="text-error text-xs mt-1">{errors.rent_amount}</p>}
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text font-medium text-gray-700">Rent Status</span>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={formData.rent_status}
                  onChange={(e) =>
                    setFormData({ ...formData, rent_status: e.target.checked })
                  }
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white border-none"
            >
              {mode === "edit" ? "Save Changes" : "Add Tenant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
