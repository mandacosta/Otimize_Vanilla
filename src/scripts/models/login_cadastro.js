import {API} from "../models/api.js" 

export class Authentication {

    static async login(){

        const email = document.getElementsByTagName("input")[0]
        const senha = document.getElementsByTagName("input")[1]
        const loginBtn = document.getElementById("logar")
        

        loginBtn.addEventListener("click", async(e)=>{
            e.preventDefault()

            const loginData = {
                email: email.value,
                password: senha.value
            }

            const resp = await API.login(loginData)

            if(resp.is_admin == true){
                location.replace("src/pages/dash_Admin.html")
            }else{
                location.replace("src/pages/dash_userReg.html")
            }


        })
    }

    static async register(){

        const nome = document.getElementsByTagName("input")[2]
        const experiencia = document.getElementById("selectExp")
        const email = document.getElementsByTagName("input")[3]
        const senha = document.getElementsByTagName("input")[4]
        const cadastrarBtn = document.getElementById("cadastrar")
        const modalLogin = document.getElementsByClassName("modalLogin")[0]
        const modalCadastro = document.getElementsByClassName("modalCadastro")[0]

        cadastrarBtn.addEventListener("click", async(e)=>{
            e.preventDefault()

            const dataCadastro = {
                    password: senha.value,
                    email: email.value,
                    professional_level: experiencia.value,
                    username: nome.value
            }

            const resposta = await API.register(dataCadastro)

            if(resposta.uuid){

                modalCadastro.classList.add("noShow")
                modalLogin.classList.remove("noShow")
                
            }

        })
    }
}