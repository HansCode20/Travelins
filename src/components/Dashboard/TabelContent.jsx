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
            <table className="w-full table-auto border-collapse shadow-lg">
                <thead className="text-black rounded-xl ">
                    <tr className='bg-gray-200'>
                        {optionalColumns ? (
                            optionalColumns.map((column, index) => (
                                <th key={index} className="px-4 py-2">{column}</th>
                            ))
                        ) : (
                            <>
                                <th className="px-4 py-2 ">Name</th>
                                <th className="px-4 py-2">Created At</th>
                                <th className="px-4 py-2">Updated At</th>
                                <th className="px-4 py-2">Action</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className={(index % 2 === 0) ? "bg-white" : "bg-gray-100"}>
                            {optionalColumns ? (
                                optionalColumns.map((column, columnIndex) => (
                                    <td key={columnIndex} className="border px-4 py-2">{row[column]}</td>
                                ))
                            ) : (
                                <>
                                    <td className="border px-4 py-2 ">{row.name ?? row.category?.name}</td>
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
