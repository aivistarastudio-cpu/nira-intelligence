export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#05060b", minHeight: "100vh" }}>
      {children}
    </div>
  )
}