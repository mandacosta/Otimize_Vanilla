import {Modal} from "./models/modal.js"
import {API} from "./models/api.js"
import {ToastUserReg} from "./models/toast.js"

class RenderDashUser {

    static userID = localStorage.getItem("@kenzieEmpresas: userID")

    static menuBar(){

        const menuBtn = document.querySelector(".fa-bars")
        
        const nav  = document.getElementsByTagName("nav")[0]

        menuBtn.addEventListener("click", ()=>{
          
            nav.classList.toggle("showMenu")
        })
    }

    static renderModalUserReg(){

        const dadosUpdateBtn = document.getElementById("dadosUser")
        

        dadosUpdateBtn.addEventListener("click", ()=>{
            const form = Modal.createFormUpdateReg()
            const modal = Modal.createModalUserReg(form)
            modal.classList.add("showModal")
            const main = document.querySelector("main")
            main.append(modal)
            
            RenderDashUser.updateInfos()

            Modal.closeModalUserReg()
        })
    }

    static async updateInfos (){
        const nomeInput = document.getElementById("nome")
        const emailInput = document.getElementById("email")
        const senhaInput = document.getElementById("senha")
        const sendBtn = document.getElementById("enviar")

        const infos = await API.userData(RenderDashUser.userID)
        
        nomeInput.value = infos.username
        emailInput.value = infos.email

        const modal = document.querySelector(".modalForm")
        modal.addEventListener("submit", async (e)=>{
            e.preventDefault()

            let data = {}
            if(emailInput.value == infos.email){
                data = {
                    username: nomeInput.value,
                    password: senhaInput.value
                }
            }else {
                data = {
                    username: nomeInput.value,
                    email: emailInput.value,
                    password: senhaInput.value
                }
            }
            

            const resp = await API.userDataUpdate(data)
            if(resp.statusText == "OK"){
                const form = document.querySelector("form")
                const modal = document.querySelector(".modal")
                form.classList.add("disappearModal")

                setTimeout(()=>{
                    modal.remove()
                }, 900)

            
                const nav  = document.getElementsByTagName("nav")[0]
                nav.classList.remove("showMenu")
                ToastUserReg.creat("Dados atualizados com sucesso", "green")
            }
        })        
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

    static async Render(){

        const resp = await API.getAllCoworkers()

        if(resp.length == 0){
            RenderDashUser.notWorkingDash()
        } else{
            RenderDashUser.workingDash()
        }
    }

    static async notWorkingDash(){

        const nomeUser = await API.userData(RenderDashUser.userID)
        const section = document.querySelector(".dashUser")

        const div = document.createElement("div")
        div.classList.add("notWorking")

        const h2 = document.createElement("h2")
        h2.innerText = `Olá, ${nomeUser.username}! Parece que você ainda não foi alocado(a).`

        const img = document.createElement("img")
        img.src= "../../src/img/buildingContent.svg"

        div.append(h2,img)
        section.append(div)
    }

    static async workingDash(){

        const section = document.querySelector(".dashUser")
        const departmentInfo = await API.getMyDepartments()
        const coWorkers = await API.getAllCoworkers()

        const divWorking = document.createElement("div")
        divWorking.classList.add("dashWorking")

        const divSlogan = document.createElement("div")
        divSlogan.classList.add("empresa")

        const h2NomeEmpresa = document.createElement("h2")
        h2NomeEmpresa.innerText = departmentInfo.data.name

        const pSlogan = document.createElement("p")
        pSlogan.innerText = departmentInfo.data.description

        divSlogan.append(h2NomeEmpresa, pSlogan)

        const divProfile = document.createElement("div")
        divProfile.classList.add("personalData")

        const h2Dados = document.createElement("h2")
        h2Dados.innerHTML = `Meus dados <i class="fa-solid fa-id-badge"></i>`

        const ulDados = document.createElement("ul")
        const dadosUser = await API.userData(RenderDashUser.userID)

        ulDados.innerHTML = `<li><p>Nome</p><p>${dadosUser.username}</p></li>
        <li><p>Email</p><p>${dadosUser.email}</p></li>
        <li><p>Regime</p><p>${dadosUser.kind_of_work || "ainda não definido"}</p></li>
        <li><p>Experiência</p><p>${dadosUser.professional_level}</p></li>  
        `

        divProfile.append(h2Dados, ulDados)

        const divDesktop = document.createElement("div")
        divDesktop.classList.add("aux-desktop")

        const divCoworker = document.createElement("div")
        divCoworker.classList.add("coWorkers")

        const h2Colegas = document.createElement("h2")
        h2Colegas.innerHTML = `Colegas - ${coWorkers[0].name} <i class="fa-solid fa-people-group"></i>`

        const ulWorkers = document.createElement("ul")

        const listaCoworkers = coWorkers[0].users.filter((user)=>{
            return user.uuid !== RenderDashUser.userID
        })

        listaCoworkers.forEach(worker => {
            const li = document.createElement("li")

            li.innerHTML = `<i class="fa-solid fa-address-card"></i>${worker.username} - ${worker.professional_level}`

            ulWorkers.append(li)
        });

        const divDepart = document.createElement("div")
        divDepart.classList.add("departamentos")

        const h2Depart = document.createElement("h2")
        h2Depart.innerHTML = `Departamentos <i class="fa-sharp fa-solid fa-building"></i>`

        const ulDepart = document.createElement("ul")

        const departList = departmentInfo.data.departments
        
        departList.forEach((depart)=>{
            const li = document.createElement("li")

            li.innerHTML = `<i class="fa-sharp fa-solid fa-building-user"></i>${depart.name} - ${depart.description}`

            ulDepart.append(li)
        })

        divCoworker.append(h2Colegas, ulWorkers)
        divDepart.append(h2Depart,ulDepart)
        divDesktop.append(divCoworker,divDepart)
        divWorking.append(divSlogan,divProfile,divDesktop)

        section.append(divWorking)
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


if(API.is_admin == "false"){
    RenderDashUser.logOff()
    RenderDashUser.menuBar()
    RenderDashUser.darkToggle()
    RenderDashUser.Render()
    RenderDashUser.renderModalUserReg()
} else{
    location.replace("../../index.html")
}

