import React from 'react'
import useUrlStore from '../store/store'
import { FiCopy } from "react-icons/fi";

const ShortUrl = () => {

    const {shortUrl,setCopied,copied} = useUrlStore();

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
        });
  };


  return (
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
  )
}

export default ShortUrl
