  import React from 'react'

  const Pagination = ({totalPosts,postsPerPage,setCurrentpage,currentpage}) => {

    const prevPage = (e) =>{
      e.preventDefault()
      if(currentpage >1){
        setCurrentpage(currentpage-1)
      }
    }
    const TotalPage = Math.ceil(totalPosts/postsPerPage)
    const nextPage = (e) =>{
      e.preventDefault()
      if(currentpage < TotalPage){
        setCurrentpage(currentpage+1)
      }else{

      }
    }

      return (
      <div className='flex items-center gap-5 mt-5 mb-10 mx-auto'>
      <button className='bg-black px-6  py-3 rounded-md text-white font-semibold' onClick={prevPage}>Prev</button>
      <p className='flex font-semibold'>{currentpage} / {TotalPage}</p>
      <button className='bg-black px-6 py-3 rounded-md text-white font-semibold' onClick={nextPage}>Next</button>
      </div>
    )
  }

  export default Pagination