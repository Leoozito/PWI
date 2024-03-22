import "./Login.css"
import GoogleIcon from '@mui/icons-material/Google';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Form from '../../components/Form';
import axiosService from '../../services/AxiosService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import React from "react";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { useAuth } from "../../provider/authProvider";
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const schema = z.object({
        email: z.string()
        .nonempty("Campo obrigatório!")
        .email("Formato de email invalido"),

        password: z.string().min(8),
    });

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const dadosLogin = {
        Email: email,    
        PasswordHash: password
    }

    const { setToken } = useAuth();

    const loginUser = () => {
        axiosService.loginService(dadosLogin)
        .then((res) => {
            setToken(res.token.token)
            window.location.href = "/home"
            Cookies.set('id', res.userSearch.id);
        })
        .catch((err) => {
            if (err.response) {
                setError(err.response.data);
            } else if (err.request) {
                setError(err)
            }
        })
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return(
        <>
            <div className="container-login">
                <div className="login">
                    <Form onSubmit={handleSubmit(loginUser)}>
                        <div className="div1-container">
                            <div className="div1">
                                <h1>Faça seu Login</h1>
                                <div class="social-container">
                                    <a href="#" class="social">
                                        <GoogleIcon/>
                                        <p>Entrar com o Google</p>
                                    </a>
                                </div>
                                <Input 
                                    placeholder="Email" 
                                    register={register("email")}  
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <span className="message-error">{errors.email.message}</span>}

                                <Input 
                                    placeholder="Senha"
                                    register={register("password")}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          onMouseDown={handleMouseDownPassword}
                                        >
                                          {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                      </InputAdornment>
                                    }  
                                />
                                {errors.password && <span className="message-error">{errors.password.message}</span>}
                                {error && (
                                    <>
                                        <span className="message-error">
                                            {error}
                                        </span> 
                                    </>
                                )}
                                <a href="#">Esqueceu sua senha?</a>
                                <Button type="submit" name="Login"/>
                            </div>
                        </div>
                    </Form>
                    <div className="div2-container">
                        <div className="div2">
                            <div className="overlay-panel overlay-right">
                                <div className="img-container">
                                    <img src="https://pwi.com.br/wp-content/uploads/2023/11/logo-pwi.svg"/>
                                </div>
                                <h1>Seja bem-vindo !</h1>
                                <p>Insira seus dados pessoais e comece sua jornada conosco</p>
                                <a href="register">
                                    <Button
                                        name="Cadastre-se"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;