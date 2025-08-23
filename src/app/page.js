import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <h1 className="text-3xl font-bold">Home</h1>
        <ul>
          <li>
            <Link href="/jokes" className="text-blue-500 hover:underline">
              Joke Setups
            </Link>
          </li>
          <li>
            <Link href="/api-demo" className="text-blue-500 hover:underline">
              &quot;API&quot; Demo
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
