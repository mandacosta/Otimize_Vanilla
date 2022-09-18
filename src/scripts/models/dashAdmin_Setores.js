import { API } from "./api.js";
import { Companies } from "./dashAdmin_Empresas.js";


export class Setores{

    static createSectorIcon (sector){

        const li = document.createElement("li")

        let icon = ""
        const name = sector.description
        if(name == "Alimenticio"){
            icon = "utensils"
        } else if(name == "Varejo"){
            icon = "bag-shopping"
        }else if(name == "Textil"){
            icon = "rug"
        }else if(name == "Manufatura"){
            icon = "hand"
        }else if(name == "Aeroespacial"){
            icon = "plane"
        }else if(name == "Automotiva"){
            icon = "car"
        }else if(name == "TI"){
            icon = "computer"
        }else if(name == "Atacado"){
            icon = "cart-shopping"
        }

        li.innerHTML = `<i class="fa fa-solid fa-${icon}"></i>${name}`
        li.setAttribute("sector", name)
        return li
    }

    static async renderSectors(){

        const ul = document.querySelector(".setores_lista")

        const sectors = await API.getAllSectors()

        sectors.forEach(sector => {
            
            const li = Setores.createSectorIcon(sector)

            ul.append(li)
        });
    }

    static filterCompanies(){

        const ul = document.querySelector(".setores_lista")

        ul.addEventListener("click", async (e)=>{

            const sector = e.target.getAttribute("sector")

            const companiesList = await API.getAllCompanies()

            const filteredList = companiesList.filter((company)=>{

                return sector == company.sectors.description
            })

            await Companies.renderCompanyCard(filteredList)
        })
    }


}