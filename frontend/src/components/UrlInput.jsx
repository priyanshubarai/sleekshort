import React from 'react'
import useUrlStore from '../store/store'

const UrlInput = () => {

    const {inputUrl,setInputUrl} = useUrlStore();

    const checkUrl = (e) =>{
    setInputUrl(e.target.value);
  }

  return (
    <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
        placeholder="Enter your long URL here..."
        value={inputUrl}
        onChange={checkUrl}
    />
  )
}

export default UrlInput
