export const dynamic = "force-static"

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <span style={{ fontSize: "6rem", fontWeight: "bold" }}>404</span>
      </div>

      <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1rem" }}>Page Not Found</h1>

      <p style={{ maxWidth: "28rem", marginBottom: "2rem" }}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <div>
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0.375rem",
            backgroundColor: "#000",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Go Home
        </a>
      </div>
    </div>
  )
}
