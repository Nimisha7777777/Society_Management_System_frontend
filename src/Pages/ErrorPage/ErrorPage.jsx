import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div style={{ 
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "60px"
    }}>
      <h1 style={{ fontSize: "40px", color: "#d9534f" }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are trying to access does not exist.</p>

      <Link 
        to="/" 
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px"
        }}
      >
        Go Back to Login
      </Link>
    </div>
  );
}

export default ErrorPage;
