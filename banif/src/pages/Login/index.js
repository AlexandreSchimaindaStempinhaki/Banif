import ImagemLogin from '../../components/ImageLogin';
import CredenciaisLogin from '../../components/CredenciaisLogin';

import { Container } from './style'

export default function Login() {
    return(
        <Container>
            <ImagemLogin />
            <CredenciaisLogin />
        </Container>
    );
}