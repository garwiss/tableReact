import React, {useState} from "react";
import {FaSortDown, FaSortUp, FaSort} from 'react-icons/fa'

export default function Table({head, body, searchable}) {

    const [sorting, setSorting] = useState(false);
    const [search, setSearch] = useState('');
    const filteredData = body.filter(
        items => items.some(item => item.toString().toLocaleLowerCase('TR').includes(search.toLocaleLowerCase('TR')))
    ).sort((a, b) => {
        if (sorting?.orderBy == 'asc') {
            return a[sorting.key].toString().localeCompare(b[sorting.key]);
        }
        if (sorting?.orderBy == 'desc') {
            return b[sorting.key].toString().localeCompare(a[sorting.key]);
        }

    })

    return (
        <>
            {searchable && (
                <div className="mb-4 flex gap -x-2">
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        type="text"
                        placeholder="Tabloda Ara"
                        className="h-10 border outline-none focus:border-black roudnded text-sm px-4 w-full border-gray-300"
                    />
                    {sorting && (
                        <button
                            onClick={() => setSorting({})}
                            className="h-10 rounded whitespace-nowrap border border-red-500 text-red-500 text-sm px-4">
                            Sıralamayı iptal et
                        </button>
                    )}
                </div>
            )}


            <div className="w-full border rounded p4">
                <table className="w-full">
                    <thead>
                    <tr>
                        {head.map((h, key) =>
                            <th
                                width={h.width}
                                className="text-left bg-gray-50 text-sm font-semibold text-gray-500 p-3 border-b"
                                key={key}>

                                <div className="inline-felx items-center gap-x-2">
                                    {h.name}
                                    {h.sortable && <button onClick={() => {
                                        if (sorting?.key == key) {
                                            setSorting({
                                                key: key,
                                                orderBy: sorting.orderBy == 'asc' ? 'desc' : 'asc'
                                            })
                                        } else {
                                            setSorting({
                                                key: key,
                                                orderBy: 'asc',
                                            })
                                        }
                                    }}>
                                        {sorting?.key == key && (
                                            sorting.orderBy == 'asc' ? <FaSortDown size={20}/> : <FaSortUp size={20}/>
                                        )}
                                        {sorting?.key !== key && <FaSort size={18}/>}
                                    </button>}
                                </div>
                            </th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((items, key) => (
                        <tr className="group" key={key}>
                            {items.map((item, key) => (
                                <td
                                    className="p-3 text-sm group-hover:bg-blue-500 group-hover:text-black-600"
                                    key={key}>
                                    {Array.isArray(item) ? (
                                        <div className="flex gap-x-2.5">
                                            {item}
                                        </div>
                                    ) : item}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}