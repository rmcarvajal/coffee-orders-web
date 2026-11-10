import Link from "next/link";

export function AppHeader() {
  return (
    <header className="site-header">
      <p className="brand">Coffee Orders</p>
      <nav aria-label="Navegación principal">
        <Link href="/">Inicio</Link>
        <Link href="/orders">Pedidos</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}