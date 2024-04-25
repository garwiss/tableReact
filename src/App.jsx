import Table from './Table.jsx'
import {useState} from "react";

function App() {

    const [users, setUsers] = useState(() => [
        {
            name: "Enes",
            surname: "Bacaksız",
            email: "enesbacaksiz@gmail.com",
            age: 24
        },
        {
            name: "Fatma",
            surname: "Betül",
            email: "ftmbtl@gmail.com",
            age: 26
        },
        {
            name: "Adem",
            surname: "Eyme",
            email: "admyme@gmail.com",
            age: 62
        },
        {
            name: "Alperen",
            surname: "Öztürker",
            email: "ztrklprn@gmail.com",
            age: 21
        }
    ])

    return (
        <div className="p-4">
            <Table
                searchable={true}
                head={[
                    {name: "Ad-Soyad", sortable: true},
                    {name: "E-posta"},
                    {name: "Yaş", sortable: true},
                    {name: "İşlemler", width: 100}
                ]}
                body={users.map((user,key) => [
                    `${user.name} ${user.surname}`,
                    user.email,
                    user.age,
                    [
                        <button className="h-8 px-4 flex items-center rounded bg-blue-600 text-white">Düzenle</button>,
                        <button
                            onClick={() => {
                                const tmpUsers = [...users]
                                tmpUsers.splice(key, 1)
                                setUsers(tmpUsers)
                            }}
                            className="h-8 px-4 flex items-center rounded bg-red-600 text-white">Sil</button>

                    ]
                ])}
            />
        </div>
    )
}

export default App
