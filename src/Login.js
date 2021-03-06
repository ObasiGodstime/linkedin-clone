import React, {useState} from 'react';
import { login } from './features/userSlice';
import { auth } from './firebase';
import {useDispatch} from 'react-redux';
import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [emaillogin, setEmailLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordlogin, setPasswordLogin] = useState('');
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const dispatch = useDispatch();
    const [registerscreen, setRegister] = useState(false);

    const loginToApp = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(emaillogin, passwordlogin)
        .then(userAuth => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                profileURL: userAuth.user.photoURL
            }))
        }).catch((error => alert(error)) );
    }
    const register = (e) => {
        e.preventDefault();
        if(!name){
            return alert('please enter your name')
        }else if(!email){
            return alert('please enter your email')
        }
        auth.createUserWithEmailAndPassword(email, password)
        .then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilePic 
            })
            .then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoURL: profilePic
                }))
            })
        }).catch(error => alert(error.message))
    }
    const registerShow = () => {
        setRegister(true)
    }
    const loginShow = () => {
        setRegister(false)
    }
    return (
        <div className="login">
            <img src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks" alt=""/>
            <h5 style={{marginBottom: '20px'}}>This is a clone and not the real LinkedIn</h5>
            {registerscreen ? <form>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name(Required if registering)" type="text"/>
                 <input value={profilePic} onChange={e => setProfilePic(e.target.value)} placeholder="Profile picture URL(optional)" type="text"/>
                 <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" type="email"/>
                 <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Set Password" type="password"/>
                 <button onClick={register} style={{cursor: 'pointer'}}>Register Now</button>
            </form>
            :
            <form>
                 <input value={emaillogin} onChange={e => setEmailLogin(e.target.value)} placeholder="Email Address" type="email"/>
                 <input value={passwordlogin} onChange={e => setPasswordLogin(e.target.value)} placeholder="Enter Password" type="password"/>
                 <button onClick={loginToApp} style={{cursor: 'pointer'}}>Sign In</button>
            </form>
            }
            {registerscreen ? 
            <p>already have an account? {" "}
                <span className="login__register" onClick={loginShow}>Sign In</span>
            </p>
            :
            <p>Not a member? {" "}
                <span className="login__register" onClick={registerShow}>Register Now</span>
            </p>
            }
        </div>
    )
}

export default Login
