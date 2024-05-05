import React, { useEffect, useRef, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { isOpen,modalsData,isPost, isLoading } from '../../feature/action'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { transformText } from '../../utils/utils';
import { json, useNavigate } from 'react-router-dom';
const Modals = ({data,title,urlUpdate}) => {
  const [formData, setFormData] = useState(data || {}); 
  const dispatch = useDispatch()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name == 'price' ? parseFloat(value) : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const onClose = (e) =>{
    e.preventDefault()
    dispatch(isPost(false))
    dispatch(modalsData(null))
    dispatch(isOpen())
  }
  const navigate = useNavigate()
  const getLocalStorageToken = localStorage.getItem('token')
  const token = JSON.parse(getLocalStorageToken)
  
  const isOpens = useSelector((state)=>state.feature.isOpen)
   const filteredData = data && Object.entries(data).filter(([key]) => key !== "category" && key !=='id' && key !=='updatedAt' && key !=='createdAt' && key !== 'role');
   const handleFileChange = async(e) => {

     const fd = new FormData()
    fd.append("image",e.target.files[0]);
 
    await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image',{
  body:fd,
  method:'POST',
  headers:{
    apiKey:"24405e01-fbc1-45a5-9f5a-be13afcd757c",
    Authorization:`Bearer ${token}`
},
  },
  ).then(ress =>{
 return ress.json()
    
  }).then(data=>{
    console.log(data)
    const {name} = e.target
    console.log(name)
    if(name =='imageUrl' || name == 'profilePictureUrl'){
      setFormData(prevState => ({
        ...prevState,
        [name]:data.url
      }));
    }else{
            setFormData(prevState => ({
              ...prevState,
              [name]:[data.url]
            }));

    }
      console.log(formData)
  })

  };
  const postData = () =>{
    try{
      // Jika ada gambar yang dipilih, tambahkan ke FormData
      axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${urlUpdate}${data.id ? `/${data.id}` : ''}`
      ,formData,
    {
      headers:{
        apiKey:"24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{
      toast.success(res.data.message)
      dispatch(isOpen())
      dispatch(isLoading(true))
    })
    }catch(error){
      console.log(error)
      toast.warning(error.data.message)
    }
  }
  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    postData()
  };
  const isPosts = useSelector((state) =>state.feature.isPost)
  const bodyData = useSelector((state)=>state.feature.CreatedData)
   const filteredBodyData = bodyData && Object.entries(bodyData.body).filter(([key]) => key !== "url" );
  
  const [categories,setCategories] = useState([])
  const getCategoryId = () =>{
    axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories',{
      headers:{
        apiKey:"24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization:`Bearer ${token}`
      }
    }).then(ress=>{
      setCategories(ress.data.data)
    })
  }


  
  const PostnewItem = (e) =>{
    e.preventDefault
    console.log(formData)
   axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${bodyData.url}`,
   formData,{
    headers:{
      apiKey:"24405e01-fbc1-45a5-9f5a-be13afcd757c",
      Authorization:`Bearer ${token}`
    }
  }).then(ress=>{
    console.log(ress)
    dispatch(isLoading(true))
    dispatch(isPost(false))
    dispatch(modalsData(null))
    dispatch(isOpen())
  }).catch(error=>{
    toast.error(error.message)
  })
  }
  useEffect(()=>{
    getCategoryId()
  },[])
   return (
    <>
  <div className={`${isOpens !== false && isPosts === false ? 'block' : 'hidden'}`}>
    <div className={`top-0 left-0 bg-gray-800/70 right-0 bottom-0 fixed z-10 ${isOpens !== false ? 'block':'hidden'}`} >
    <div className='z-20 grid overflow-y-auto  h-full  mx-auto '>
      <Toaster position='top-center' richColors></Toaster>
    <form  className='bg-gray-800 rounded-md my-auto p-4 mx-auto w-[60%]'  onSubmit={handleFormSubmit}>
    <div className='flex mt-2 justify-between items-center'>
     <h1 className='text-white font-bold  text-2xl'>{title} Update</h1>
     <button onClick={onClose} className='h-[42px] w-[42px] py-2.5 px-2.5 text-sm font-bold  text-white focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'  >X</button>
    </div>
   
    {filteredData && filteredData.map(([key, value], index) => (
      <div className='grid gap-3 mt-2' key={key}>
        <label className='text-white font-semibold' >{transformText(key)}</label>
        {key === 'imageUrl' || key === 'imageUrls' || key === 'profilePictureUrl' ? (
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
             onChange={(e) => handleFileChange(e, index)} type="file" name={key} accept="image/*"
          />
        ) : (
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={handleInputChange} type="text" name={key} defaultValue={value}
          />
        )}
      </div>
    ))}
  <div className='flex justify-end'>
      <button className=' mt-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' type="submit">Save</button>
  </div>
    </form>
    </div>
      </div>
</div>
{/* Created Mode */}
      <div className={`${isOpens !== false && isPosts === true ? 'block' : 'hidden'}`}>
    <div className={`top-0 left-0 bg-gray-800/70 right-0 bottom-0 fixed z-10 ${isOpens !== false  ?'block':'hidden'}`} >
    <div className='z-20 grid overflow-y-auto  h-full  mx-auto '>
      <Toaster position='top-center' richColors></Toaster>
    <form  className='bg-gray-800 rounded-md my-auto p-4 mx-auto w-[60%]'  onSubmit={handleFormSubmit}>
    <div className='flex mt-2 justify-between items-center'>
     <h1 className='text-white font-bold  text-2xl'>{title} Post</h1>
     <button onClick={onClose} className='h-[42px] w-[42px] py-2.5 px-2.5 text-sm font-bold  text-white focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'  >X</button>
    </div>
      {filteredBodyData && filteredBodyData.map(([key, value]) => (
        <div className='grid gap-3 mt-2' key={key}>
          <label className='text-white font-semibold' htmlFor={key}>{transformText(key)}</label>
         
          {key === 'imageUrl' || key === 'imageUrls' ? ( 
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={handleFileChange} type="file" name={key} accept="image/*" />
              ) 
              : ( key ==='categoryId' ? (
                <>
                <select  onChange={handleInputChange}   name='categoryId'  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' >
               {categories.map((category)=>(
                 <option name="categoryId" key={category.id} defaultValue={category.id}>
                {category.name}
               </option>
              ))}
              </select>
               </>
              )
              :( key == 'price' && key == 'price_discount' && key =='rating' && key=="total_reviews" ?(
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={handleInputChange} type='number'  name={key}  defaultValue={Number(value)} />
                  ):
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={handleInputChange} name={key} defaultValue={value} />
              
              )             
             
             )}
       </div>
      ))}
  <div className='flex justify-end'>
      <button className=' mt-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' type="submit" onClick={PostnewItem}>Save</button>
  </div>
    </form>
    </div>
      </div>
                </div>
      </>
  );
};


export default Modals