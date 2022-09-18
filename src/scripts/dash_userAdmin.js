import { API } from "./models/api.js"
import { Modal } from "./models/modal.js"
import {ToastUserReg} from "../scripts/models/toast.js"
import {Companies} from "../scripts/models/dashAdmin_Empresas.js"
import { Setores } from "./models/dashAdmin_Setores.js"
import { Departamentos } from "./models/dashAdmin_Departamentos.js"

class RenderDashAdmin{

    static menuBar(){

        const menuBtn = document.querySelector(".fa-bars")
        const nav  = document.getElementsByTagName("nav")[0]

        menuBtn.addEventListener("click", ()=>{
            
            nav.classList.toggle("showMenu")
        })
    }

    static togglePages(){

        const sectorCiaBtn = document.getElementById("sectCiaBtn")
        const departBtn = document.getElementById("departBtn")

        const sectorCiaPage = document.querySelector(".setores_empresas ")
        const departPage = document.querySelector(".departamentos")

        const nav = document.querySelector("nav")

        sectorCiaBtn.addEventListener("click", ()=>{

            departPage.classList.remove("show")
            departPage.classList.add("noShow")

            sectorCiaPage.classList.remove("noShow")
            sectorCiaPage.classList.add("show")

            nav.classList.toggle("showMenu")

        })

        departBtn.addEventListener("click", ()=>{

            sectorCiaPage.classList.remove("show")
            sectorCiaPage.classList.add("noShow")

            departPage.classList.remove("noShow")
            departPage.classList.add("show")

            nav.classList.toggle("showMenu")
            Departamentos.createDeleteUserModal()
        })



    }

    static modalNewCia(){

        const newCiaBtn = document.querySelectorAll(`[btn="newcia"]`)

        newCiaBtn.forEach((btn)=>{

            btn.addEventListener("click", async()=>{
                const form = await Modal.createFormNewCia()
                const modal = Modal.createModalUserReg(form)
                const dashArea = document.querySelector(".dashAdmin")

                dashArea.append(modal)

                Modal.closeModalUserReg()

                const criarBtn = document.getElementById("criar")
                criarBtn.addEventListener("click", async (e)=>{
                    e.preventDefault()
                    await RenderDashAdmin.createNewCia() 
                })
                
                
                
            })
        })
    }

    static async createNewCia(){

        const inputNome = document.getElementById("nome")
        const inputTime = document.getElementById("time")
        const inputDescricao = document.getElementById("description")
        const inputSetor = document.getElementById("selectNewCia")

        const data = {
            name: inputNome.value,
            opening_hours: inputTime.value,
            description: inputDescricao.value,
            sector_uuid: inputSetor.value
        }
        
        const resp = await API.createCompany(data)

        if(resp.uuid){
            const form = document.querySelector("form")
            const modal = document.querySelector(".modal")
            form.classList.add("disappearModal")

            setTimeout(()=>{
                modal.remove()
            }, 900)

            
        }
    }

    static logOff(){
        const logoffBtn = document.getElementById("logoff")

        
        logoffBtn.addEventListener("click", ()=>{
        
            localStorage.removeItem("@kenzieEmpresas: token")
            localStorage.removeItem("@kenzieEmpresas: userID")
            localStorage.removeItem("@kenzieEmpresas: is_admin")

            location.replace("../../index.html")
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


if(API.is_admin == "true"){
    RenderDashAdmin.menuBar()
    RenderDashAdmin.darkToggle()
    RenderDashAdmin.togglePages()
    RenderDashAdmin.modalNewCia()
    RenderDashAdmin.logOff()

    Companies.renderInitialCompanyCards()
    Companies.searchCompanyByName()

    Setores.renderSectors()
    Setores.filterCompanies()

    Departamentos.renderSectors()
    Departamentos.renderCompanies()
    Departamentos.renderDepartmentOptions()
    Departamentos.filterDepartaments()
    Departamentos.renderAllUnemployed()
    Departamentos.createNewCompanyModal()

} else{
    location.replace("../../index.html")
}





