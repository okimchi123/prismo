"use client";
import { useState, useRef, useEffect } from "react";

export default function GifSearch({setGifModal, setPreviewPic, setGif, gifButtonRef}) {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const gifRef = useRef(null);

  const selectGIF = (gif) => {
    setPreviewPic(gif.media_formats.gif.url)
    setGif(gif.media_formats.gif.url)
    setGifModal(false)
  }

  const searchGifs = async () => {
    if (!query) return;
    const res = await fetch(`/api/tenor?q=${query}`);
    const data = await res.json();
    setGifs(data.results || []);
  };

  useEffect(() => {
      const handleClickOutside = (event) => {
        if (gifRef.current && !gifRef.current.contains(event.target) && !gifButtonRef.current.contains(event.target)) {
            setGifModal(false)
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
  return (
    <div ref={gifRef} className="p-4 bg-white absolute -top-22 left-0">
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
            onClick={()=>selectGIF(gif)}
            alt="gif"
            className="w-full h-auto rounded"
          />
        ))}
      </div>
    </div>
  );
}
