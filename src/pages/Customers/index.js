import { useState } from 'react';
import './customers.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi';
import firebase from '../../service/firebaseConnection';

export default function Customers() {

    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleAdd(e) {
        e.preventDefault();

        if (nomeFantasia && cnpj && email && endereco && telefone !== '') {
            await firebase.firestore().collection('customers')
                .add({
                    nomeFantasia: nomeFantasia,
                    cnpj: cnpj,
                    email: email,
                    telefone: telefone,
                    endereco: endereco
                })
                .then(() => {
                    setNomeFantasia('');
                    setCnpj('');
                    setEmail('');
                    setTelefone('');
                    setEndereco('');
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <div>
            <Header />

            <div className='container-title'>

                <Title name={'Clientes'}>
                    <FiUser color='#fff' size={20} />
                </Title>

                <div className='container-customers'>
                    <form className='form-customers' onSubmit={handleAdd}>

                        <label>Nome Fantasia</label>
                        <input type={'text'} placeholder={'Fr/> Technology Development'} value={nomeFantasia} onChange={((e) => setNomeFantasia(e.target.value))} />

                        <label>CNPJ</label>
                        <input type={'number'} placeholder={'xx. xxx. xxx/0001-xx'} value={cnpj} onChange={((e) => setCnpj(e.target.value))} />

                        <label>Email</label>
                        <input type={'text'} placeholder={'fr@technology.com'} value={email} onChange={((e) => setEmail(e.target.value))} />

                        <label>Telefone</label>
                        <input type={'number'} placeholder={'(xx) xxxxx-xxxx'} value={telefone} onChange={((e) => setTelefone(e.target.value))} />

                        <label>Endereço</label>
                        <input type={'text'} placeholder={'Endereço da empresa'} value={endereco} onChange={((e) => setEndereco(e.target.value))} />

                        <button type={'submit'}>Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}