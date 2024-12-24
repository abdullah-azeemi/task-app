import { useNavigate, Link } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1>Home Page</h1>
        <p>Your all Tasks are shown here </p>
        <br />
        <p>
          <Link to="/addTask">Add a Task</Link>
        </p>
        <p> Edit Task</p>
        <br />
        <Link to="/login">Login Page</Link>
        <br />
        <Link to="/signup"> Signup Page</Link>
      </div>
    </>
  );
};
export default HomePage;
