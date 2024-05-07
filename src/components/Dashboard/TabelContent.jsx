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
        <div className="py-8 px-6 overflow-x-auto w-full" >
            <table className="w-full table-auto border-collapse text-center " style={{  boxShadow: "5px 5px rgba(0, 0, 0, 0.2), 10px 10px rgba(0, 0, 0, 0.3), 15px 15px rgba(0, 0, 0, 0.2), 20px 20px rgba(0, 0, 0, 0.1), 25px 25px rgba(0, 0, 0, 0.05)"  }}>
                <thead className="bg-black text-white rounded-xl ">
                    <tr className=''>
                        {optionalColumns ? (
                            optionalColumns.map((column, index) => (
                                <th key={index} className="px-4 py-2">{column}</th>
                            ))
                        ) : (
                            <>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Created At</th>
                                <th className="px-4 py-2">Updated At</th>
                                <th className="px-4 py-2">Action</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-gray-100">
                    {data.map((row, index) => (
                        <tr key={index} className={(index % 2 === 0) ? "bg-gray-200" : "bg-gray-300"}>
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
