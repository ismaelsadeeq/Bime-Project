import {useState, useEffect} from 'react'

const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    useEffect(()=>{
        fetch(url)
        .then(res => res.json())
        .then(data => {
            if(data.success === true){
                setIsLoading(false)
                setData(data)
            }
            
        }).catch(error => {
            setIsLoading(false)
            console.error('Error:', error);
        })
      
    },[url])  
    return {isLoading,data}
}  

export default useFetch
  
