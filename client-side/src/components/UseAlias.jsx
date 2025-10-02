import React from 'react'
import useUrlStore from '../store/store'
import apiInstance from '../lib/axios';


const UseAlias = () => {

    const {setAlias,alias,setIsUnique,isUnique,setError,inputUrl,setShortUrl,shortUrl,setLoading} = useUrlStore();

    const handleAlias = async (e) => {
        setAlias(e.target.value)
        try{
            const res = await apiInstance.post("/checkalias",{alias : alias})
            res.found ? setIsUnique(false) : setIsUnique(true);
            console.log("is Unique : ",isUnique);      

            if(isUnique){ //unique
                try {
                setError("");
                const res = await apiInstance.post("/shorten/withalias", { originalUrl: inputUrl });
                console.log("response : ", res);
                setShortUrl(res.data.shortUrl);
                } catch (err) {
                setError("Failed to shorten URL. Please try again.");
                } finally {
                }
                const res2 = await apiInstance.post("/shorten/withalias", { originalUrl: inputUrl,alias });
            }

        }catch(err){console.log(err)}
        finally{
            setLoading(false)
        }
    }

  return (
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
  )
}

export default UseAlias
