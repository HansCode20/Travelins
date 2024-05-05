  import React from 'react';
  import { useState, useEffect } from 'react';
  import axios from 'axios';
  import aos from 'aos';
  import 'aos/dist/aos.css';

  const Categories = () => {
      const [categories, setCategories] = useState([]);

      useEffect(() => {
        aos.init({
          duration: 2000,});
      }, []);


      const getCategories = () => {
        axios
          .get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories',
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
      )
          .then((response) => {
            setCategories(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      useEffect(() => {
        getCategories();
      }, []);

      console.log(categories);

    return (
      <div className="p-5">
        <h1 data-aos="zoom-in" className="text-[40px] font-bold flex justify-center text-center ">Categories<br />Travel</h1>
        <hr className='border-1 border-black w-1/3 mx-auto mt-5'/>
        <div className="flex flex-col md:flex-row md:justify-center p-5 gap-5  ">
          <div data-aos="fade-up" className="w-full md:w-1/3 md:mr-2">
            <p className="p-4  text-center">Create lasting memories with loved ones through family travel. This category includes vacations designed for families, with activities and accommodations suitable for children of all ages, ensuring a fun and memorable experience for the whole family.</p>
          </div>
          <div data-aos="fade-up" className="w-full md:w-1/3 md:ml-2">
            <p className="p-4  text-center">Embark on a journey of self-discovery and empowerment with solo travel. Whether it's backpacking across continents or embarking on a solo retreat, solo travel offers the freedom to explore at one's own pace and embrace new adventures independently.</p>
          </div>
        </div>


        {/* Api Categories */}
        {categories.length > 0 && (
        <div className="container mx-auto p-10 mt-10">
  {/* <!-- Image 1 (Full Container) --> */}
  <div data-aos="zoom-in" className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 xl:gap-8">
    <div className="group relative overflow-hidden rounded-lg bg-gray-100 shadow-lg">
      <img src={categories[0]?.imageUrl} alt="Destination Name" className="w-full object-cover object-center transition duration-200 group-hover:scale-110 rounded-b-lg" />
      <div className="p-4">
        <h2 className="text-4xl font-bold">{categories[0]?.name}</h2>
        <ul className="flex p-6 gap-4">
          <li className="bg-gray-300 bg-opacity-70 rounded-full p-2 w-auto text-center">Trips</li>
          <li className="bg-gray-300 bg-opacity-70 rounded-full p-2 w-auto text-center">{categories[0]?.name}</li>
          <li className="bg-gray-300 bg-opacity-70 rounded-full p-2 w-auto text-center">Tours</li>
        </ul>
      </div>
    </div>

    {/* <!-- Image 2 and 3 (Half Container) --> */}
    <div className="flex flex-col gap-4">
      <div className="group relative overflow-hidden rounded-lg bg-gray-100 shadow-lg">
        <img src={categories[0].imageUrl} alt="Destination Name" className="w-full h-48 object-cover object-center transition duration-200 group-hover:scale-110 rounded-b-lg" />
        <div className="p-4">
          <h2 className="text-3xl font-bold">{categories[0].name}</h2>
          <ul className="flex p-6 gap-4">
          <li className="bg-gray-300 bg-opacity-70 rounded-full p-2 w-auto text-center">Trips</li>
          <li className="bg-gray-300 bg-opacity-70 rounded-full p-2 w-auto text-center">{categories[0].name}</li>
          <li className="bg-gray-300 bg-opacity-70 rounded-full p-2 w-auto text-center">Tours</li>
        </ul>
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-lg bg-gray-100 shadow-lg">
        <img src={categories[0].imageUrl}  alt="Destination Name" className="w-full h-48 object-cover object-center transition duration-200 group-hover:scale-110 rounded-b-lg" />
        <div className="p-4">
          <h2 className="text-3xl font-bold">{categories[0].name}</h2>
          <ul className="flex p-6 gap-4">
          <li className="bg-gray-300 bg-opacity-70 rounded-full p-2 w-auto text-center">Trips</li>
          <li className="bg-gray-300 bg-opacity-70 rounded-full p-2 w-auto text-center">{categories[0].name}</li>
          <li className="bg-gray-300 bg-opacity-70 rounded-full p-2 w-auto text-center">Tours</li>
        </ul>
        </div>
      </div>
    </div>
  </div>
</div>

        )}

      </div>
    );
  }

  export default Categories;
