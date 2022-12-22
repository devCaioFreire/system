/* eslint-disable jsx-a11y/alt-text */
import { useState, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import './profile.css';
import { FiSettings, FiUpload } from 'react-icons/fi';
import { AuthContext } from '../../context/auth';
import avatar from '../../assets/avatar.png';
import firebase from '../../service/firebaseConnection';

export default function Profile() {

    const { user, signOut, setUser, storageUser } = useContext(AuthContext);

    const [name, setName] = useState(user && user.name);
    const [lastName, setLastName] = useState(user && user.lastName);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e) {

        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png' || image.type === 'image/gif') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            }
            else {
                alert('Esse tipo de imagem não é suportada');
                setAvatarUrl(null);
                return null;
            }
        }
    }

    async function handleUpload() {

        const currentUid = user.uid;

        const uploadTask = await firebase.storage()
            .ref(`images/${currentUid}/${imageAvatar.name}`)
            .put(imageAvatar)
            .then(async () => {
                console.log('Foto enviada com sucesso')

                await firebase.storage().ref(`images/${currentUid}`)
                .child(imageAvatar.name).getDownloadURL()
                .then(async (url) => {
                    let urlImage = url;

                    await firebase.firestore().collection('users')
                    .doc(user.uid)
                    .update({
                        avatarUrl: urlImage,
                        name: name
                    })
                    .then(() => {
                        let data = {
                            ...user,
                            avatarUrl: urlImage,
                            name: name
                        }
                        setUser(data);
                        storageUser(data);
                    })
                })
            })

    }

    async function handleSave(e) {
        e.preventDefault();

        if (imageAvatar === null && name !== '') {
            await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    name: name
                })
                .then(() => {
                    let data = {
                        ...user,
                        name: name
                    };
                    setUser(data);
                    storageUser(data);
                })
        }
        else if (name !== '' && imageAvatar !== null) {
            handleUpload();
        }
    }

    return (
        <div>
            <Header />
            <div className='container-title'>
                <Title name={'Seu Perfil'}>
                    < FiSettings size={20} />
                </Title>

                <div className='container-profile'>
                    <form className='form-profile' onSubmit={handleSave}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#fff' size={25} />
                            </span>
                            <input type={'file'} accept={'image/*'} onChange={handleFile} /> <br />
                            {avatarUrl === null ?
                                <img src={avatar} width={250} height={250} />
                                :
                                <img src={avatarUrl} width={250} height={250} />
                            }
                        </label>
                        <div className='form-inputs'>
                            <label>Nome</label>
                            <input type={'text'} value={name} onChange={(name) => setName(name.target.value)} />

                            <label>Sobrenome</label>
                            <input type={'text'} value={lastName} onChange={(lname) => setLastName(lname.target.value)} />

                            <label>Email</label>
                            <input type={'email'} value={email} disabled={true} />

                            <button type={'submit'}>Salvar</button>
                        </div>
                    </form>
                </div>
                <div className='container-logout'>
                    <button onClick={() => signOut()}>Logout</button>
                </div>
            </div>
        </div>
    );
}