export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  try {
    const response = await fetch(
      `https://tenor.googleapis.com/v2/search?q=${q}&key=${process.env.TENOR_API_KEY}&limit=15`
    );

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch GIFs" }),
      { status: 500 }
    );
  }
}
