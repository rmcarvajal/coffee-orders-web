import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function register(formData: FormData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(`${process.env.COFFEE_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).catch(() => null);

  if (!response?.ok) redirect("/login?error=1");

  const data = await response.json().catch(() => null);
  const token = data?.access_token;
  if (typeof token !== "string" || !token) redirect("/login?error=1");

  redirect("/login?registered=1");
}

type LoginPageProps = {
  searchParams: Promise<{ error?: string; registered?: string }>;
};

export default async function SignupPage({ searchParams }: LoginPageProps) {
  const { error, registered } = await searchParams;

  return (
    <main>
      <h1>Iniciar sesión</h1>
      {registered === "1" && <p>Cuenta creada. Ya puedes iniciar sesión.</p>}
      {error === "1" && <p role="alert">No se pudo iniciar sesión. Revisar los datos o la conexión.</p>}

      <form action={register}>
        <p>
          <label>
            Email <input name="email" type="email" autoComplete="email" required />
          </label>
        </p>
        <p>
          <label>
            Contraseña
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
        </p>
        <button type="submit">Registrar</button>
      </form>
    </main>
  );
}