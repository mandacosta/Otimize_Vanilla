import {API} from "./api.js"
import { Modal } from "./modal.js";

export class Departamentos{

    static async renderSectors(){

        const sectors = await API.getAllSectors()

        const select = document.getElementById("selectSector-Depart")

        sectors.forEach(sector => {
            const option = document.createElement("option")
            option.value = sector.description
            option.innerText = sector.description
            select.append(option)
        });
    }

    static renderCompanies(){

        const selectSector = document.getElementById("selectSector-Depart")
        const sectorBtn = document.getElementById("selectSectorBtn")

        const selectCompany = document.getElementById("selectCompany-Depart")

        sectorBtn.addEventListener("click", async (e)=>{
            e.preventDefault()

            selectCompany.innerHTML = ""
            const sector = selectSector.value

            const companies = await API.getCompaniesBySector(sector)

            if(companies.length == 0){

                const option = document.createElement("option")
                option.innerText = "Não existem empresas nessa categoria ainda"
                option.value = 0
                selectCompany.append(option)
            } else{
                companies.forEach((company)=>{

                    const option = document.createElement("option")
                    option.innerText = company.name
                    option.value = company.uuid
                    selectCompany.append(option)
                })
            }

            

            

        })
    }

    static renderDepartmentOptions(){

        const selectCompany = document.getElementById("selectCompany-Depart")
        const ciaBtn = document.getElementById("selectCiaBtn")
        const selectDepart = document.getElementById("selectDepart")

        ciaBtn.addEventListener("click", async (e)=>{

            e.preventDefault()
            selectDepart.innerHTML = ""
            const companyID = selectCompany.value

            const departments = await API.departmentsListCIA(companyID)

            if(departments.length == 0){
                const option = document.createElement("option")
                option.innerText = "Não existem departamentos nessa empresa ainda"
                option.value = 0
                selectDepart.append(option)


            } else{
                departments.forEach((depart)=>{

                    const option = document.createElement("option")
                    option.innerText = depart.name
                    option.value = depart.uuid //id do departamento para caso precise
                    selectDepart.append(option)
                })
            }
            await Departamentos.renderDepartmentsCard(departments)
            Departamentos.createHireModal()
            Departamentos.createEditWorkerModal()
            Departamentos.createModalFire()
            Departamentos.createModalEditDepart()
            Departamentos.createDeleteDepartModal()

        })

    }

    static createWorkersItem(worker){

        const li = document.createElement("li")
        
        const p = document.createElement("p")
        p.innerText = `${worker.username} - ${worker.professional_level} - ${worker.kind_of_work || "modalidade não definida"}`

        const divEdit = document.createElement("div")
        divEdit.classList.add("editWorker")

        const editBtn = document.createElement("button")
        editBtn.setAttribute("workerID", worker.uuid)
        editBtn.setAttribute("workername", worker.username)
        editBtn.classList.add("editWorkerBtn")
        editBtn.innerHTML = `<i class="fa-solid fa-file-pen"></i>`

        const fireBtn = document.createElement("button")
        fireBtn.classList.add("mov")
        fireBtn.classList.add("remv")
        fireBtn.setAttribute("workerID", worker.uuid)
        fireBtn.setAttribute("workername", worker.username)
        fireBtn.innerHTML = `<i class="fa-solid fa-user-minus"></i>`

        divEdit.append(editBtn,fireBtn)

        li.append(p,divEdit)

        return li
    }

    static createDepartHeader(depart){

        const divHeader = document.createElement("div")
        divHeader.classList.add("departHeader")

        const divDescript = document.createElement("div")
        divDescript.classList.add("descricaoDepart")
        divDescript.innerHTML = `<h3>${depart.name}</h3>
        <p>${depart.description}</p>`

        const divMov = document.createElement("div")
        divMov.classList.add("movimentacao")

        const btnHire = document.createElement("button")
        btnHire.id = depart.uuid
        btnHire.setAttribute("departname", depart.name)
        btnHire.setAttribute("companyname", depart.companies.name)
        btnHire.classList.add("mov")
        btnHire.classList.add("add")
        btnHire.classList.add("hireBtn")
        btnHire.innerHTML = `<i class="fa-sharp fa-solid fa-user-plus"></i>Contratar`

        divMov.append(btnHire)

        divHeader.append(divDescript,divMov)

        return divHeader
    }

    static createModifyDepart(depart){

        const divModify = document.createElement("div")
        divModify.classList.add("modifyDepart")

        const editBtn = document.createElement("i")
        editBtn.setAttribute("departID", depart.uuid)
        editBtn.setAttribute("departname", depart.name)
        editBtn.setAttribute("company", depart.companies.name)
        editBtn.classList.add("fa-solid")
        editBtn.classList.add("fa-pen-to-square")

        const deleteBtn = document.createElement("i")
        deleteBtn.setAttribute("departID", depart.uuid)
        deleteBtn.setAttribute("departname", depart.name)
        deleteBtn.setAttribute("company", depart.companies.name)
        deleteBtn.classList.add("fa-solid")
        deleteBtn.classList.add("fa-trash")

        divModify.append(editBtn, deleteBtn)

        return divModify
    }

