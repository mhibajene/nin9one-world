import Link from "next/link";
import "./home.css";

export default function HomePage() {
  return (
    <main className="home">
      <section>
        <p>NIN9ONE World</p>
        <h1>The first district is opening.</h1>
        <Link href="/citadel">Enter The Citadel</Link>
      </section>
    </main>
  );
}
