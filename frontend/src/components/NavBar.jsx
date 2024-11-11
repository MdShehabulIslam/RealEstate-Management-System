import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HomeIcon from "@mui/icons-material/Home";
export default function NavBar({ onOpen, onSearch }) {
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <>
      <div className="navbar bg-base-100 p-4 flex justify-between items-center">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">
            <HomeIcon />
            NLCC
          </a>
        </div>

        <div className="navbar-center">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search Client"
              onChange={handleSearchChange}
              className="input input-bordered w-48 md:w-auto rounded-xl"
            />
          </div>
        </div>

        <div className="navbar-end">
          <a className="btn btn-primary rounded-xl" onClick={onOpen}>
            Add Client <AddOutlinedIcon />
          </a>
        </div>
      </div>
    </>
  );
}