    static async renderDepartmentsCard(departmentsList){

        const departList = document.querySelector(".departLista")

        departList.innerHTML = ""

        const workers = await API.getAllUsers()
        departmentsList.forEach((depart)=>{
            const departCard = document.createElement("li")
        
            const divHeader = Departamentos.createDepartHeader(depart)
            const divModify = Departamentos.createModifyDepart(depart)

            const departWorkers = workers.filter((worker)=>{

                return worker.department_uuid == depart.uuid
            })

            const divWorkers = document.createElement("div")
            divWorkers.classList.add("colaboradores")

            const h4 = document.createElement("h4")
            h4.innerHTML = `<i class="fa fa-solid fa-address-card"></i> Colaboradores`

            const ul = document.createElement("ul")

            departWorkers.forEach((worker)=>{

                const item = Departamentos.createWorkersItem(worker)
                ul.append(item)
            })

            divWorkers.append(h4,ul)

            departCard.append(divHeader,divWorkers,divModify)

            departList.append(departCard)
        })



    }

    static async filterDepartaments(){

        const selectDepart = document.getElementById("selectDepart")
        const departBtn = document.getElementById("selectDepartBtn")

        const allDepartments = await API.departmentsList()

        departBtn.addEventListener("click", async(e)=>{
            e.preventDefault()

            const department = selectDepart.value

            const filtered = allDepartments.filter((depart)=>{

                return department == depart.uuid
            })

            await Departamentos.renderDepartmentsCard(filtered)
        })
    
    }

    static createUnemploydCard(user){

        const li = document.createElement("li")

        const p = document.createElement("p")

        const removeBtn = document.createElement("button")
        removeBtn.classList.add("deleteUser")
        removeBtn.id = "deleteuserbtn"
        removeBtn.setAttribute("username", user.username)
        removeBtn.setAttribute("userID", user.uuid)
        removeBtn.innerHTML = `<i class="fa fa-solid fa-user-slash"></i> Remover`

        p.innerText = `${user.username} - ${user.professional_level}`

        li.append(p, removeBtn)

        return li
    }

    static async renderAllUnemployed(){

        const notWorking = await API.outWorkUsers()
        const ul = document.querySelector(".unemployedList")
  
        notWorking.forEach((user)=>{

            const li = Departamentos.createUnemploydCard(user)
            ul.append(li)
        })

    }

    static async createNewCompanyModal(){

        const selectCia = document.getElementById("selectCompany-Depart")

        const newDptBtn = document.getElementById("newDptBtn")

        newDptBtn.addEventListener("click", (e)=>{
            e.preventDefault()
            const indice = selectCia.selectedIndex
            const cia = selectCia.options[indice].text
            const ciaID = selectCia.value
  
            const form = Modal.createFormNewDepart(cia, ciaID)
            const modal = Modal.createModalUserReg(form)
            const dashArea = document.querySelector(".dashAdmin")

            dashArea.append(modal)
            Modal.closeModalUserReg()

            const nome = document.getElementById("nomeDpt")
            const descricao = document.getElementById("descriptionDpt")

            const newDptBtn = document.getElementById("createNewDpt")
            newDptBtn.addEventListener("click", async (e)=>{
                e.preventDefault()
                const cia_uuid = newDptBtn.getAttribute("cia_uuid")
                const data = {
                    name: nome.value,
                    description: descricao.value,
                    company_uuid: cia_uuid
                }

                await API.createDepartment(data)

                setTimeout(()=>{
                    modal.remove()
                    location.reload()
                }, 4000)
            })
        })
    }

    static async createHireModal(){

        const hireBtn = document.querySelectorAll(".hireBtn")

        hireBtn.forEach((btn)=>{

            btn.addEventListener("click", async (e)=>{
                e.preventDefault()
    
                const depart = btn.getAttribute("departname")
                const company = btn.getAttribute("companyname")
                
                const form  = await Modal.createFormHire(company, depart)
                const modal =  Modal.createModalUserReg(form)
    
                const dashArea = document.querySelector(".dashAdmin")
    
                dashArea.append(modal)
                Modal.closeModalUserReg()
    
                const select = document.getElementById("selectHireUser")
                const btnHireAPI = document.getElementById("hireBtn")
    
                btnHireAPI.addEventListener("click", async (e)=>{
                    e.preventDefault()
    
                    const data = {
                        user_uuid: select.value,
                        department_uuid: btn.id
                    }
    
                    await API.hireEmployee(data)
                    
                    setTimeout(()=>{
                        modal.remove()
                        location.reload()
                    }, 4000)
    
                    
                })
    
            })




        })

        
    }

