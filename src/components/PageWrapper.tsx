export default function PageWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: "24px" }}>
      <h1
        style={{
          fontSize: "1.8rem",
          fontWeight: 600,
          marginBottom: "16px",
        }}
      >
        {title}
      </h1>

      <div style={{ fontSize: "1rem", lineHeight: "1.6" }}>{children}</div>
    </div>
  );
}
