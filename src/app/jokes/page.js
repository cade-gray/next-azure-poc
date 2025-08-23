export default async function Page() {
  const response = await fetch("https://api.cadegray.dev/joke/all/weblist");
  const jokes = await response.json();
  return (
    <div>
      <h2 className="text-3xl font-bold">
        Joke Setups Frome Jokedle - Pulled from api.cadegray.dev
        <br />
        This page is a server component
      </h2>

      <ul>
        {jokes.map((joke) => (
          <li key={joke.jokeid}>{joke.setup}</li>
        ))}
      </ul>
    </div>
  );
}
