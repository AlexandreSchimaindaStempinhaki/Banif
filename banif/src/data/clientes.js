import { useState, useEffect } from 'react';
import { Client } from '../api/client'
import { getPermissions } from '../service/PermissionService';

export default function useClientes() {

    const [data, setData] = useState([])
    const [load, setLoad] = useState(true)
    const permissions = getPermissions()

    function fetchData() {

        console.log(permissions)

        setLoad(true) 
        setTimeout(() => {
    
            Client.get('users').then(res => {

                const clientes = res.data;

                const clientesFiltrados = clientes.data
                // .filter(c => c.papelId === 2)
                
                console.log(clientesFiltrados)
                setData(clientesFiltrados)
            })
            .catch(function(error) {
                console.log(error)
            })
            .finally( () => {
                setLoad(false)
            })

        }, 1000)
    }

    useEffect(() => {
        fetchData()
    }, []);

    return {data, load}
}