    static async createEditWorkerModal(){

        const editBtn = document.querySelectorAll(".editWorkerBtn")

        editBtn.forEach((btn)=>{

            btn.addEventListener("click", async (e)=>{
                e.preventDefault()
         
                const name = btn.getAttribute("workername")
                const workerID = btn.getAttribute("workerid")
    
                const form = await Modal.createFormEditWorker(name)
                const modal = Modal.createModalUserReg(form)
    
                const dashArea = document.querySelector(".dashAdmin")
    
                dashArea.append(modal)
                Modal.closeModalUserReg()
    
                const selectExp = document.getElementById("selectExp")
                const selectMod = document.getElementById("selectMod")
                const btnEdit = document.getElementById("alterarBtn")
    
                btnEdit.addEventListener("click", async (e)=>{
                    e.preventDefault()
    
                    const data = {
                        kind_of_work: selectMod.value,
                        professional_level: selectExp.value
                    }
    
                    await API.userAdminUpdate(data, workerID)
    
                    setTimeout(()=>{
                        modal.remove()
                        location.reload()
                    }, 4000)
    
                    
    
                })
    
            })


        })

        

    }

    static createModalFire(){

        const btnFire = document.querySelectorAll(".remv")

        btnFire.forEach((btn)=>{
            btn.addEventListener("click", (e)=>{
                e.preventDefault()
                
                const name = btn.getAttribute("workername")
                const workerID = btn.getAttribute("workerid")

                const form =  Modal.createModalFire(name)
                
                const modal = Modal.createModalUserReg(form)
                
                const dashArea = document.querySelector(".dashAdmin")
    
                dashArea.append(modal)
                Modal.closeModalUserReg()

                const fireBtn = document.getElementById("fireBtn")

                fireBtn.addEventListener("click", async(e)=>{
                    e.preventDefault()

                    await API.fireEmployee(workerID)

                    setTimeout(()=>{
                        modal.remove()
                        location.reload()
                    }, 4000)
                })
            })


        })
        
    }

    static createModalEditDepart(){

        const editDepartBtn = document.querySelectorAll(".fa-pen-to-square")

        editDepartBtn.forEach((btn)=>{

            btn.addEventListener("click", (e)=>{
                e.preventDefault()
                const departID = btn.getAttribute("departid")
            const departName = btn.getAttribute("departname")
            const company = btn.getAttribute("company")

            const form = Modal.createModalEditDepart(company,departName)
            const modal = Modal.createModalUserReg(form)
            const dashArea = document.querySelector(".dashAdmin")
    
            dashArea.append(modal)
            Modal.closeModalUserReg()

            const inputDescricao = document.getElementById("inputNewDescription")
            const editBtn = document.getElementById("editDepartment")

            editBtn.addEventListener("click",async (e)=>{
                e.preventDefault()

                const data = {
                    description: inputDescricao.value
                }

                await API.updateDepartment(departID, data)

                setTimeout(()=>{
                    modal.remove()
                    location.reload()
                }, 4000)
            })


            })
            

        })
    }

    static createDeleteDepartModal(){
        const btnDeleteDpt = document.querySelectorAll(".fa-trash")

        btnDeleteDpt.forEach((btn)=>{
            btn.addEventListener("click", (e)=>{
                e.preventDefault()
                
                const departName = btn.getAttribute("departname")
                const company = btn.getAttribute("company")
                const departID = btn.getAttribute("departid")

                const form =  Modal.createModalDeleteDepart(company,departName)
                
                const modal = Modal.createModalUserReg(form)
                
                const dashArea = document.querySelector(".dashAdmin")
    
                dashArea.append(modal)
                Modal.closeModalUserReg()

                const deleteBtn = document.getElementById("deleteDepart")

                deleteBtn.addEventListener("click", async(e)=>{
                    e.preventDefault()

                    await API.deleteDept(departID)

                    setTimeout(()=>{
                        modal.remove()
                        location.reload()
                    }, 4000)
                })
            })


        })
    }

    static createDeleteUserModal(){

        const deleteUserBtn = document.querySelectorAll("button.deleteUser")
        
        deleteUserBtn.forEach((btn)=>{

            btn.addEventListener("click", (e)=>{
                e.preventDefault()

                const nome = btn.getAttribute("username")
                const userID = btn.getAttribute("userid")

                const form  = Modal.createModalDeleteUser(nome)
                const modal = Modal.createModalUserReg(form)

                const dashArea = document.querySelector(".dashAdmin")
                dashArea.append(modal)
                Modal.closeModalUserReg()

                const deleteBtn = document.getElementById("deleteUser")

                deleteBtn.addEventListener("click", async(e)=>{
                    e.preventDefault()

                    await API.deleteUser(userID)

                    setTimeout(()=>{
                        modal.remove()
                        location.reload()
                    }, 4000)
                })

            })
        })
    }


    
}