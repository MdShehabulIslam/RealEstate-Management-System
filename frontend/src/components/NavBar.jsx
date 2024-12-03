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
    <>
      <div className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Tenant Management System</h1>
        </div>
        <div className="flex-none gap-4">
          <div className="form-control relative z-50">
            <input
              type="text"
              placeholder="Search tenants..."
              className="input input-bordered w-48 md:w-64"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary rounded-xl"
            onClick={onOpen}
          >
            Add New Tenant
          </button>
          <button
            className="btn btn-error btn-outline hover:btn-error rounded-xl"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
