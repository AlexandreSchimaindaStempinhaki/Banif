import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router";
import { Client } from '../../api/client'
import { OrbitProgress } from "react-loading-indicators";
import ImagemLogin from '../../components/ImageLogin';
import CredenciaisLogin from '../../components/CredenciaisLogin';

import { Container } from './style'
import { ContainerLoading } from "../../components/CredenciaisLogin/style";

export default function Login() {

    // const navigate = useNavigate();
    // const [load, setLoad] = useState(true)

    // function fetchData() {

    //     setLoad(true)
    //     setTimeout(() => {
    //         Client.get('auth/me').then(res => {
    //             const load = res.data
    //             console.log(load.user)

    //             if (load.user.papel_id === 1) {
    //                 navigate('/Home/Gerente')
    //             }
    //             else if (load.user.papel_id === 2) {
    //                 navigate('/Home/Cliente')
    //             }
    //         })
    //             .catch(function (error) {
    //                 console.log(error)
    //             })
    //             .finally(() => {
    //                 setLoad(false)
    //             })
    //     }, 1000)
    // }

    // useEffect(() => {
    //     fetchData()
    // }, [])

    return (
        // load
        //     ?
        //     <ContainerLoading>
        //         <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
        //     </ContainerLoading>
        //     :
            <Container>
                <ImagemLogin />
                <CredenciaisLogin />
            </Container>
    );
}