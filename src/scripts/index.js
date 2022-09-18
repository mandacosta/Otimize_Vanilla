import {API} from "../scripts/models/api.js"
import { Authentication } from "./models/login_cadastro.js";

class RenderIndex {

    static async showAllCompanies(lista){

        const ul = document.getElementsByClassName("companiesList")[0]

        ul.innerHTML = ""

        lista.forEach(element => {
            const li = document.createElement("li")

        let icon = ""
        const name = element.sectors.description
        if(name == "Alimenticio"){
            icon = "food"
        } else if(name == "Varejo"){
            icon = "varejo"
        }else if(name == "Textil"){
            icon = "textil"
        }else if(name == "Manufatura"){
            icon = "hand"
        }else if(name == "Aeroespacial"){
            icon = "plane"
        }else if(name == "Automotiva"){
            icon = "car"
        }else if(name == "TI"){
            icon = "TI"
        }else if(name == "Atacado"){
            icon = "atacado"
        }

        li.innerHTML = `<p>${element.name}</p>
        <img src="./src/img/${icon}.svg" alt="">`
        li.classList.add("swiper-slide")

            ul.append(li)

        });
    }

    static async selectSector(){

        let setores = []

        const select = document.getElementsByTagName("select")[0]

        const companies = await API.getAllCompanies()
        

        companies.forEach((element)=>{
           
            setores.push(element.sectors.description)
        })

        const setoresFiltrados = setores.filter((element, index, array)=>{
            return index == array.findIndex((object)=>{
                return object == element
            })
        })

        setoresFiltrados.forEach((setor) =>{

            const option = document.createElement("option")
            option.innerText = setor
            option.value = setor
            

            select.append(option)
        })
    }

    static async filterCompanies (setor){

        const companies = await API.getCompaniesBySector(setor)

        return companies

    }

    static async renderFilter (){

        const select = document.getElementsByTagName("select")[0]
        const filterBtn = document.getElementById("filterBtn")
        
        const companies = await API.getAllCompanies()

        this.showAllCompanies(companies)

        filterBtn.addEventListener("click", async (e)=>{
            e.preventDefault()
            const setor = select.value
            
            if(setor !== "todas"){
                const ciaFiltradas = await RenderIndex.filterCompanies(setor)
                RenderIndex.showAllCompanies(ciaFiltradas)
            } else{
                RenderIndex.showAllCompanies(companies)
            }
        })


    }

    static openCloseModal(){

        const modalLogin = document.getElementsByClassName("modalLogin")[0]

        const modalCadastro = document.getElementsByClassName("modalCadastro")[0]

        const modalLoginBtn = document.getElementById("modalLoginBtn")

        const modalCadastroBtn = document.getElementById("modalCadastroBtn")

        const closeLoginBtn = document.getElementById("closeLogin")

        const closeCadastroBtn = document.getElementById("closeCadastro")

        const handleCadastro = document.getElementById("handleCadastro")

        const handleLogin = document.getElementById("handleLogin")

        modalLoginBtn.addEventListener("click", ()=>{

            modalLogin.classList.remove("noShow")
        })

        closeLoginBtn.addEventListener("click", (e)=>{
            e.preventDefault()

            modalLogin.classList.add("noShow")
        })

        handleCadastro.addEventListener("click", ()=>{

            modalLogin.classList.add("noShow")
            modalCadastro.classList.remove("noShow")
        })

        modalCadastroBtn.addEventListener("click", ()=>{

            modalCadastro.classList.remove("noShow")
        })

        closeCadastroBtn.addEventListener("click", (e)=>{
            e.preventDefault()

            modalCadastro.classList.add("noShow")
        })

        handleLogin.addEventListener("click", ()=>{

            modalCadastro.classList.add("noShow")
            modalLogin.classList.remove("noShow")
        })
    }

    static darkToggle(){

        const darkBtn = document.querySelector(".darkButton")

        const html = document.querySelector("html")

        darkBtn.addEventListener("click",()=>{

            html.classList.toggle("darkMode")
            if(html.classList.length == 1){
                darkBtn.innerHTML = `<i class="fa-solid fa-circle-half-stroke"></i>
                <p>light-mode</p>`
            }else{
                darkBtn.innerHTML = `<i class="fa-solid fa-circle-half-stroke"></i>
                <p>dark-mode</p>`
            }
            
        })
    }

   
}



RenderIndex.selectSector()
RenderIndex.renderFilter()
RenderIndex.openCloseModal()
RenderIndex.darkToggle()
Authentication.login()
Authentication.register()
