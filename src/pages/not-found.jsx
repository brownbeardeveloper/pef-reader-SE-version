export default function NotFoundPage() {
    return (
      <main className="mx-auto px-20 pt-10 pb-20">
    <h2 className="mb-6 text-4xl font-bold text-slate-600 tracking-tight" tabIndex={0}>
          404 - Sidan kunde inte hittas
        </h2>
        <p className="mb-8 text-lg text-gray-700">
          Sidan du letar efter finns inte. Kontrollera webbadressen eller gå tillbaka till startsidan.
        </p>
        <a href="/" className="button">
          Tillbaka till startsidan
        </a>
      </main>
    )
  }
  