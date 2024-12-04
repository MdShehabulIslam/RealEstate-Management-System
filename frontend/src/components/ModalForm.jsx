import { useState, useEffect } from "react";

export default function ModalForm({
  isOpen,
  onClose,
  OnSubmit,
  mode,
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
      console.error("Error submitting form:", err);
      setErrors({ submit: err.message });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-primary/5 px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-primary">
              {mode === "edit" ? "Edit Tenant Information" : "Add New Tenant"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 gap-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h4 className="font-semibold text-gray-800 border-b pb-2">Personal Information</h4>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold text-gray-700">Tenant Name</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full bg-white focus:bg-white ${errors.name ? 'input-error' : ''}`}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter tenant's full name"
                />
                {errors.name && <span className="text-error text-sm mt-1">{errors.name}</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold text-gray-700">Email Address</span>
                </label>
                <input
                  type="email"
                  className={`input input-bordered w-full bg-white focus:bg-white ${errors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
                {errors.email && <span className="text-error text-sm mt-1">{errors.email}</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold text-gray-700">Contact Number</span>
                </label>
                <input
                  type="tel"
                  className={`input input-bordered w-full bg-white focus:bg-white ${errors.contact ? 'input-error' : ''}`}
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="Enter contact number"
                />
                {errors.contact && <span className="text-error text-sm mt-1">{errors.contact}</span>}
              </div>
            </div>

            {/* Property & Payment Information */}
            <div className="space-y-6">
              <h4 className="font-semibold text-gray-800 border-b pb-2">Property & Payment Details</h4>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold text-gray-700">House/Apartment No.</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full bg-white focus:bg-white ${errors.house_no ? 'input-error' : ''}`}
                  value={formData.house_no}
                  onChange={(e) => setFormData({ ...formData, house_no: e.target.value })}
                  placeholder="Enter house/apartment number"
                />
                {errors.house_no && <span className="text-error text-sm mt-1">{errors.house_no}</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold text-gray-700">Street Address</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full bg-white focus:bg-white ${errors.street ? 'input-error' : ''}`}
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="Enter street address"
                />
                {errors.street && <span className="text-error text-sm mt-1">{errors.street}</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold text-gray-700">Postal Code</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full bg-white focus:bg-white ${errors.postal_code ? 'input-error' : ''}`}
                  value={formData.postal_code}
                  onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                  placeholder="Enter postal code"
                />
                {errors.postal_code && <span className="text-error text-sm mt-1">{errors.postal_code}</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-semibold text-gray-700">Monthly Rent</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    className={`input input-bordered w-full pl-7 bg-white focus:bg-white ${errors.rent_amount ? 'input-error' : ''}`}
                    value={formData.rent_amount}
                    onChange={(e) => setFormData({ ...formData, rent_amount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                {errors.rent_amount && <span className="text-error text-sm mt-1">{errors.rent_amount}</span>}
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-4">
                  <span className="label-text text-base font-semibold text-gray-700">Rent Status</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={formData.rent_status}
                    onChange={(e) => setFormData({ ...formData, rent_status: e.target.checked })}
                  />
                  <span className={`text-sm ${formData.rent_status ? 'text-success' : 'text-error'}`}>
                    {formData.rent_status ? 'Paid' : 'Pending'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Error */}
          {errors.submit && (
            <div className="alert alert-error mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errors.submit}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t sticky bottom-0 bg-white px-4 pb-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline btn-error hover:bg-error hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {mode === "add" ? "Add Tenant" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
