import { API } from "./api.js";

export class Companies{


    static async returnCompanyCard(company){

        const divHeader = document.createElement("div")
        divHeader.classList.add("empresa__descricao")

        divHeader.innerHTML = `<h3>${company.name} - ${company.description}</h3>
        <p>Ínicio da jornada: ${company.opening_hours}</p>
        <p>Setor: ${company.sectors.description}</p>`

        const divWorkers = await Companies.returnWorkersDiv(company)
        const divDepart = await Companies.returnDepartmentsDiv(company)
        
        const li = document.createElement("li")

        li.append(divHeader,divWorkers,divDepart)

        return li
    }

    static async returnWorkersDiv(company){

        const workersAll = await API.getAllUsers()
        const departList = await API.departmentsListCIA(company.uuid)
        
         let companyWorkers = workersAll.filter((worker)=>{
            let resp = false
            departList.forEach((depart) => {
                if(worker.department_uuid == depart.uuid){
                    resp = true
                }
            })
            return resp
        })
        
        const div = document.createElement("div")
        div.classList.add("users")

        const h3 = document.createElement("h3")
        h3.innerHTML = `<i class="fa fa-solid fa-address-card"></i>Colaboradores`

        const ul = document.createElement("ul")

        companyWorkers.forEach((worker)=>{

            const li = document.createElement("li")
            li.innerText = `${worker.username} - ${worker.professional_level}`

            ul.append(li)
        })

        div.append(h3,ul)

        return div
    }

    static async returnDepartmentsDiv(company){

        const div = document.createElement("div")
        div.classList.add("depart")

        const h3 = document.createElement("h3")
        h3.innerHTML = `<i class="fa fa-sharp fa-solid fa-building-user"></i>Departamentos`

        const ul = document.createElement("ul")

        const departList = await API.departmentsListCIA(company.uuid)

        departList.forEach(depart => {
            
            const li = document.createElement("li")
            li.innerText = depart.name

            ul.append(li)
        });

        div.append(h3,ul)

        return div
    }

    static renderCompanyCard(companyList){


        const ul = document.querySelector(".empresas__lista")

        ul.innerHTML=""

        companyList.forEach(async (company)=>{

            const li = await Companies.returnCompanyCard(company)
            ul.append(li)
        })

    }

    static async renderInitialCompanyCards(){

        const companiesList = await API.getAllCompanies()

        await Companies.renderCompanyCard(companiesList)
    }

    static searchCompanyByName(){

        const searchBtn = document.getElementById("searchCompany")
        const input = document.getElementById("searchInput")

        
        searchBtn.addEventListener("click", async (e)=>{
            e.preventDefault()

            const search = input.value.trim().toLowerCase()

            const companiesList = await API.getAllCompanies()

            const filteredList = companiesList.filter((company)=>{
                let ciaName = company.name.toLowerCase()

                return ciaName.includes(input.value)
            })

            await Companies.renderCompanyCard(filteredList)
        })
    }


}