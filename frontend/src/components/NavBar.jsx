import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HomeIcon from "@mui/icons-material/Home";

export default function NavBar({ onOpen, onSearch, handleLogout }) {
  const handleLogoutClick = async () => {
    try {
      await handleLogout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 sm:px-8">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-primary">
          Tenant Manager
        </h1>
      </div>
      
      <div className="flex-none gap-4">
        <div className="form-control relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search tenants..."
              className="search-input"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            className="add-tenant-btn"
            onClick={onOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Tenant
          </button>
          
          <button
            onClick={handleLogoutClick}
            className="btn btn-ghost hover:bg-base-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
