import React, { useState } from "react";
import axios from "axios";
import { FiCopy } from "react-icons/fi";

export default function URLShortener() {
  const [inputUrl, setInputUrl] = useState("");
  const [isUrlnew , setIsUrlnew] = useState(true);
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [useAlias, setUseAlias] = useState(false);
  const [alias, setAlias] = useState("");
  const [isUnique, setIsUnique] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
    });
  };

  const handleShorten = async () => {
    if (!inputUrl) return;
    try {
      setLoading(true);
      setError("");
      const res = useAlias ? await axios.post("/shorten", { originalUrl: inputUrl,useAlias,alias }) : await axios.post("/shorten", { originalUrl: inputUrl,useAlias });
      console.log("response : ", res);
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError("Failed to shorten URL. Please try again.",err);
    } finally {
      setLoading(false);
    }
  };

  

  const handleUseAlias = () => {
    if (!inputUrl) return;
    setUseAlias(true);
  };

  const handleAlias = async (e) => {
    setAlias(e.target.value)
    try{
      const res = await axios.post("/checkalias",{alias : alias})
      res.found ? setIsUnique(false) : setIsUnique(true);
      console.log("is Unique : ",isUnique);      

      if(isUnique){ //unique
        try {
          setError("");
          const res = await axios.post("/shorten/withalias", { originalUrl: inputUrl });
          console.log("response : ", res);
          setShortUrl(res.data.shortUrl);
        } catch (err) {
          setError("Failed to shorten URL. Please try again.");
        } finally {
        }
        const res2 = await axios.post("/shorten/withalias", { originalUrl: inputUrl,alias });
      }

    }catch(err){console.log(err)}
    finally{
      setLoading(false)
    }
  }

  const checkUrl = (e) =>{
    setInputUrl(e.target.value);
    // await axios.post("/checkUrl",{})
  }

  return (
    <div className="font-sans text-gray-800 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">
      <header className="text-center p-8 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-4xl font-bold text-purple-700">SleekShort</h1>
        <p className="text-sm text-gray-600 mt-2">
          Your personal URL shortening service
        </p>
      </header>

      <section className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Shorten Your URL</h2>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter your long URL here..."
          value={inputUrl}
          onChange={checkUrl}
        />

        <button
          className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md"
          onClick={handleShorten}
          disabled={loading && isUnique}
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
        <button
          className="mt-4 ml-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md"
          onClick={handleUseAlias}
          disabled={loading}
        >
          use Custom alias
        </button>

        {useAlias && (
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg mt-6 max-w-xl mx-auto">
            <p className="text-lg font-semibold mb-2 text-gray-700">
              Enter custom alias:
            </p>
            <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm">
              <input
                type="text"
                onChange={handleAlias}
                className="flex-1 px-4 py-2 text-gray-800 focus:outline-none"
              />
              {(alias.length>0)&&(
                <span className="text-green-600 text-sm mt-1 block mr-2">
                {isUnique? "acceptable":"try another alias"}
                </span>
                )
              }          
            
            </div>
          </div>
        )}

        {shortUrl && (
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg mt-6 max-w-xl mx-auto">
            <p className="text-lg font-semibold mb-2 text-gray-700">
              Your Shortened URL:
            </p>
            <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 px-4 py-2 text-gray-800 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                title="Copy to clipboard"
              >
                <FiCopy size={20} />
              </button>
            </div>
            {copied && (
              <span className="text-green-600 text-sm mt-1 block">
                Copied to clipboard!
              </span>
            )}
          </div>
        )}

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </section>

      <section className="max-w-4xl mx-auto mt-16 px-6 py-10 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">
          About SleekShort
        </h2>
        <p className="text-gray-700">
          SleekShort is a simple and elegant tool to turn your long and messy
          URLs into clean, short links. Built using the MERN stack, it's fast,
          reliable, and user-friendly. Perfect for sharing on social media,
          emails, or wherever short links are needed.
        </p>
      </section>

      <footer className="mt-20 bg-purple-700 text-white text-center py-6">
        <p>
          &copy; {new Date().getFullYear()} SleekShort. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
