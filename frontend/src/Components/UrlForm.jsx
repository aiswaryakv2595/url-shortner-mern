import React, { useEffect, useState } from "react";
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
const UrlForm = () => {
  const [fullUrl, setFullUrl] = useState("")
  const [data, setData] = useState([])
  const { shortUrl } = useParams();
  const sendRequest = async() => {
    try {
      const response = await axios.get('http://localhost:5000/')
      setData(response.data.url)

    } catch (error) {
     console.log(error) 
    }
   }
  useEffect(() => {
   
   sendRequest()
   
  }, [])
  const handleSubmit = async(e)=> {
    e.preventDefault()
   try {
    await axios.post('http://localhost:5000/shortUrls',{fullUrl})
    sendRequest()
   } catch (error) {
    console.log(error)
   }
  }
  const redirectToFullUrl = async (url) => {
    try {
      const response = await axios.get(`http://localhost:5000/${url}`); 
      window.location.href = response.data.full; 
    } catch (error) {
      console.log(error);
    
    }
  };
  
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-extrabold">Url Shortner</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <label className="block text-gray-700 text-sm font-bold mb-2 mr-2">
            URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
            type="url"
            name="fullUrl"
            placeholder="Full Url"
            value={fullUrl}
            required
            onChange={(e)=>setFullUrl(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Shrink
          </button>
        </div>
      </form>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>Full Url</th>
            <th>Short Url</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {
            data && data?.map((urls,index)=>(
              <tr key={index}>
              <td><a className="no-underline hover:underline" href={urls.full}>{urls.full}</a></td>
              <td> <a onClick={()=>redirectToFullUrl(urls.short)} className="no-underline hover:underline cursor-pointer">
                    {urls.short}
                  </a></td>
              <td>{urls.clicks}</td>
            </tr>
            ))
          }
         
        </tbody>
      </table>
    </div>
  );
};

export default UrlForm;
