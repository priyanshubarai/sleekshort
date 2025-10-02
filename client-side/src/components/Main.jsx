import React from 'react'
import useUrlStore from '../store/store'
import UrlInput from "./UrlInput";
import Button from "./Button";
import UseAlias from "./UseAlias";
import ShortUrl from './ShortUrl';
import apiInstance from '../lib/axios';


const Main = () => {

    const {loading,useAlias,shortUrl,error,inputUrl,setUseAlias,alias,setShortUrl,setError,setLoading} = useUrlStore();

    const handleShorten = async () => {
      if (!inputUrl) return;
      try {
        setLoading(true);
        setError("");
        const res = useAlias ? await apiInstance.post("/shorten", { originalUrl: inputUrl,useAlias,alias }) : await apiInstance.post("/shorten", { originalUrl: inputUrl,useAlias });
        console.log("response : ", res);
        setShortUrl(res.data.shortUrl);
      } catch (err) {
        setError("Failed to shorten URL. Please try again: "+err);
      } finally {
        setLoading(false);
      }
    };

    const handleUseAlias = () => {
        if (!inputUrl) return;
        setUseAlias(true);
    };

  return (
    <section className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Shorten Your URL</h2>
        <UrlInput/>
        <Button msg={loading ? "Shortening..." : "Shorten"} handler={handleShorten}/>
        <Button msg="use another alias" handler={handleUseAlias}/>

        {useAlias && (
          <UseAlias/>
        )}

        {shortUrl && (
          <ShortUrl/>
        )}

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </section>
  )
}

export default Main
