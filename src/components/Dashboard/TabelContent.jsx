import React, { useState } from 'react';
import moment from 'moment';
import ActionTab from './ActionTab';
import Modals from './Modals';
import { useSelector } from 'react-redux';
import Searchfeature from './Searchfeature';

const TabelContent = ({ data, urlUpdate, modalsTitle, title, urlDelete, optionalColumns }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const ModalsData = useSelector((state) => state.feature.Modalsdata);

  return (
    <div className="py-8 px-4 overflow-x-auto w-full">
      <table className="w-full table-auto border-collapse text-center">
        <thead className="bg-[#1f2937] text-white rounded-xl">
          <tr>
            {optionalColumns ? (
              optionalColumns.map((column, index) => (
                <th key={index} className="px-4 py-2">{column}</th>
              ))
            ) : (
              <>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">CreatedAt</th>
                <th className="px-4 py-2">UpdatedAt</th>
                <th className="px-4 py-2">Action</th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="bg-[#1f2937] text-white rounded">
          {data.map((row, index) => (
            <tr key={index} className={(index % 2 === 0) ? "bg-[#1f2937]" : "bg-[#374151]"}>
              {optionalColumns ? (
                optionalColumns.map((column, columnIndex) => (
                  <td key={columnIndex} className="border px-4 py-2">{row[column]}</td>
                ))
              ) : (
                <>
                  <td className="border px-4 py-2">{row.name ?? row.category?.name}</td>
                  <td className="border px-4 py-2">{moment(row.createdAt).format('MMM Do YY')}</td>
                  <td className="border px-4 py-2">{moment(row.updatedAt).format('MMM Do YY')}</td>
                  <td className="border px-4 py-2"><ActionTab link={modalsTitle} urlDelete={urlDelete} id={row.id} value={row} /></td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Modals urlUpdate={urlUpdate} title={title} data={ModalsData} />
    </div>
  );
};

export default TabelContent;
