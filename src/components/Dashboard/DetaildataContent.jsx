import React from 'react';
import { transformText } from '../../utils/utils';
import moment from 'moment';

const DetaildataContent = ({ data, dataTitle }) => {
  return (
    <div className="container mx-auto py-8 px-4">
  <h1 className="text-center text-4xl font-bold mb-8 text-gray-800">Detail {dataTitle}</h1>
  <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
    <div className="flex justify-center">
      <img className="rounded-lg object-cover w-full h-64 lg:h-80 shadow-lg" src={data.imageUrl || data.imageUrls} alt="Image" />
    </div>
    <div className="space-y-4">
      {Object.keys(data).map((key) => (
        <div key={key} className="bg-gray-100 p-4 rounded-lg ">
          <h2 className="text-xl font-semibold mb-2">{transformText(key)}:</h2>
          <p className="text-gray-700 text-sm  break-words">{typeof data[key] === 'object' ? JSON.stringify(data[key], null, 2) : data[key]}</p>
        </div>
      ))}
      {data.createdAt && data.updatedAt && (
        <>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Created:</h2>
            <p className="text-gray-700">{moment(data.createdAt).format('MMM Do YY')}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Updated:</h2>
            <p className="text-gray-700">{moment(data.updatedAt).format('MMM Do YY')}</p>
          </div>
        </>
      )}
      {data.location_maps && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Location Maps:</h2>
          <div className="rounded-lg overflow-hidden">
            <div dangerouslySetInnerHTML={{ __html: data.location_maps }} />
          </div>
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default DetaildataContent;
