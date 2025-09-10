"use client";
import { useState } from "react";

export default function GifSearch() {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([]);

  const searchGifs = async () => {
    if (!query) return;
    const res = await fetch(`/api/tenor?q=${query}`);
    const data = await res.json();
    setGifs(data.results || []);
  };

  return (
    <div className="p-4 bg-white absolute -top-22 left-0">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GIFs"
          className="border px-2 py-1"
        />
        <button
          onClick={searchGifs}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 max-h-[300px] overflow-y-auto">
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.media_formats?.gif?.url}
            alt="gif"
            className="w-full h-auto rounded"
          />
        ))}
      </div>
    </div>
  );
}
