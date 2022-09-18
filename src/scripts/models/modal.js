import { API } from "./api.js"

export class Modal{

    static createModalUserReg(form){

        const div = document.createElement("div")
        div.classList.add("modal")
        div.append(form)

        return div

        
    }

    static createFormUpdateReg(){

        const form = document.createElement("form")
        form.classList.add("modalForm")

        const div = document.createElement("div")
        div.classList.add("modalForm__header")

        const h2 = document.createElement("h2")
        h2.innerText = "Alterar dados"

        const closeBtn = document.createElement("button")
        closeBtn.classList.add("closeModal")
        closeBtn.id = "closeModal"
        closeBtn.innerText = "X"

        div.append(h2,closeBtn)

        const labelNome = document.createElement("label")
        labelNome.classList.add("textoModal")
        labelNome.innerText = "nome"

        const inputNome = document.createElement("input")
        inputNome.classList.add("input--default")
        inputNome.required = true
        inputNome.type = "text"
        inputNome.id = "nome"
        inputNome.placeholder = "Seu novo nome de usuário..."  

        const labelEmail = document.createElement("label")
        labelEmail.classList.add("textoModal")
        labelEmail.innerText = "email"

        const inputEmail = document.createElement("input")
        inputEmail.classList.add("input--default")
        inputEmail.required = true
        inputEmail.type = "email"
        inputEmail.id = "email"
        inputEmail.placeholder = "Seu novo e-mail..."  
        
        const labelSenha = document.createElement("label")
        labelSenha.classList.add("textoModal")
        labelSenha.innerText = "senha"

        const inputSenha = document.createElement("input")
        inputSenha.classList.add("input--default")
        inputSenha.required = true
        inputSenha.type = "password"
        inputSenha.id = "senha"
        inputSenha.placeholder = "Sua nova senha..."  

        const sendBtn = document.createElement("button")
        sendBtn.classList.add("button--primary")
        sendBtn.innerText = "Enviar"
        sendBtn.type = "submit"
        sendBtn.id = "enviar"

        form.append(div, labelNome, inputNome, labelEmail, inputEmail, labelSenha, inputSenha, sendBtn)

        return form
    }

    static async createFormNewCia(){
        const form = document.createElement("form")
        form.classList.add("modalForm")

        const div = document.createElement("div")
        div.classList.add("modalForm__header")

        const h2 = document.createElement("h2")
        h2.innerText = "Nova empresa"

        const closeBtn = document.createElement("button")
        closeBtn.classList.add("closeModal")
        closeBtn.id = "closeModal"
        closeBtn.innerText = "X"

        div.append(h2,closeBtn)

        const labelNome = document.createElement("label")
        labelNome.classList.add("textoModal")
        labelNome.innerText = "nome"

        const inputNome = document.createElement("input")
        inputNome.classList.add("input--default")
        inputNome.type = "text"
        inputNome.id = "nome"
        inputNome.placeholder = "Nome da nova empresa"

        const labelTime = document.createElement("label")
        labelTime.classList.add("textoModal")
        labelTime.innerText = "início da jornada"

        const inputTime = document.createElement("input")
        inputTime.classList.add("input--default")
        inputTime.type = "time"
        inputTime.id = "time"

        const labelDescrip = document.createElement("label")
        labelDescrip.classList.add("textoModal")
        labelDescrip.innerText = "description"

        const inputDescript = document.createElement("input")
        inputDescript.classList.add("input--default")
        inputDescript.type = "text"
        inputDescript.id = "description"
        inputDescript.maxlength = 30
        inputDescript.placeholder = "Descrição da empresa"

        const labelSectors = document.createElement("label")
        labelSectors.classList.add("textoModal")
        labelSectors.innerText = "Selecione um setor"

        const inputSelect = document.createElement("select")
        inputSelect.classList.add("input--default")
        inputSelect.id="selectNewCia"

        const sectors = await API.getAllSectors()

        sectors.forEach((setor)=>{
            const option = document.createElement("option")
            option.innerText = setor.description
            option.value = setor.uuid
            inputSelect.append(option)
        })

        const sendBtn = document.createElement("button")
        sendBtn.classList.add("button--primary")
        sendBtn.innerText = "Criar"
        sendBtn.type = "submit"
        sendBtn.id = "criar"

        form.append(div, labelNome, inputNome, labelTime, inputTime, labelDescrip, inputDescript, labelSectors, inputSelect, sendBtn)

        return form
        
    }

    static closeModalUserReg(){

        const closeBtn = document.getElementById("closeModal")
        const form = document.querySelector("form")
        const modal = document.querySelector(".modal")

        closeBtn.addEventListener("click", (e)=>{

            e.preventDefault()

            form.classList.add("disappearModal")

            setTimeout(()=>{
                modal.remove()
            }, 900)

        })

    }

    static createFormNewDepart(company, ciaID){

        const form = document.createElement("form")
        form.classList.add("modalForm")

        const divHeader = Modal.createFormHeaderNewDpt(company)

        const labelNome = document.createElement("label")
        labelNome.classList.add("textoModal")
        labelNome.innerText = "nome"

        const inputNome = document.createElement("input")
        inputNome.classList.add("input--default")
        inputNome.type = "text"
        inputNome.id = "nomeDpt"
        inputNome.placeholder = "Um nome para o departamento..."  

        const labelDescription = document.createElement("label")
        labelDescription.classList.add("textoModal")
        labelDescription.innerText = "descrição"

        const inputDescription = document.createElement("input")
        inputDescription.classList.add("input--default")
        inputDescription.type = "text"
        inputDescription.id = "descriptionDpt"
        inputDescription.placeholder = "Uma descrição das atividades..."  

        const sendBtn = document.createElement("button")
        sendBtn.classList.add("button--primary")
        sendBtn.innerText = "Criar"
        sendBtn.type = "submit"
        sendBtn.id = "createNewDpt"
        sendBtn.setAttribute("cia_uuid",ciaID )

        form.append(divHeader, labelNome, inputNome, labelDescription, inputDescription, sendBtn)

        return form
    }

    static createFormHeaderNewDpt(company){

        const div = document.createElement("div")
        div.classList.add("modalForm__header")

        const h2 = document.createElement("h2")
        h2.innerText = `Novo Departamento para ${company}`

        const closeBtn = document.createElement("button")
        closeBtn.classList.add("closeModal")
        closeBtn.id = "closeModal"
        closeBtn.innerText = "X"

        div.append(h2,closeBtn)

        return div
    }

    static async createFormHire(company, depart){

        const form = document.createElement("form")
        form.classList.add("modalForm")

        const div = document.createElement("div")
        div.classList.add("modalForm__header")
        div.classList.add("modalHire")

        const h2 = document.createElement("h2")
        h2.innerText = `Contratação`

        const p = document.createElement("label")
        p.innerText = `${company}-${depart}`
        p.classList.add("textoModal")

        const closeBtn = document.createElement("button")
        closeBtn.classList.add("closeModal")
        closeBtn.id = "closeModal"
        closeBtn.innerText = "X"

        div.append(h2, closeBtn)

        const labelUser = document.createElement("label")
        labelUser.classList.add("textoModal")
        labelUser.innerText = "selecione o novo colaborador"

        const selectUser = document.createElement("select")
        selectUser.classList.add("input--default")
        selectUser.id = "selectHireUser"
        
        const unemployedList = await API.outWorkUsers()

        unemployedList.forEach((user)=>{
            const option = document.createElement("option")

            option.innerText = `${user.username} - experiência: ${user.professional_level}`

            option.value = user.uuid

            selectUser.append(option)
        })

        const sendBtn = document.createElement("button")
        sendBtn.classList.add("button--primary")
        sendBtn.innerText = "Contratar !"
        sendBtn.type = "submit"
        sendBtn.id = "hireBtn"

        form.append(div, p,labelUser, selectUser, sendBtn)

        return form
    }

    static async createFormEditWorker(workerName){

        const form = document.createElement("form")
        form.classList.add("modalForm")

        const div = document.createElement("div")
        div.classList.add("modalForm__header")
        div.classList.add("modalHire")

        const h2 = document.createElement("h2")
        h2.innerText = `Editar dados de ${workerName}`

        const closeBtn = document.createElement("button")
        closeBtn.classList.add("closeModal")
        closeBtn.id = "closeModal"
        closeBtn.innerText = "X"

        div.append(h2, closeBtn)

        const expLabel = document.createElement("label")
        expLabel.classList.add("textoModal")
        expLabel.innerText = "selecione a nova senioridade"

        const selectExp = document.createElement("select")
        selectExp.classList.add("input--default")
        selectExp.id = "selectExp"

        const option1 = document.createElement("option")
        option1.value = "estágio"
        option1.innerText = "Estágio"

        const option2 = document.createElement("option")
        option2.value = "júnior"
        option2.innerText = "Júnior"

        const option3 = document.createElement("option")
        option3.value = "pleno"
        option3.innerText = "Pleno"

        const option4 = document.createElement("option")
        option4.value = "sênior"
        option4.innerText = "Sênior"

        selectExp.append(option1,option2,option3,option4)

        const worktypeLabel = document.createElement("label")
        worktypeLabel.classList.add("textoModal")
        worktypeLabel.innerText = "selecione a modalidade de trabalho"

        const selectMod = document.createElement("select")
        selectMod.classList.add("input--default")
        selectMod.id = "selectMod"

        const option11 = document.createElement("option")
        option11.value = "home office"
        option11.innerText = "Home Office"

        const option22 = document.createElement("option")
        option22.value = "presencial"
        option22.innerText = "Presencial"

        const option33 = document.createElement("option")
        option33.value = "hibrido"
        option33.innerText = "Híbrido"

        const sendBtn = document.createElement("button")
        sendBtn.classList.add("button--primary")
        sendBtn.innerText = "Alterar"
        sendBtn.type = "submit"
        sendBtn.id = "alterarBtn"

        selectMod.append(option11, option22, option33)

        form.append(div, expLabel, selectExp, worktypeLabel, selectMod, sendBtn)

        return form
        
    }

    static createModalFire(workerName){

        const form = document.createElement("form")
        form.classList.add("modalForm")

        const div = document.createElement("div")
        div.classList.add("modalForm__header")
        div.classList.add("modalHire")

        const h2 = document.createElement("h2")
        h2.innerText = `Deseja desligar ${workerName} ?`

        const closeBtn = document.createElement("button")
        closeBtn.classList.add("closeModal")
        closeBtn.id = "closeModal"
        closeBtn.innerText = "X"

        const sendBtn = document.createElement("button")
        sendBtn.classList.add("button--primary")
        sendBtn.innerText = "Sim, quero desligá-lo(a)"
        sendBtn.type = "submit"
        sendBtn.id = "fireBtn"

        div.append(h2, closeBtn)
        form.append(div, sendBtn)

        return form
    }

    static createModalEditDepart(company, depart){
        const form = document.createElement("form")
        form.classList.add("modalForm")

        const div = document.createElement("div")
        div.classList.add("modalForm__header")
        div.classList.add("modalHire")

        const h2 = document.createElement("h2")
        h2.innerText = `Editar informações`

        const p = document.createElement("label")
        p.innerText = `Empresa: ${company} | Departamento: ${depart}`
        p.classList.add("textoModal")

        const closeBtn = document.createElement("button")
        closeBtn.classList.add("closeModal")
        closeBtn.id = "closeModal"
        closeBtn.innerText = "X"

        div.append(h2,closeBtn)

        const labelDescricao = document.createElement("label")
        labelDescricao.classList.add("textoModal")
        labelDescricao.innerText = "descrição"

        const inputDescricao = document.createElement("input")
        inputDescricao.classList.add("input--default")
        inputDescricao.type = "text"
        inputDescricao.id = "inputNewDescription"
        inputDescricao.placeholder = "nova descrição do departamento"

        const sendBtn = document.createElement("button")
        sendBtn.classList.add("button--primary")
        sendBtn.innerText = "Enviar"
        sendBtn.type = "submit"
        sendBtn.id = "editDepartment"

        form.append(div, p, labelDescricao, inputDescricao,sendBtn)

        return form


    }

    static createModalDeleteDepart(company, depart){

        const form = document.createElement("form")
        form.classList.add("modalForm")

        const div = document.createElement("div")
        div.classList.add("modalForm__header")
        div.classList.add("modalHire")

        const h2 = document.createElement("h2")
        h2.innerText = `Deseja excluir o ${depart} da empresa ${company}?`

        const closeBtn = document.createElement("button")
        closeBtn.classList.add("closeModal")
        closeBtn.id = "closeModal"
        closeBtn.innerText = "X"

        const sendBtn = document.createElement("button")
        sendBtn.classList.add("button--primary")
        sendBtn.innerText = "Sim, quero excluir"
        sendBtn.type = "submit"
        sendBtn.id = "deleteDepart"

        div.append(h2, closeBtn)
        form.append(div, sendBtn)

        return form
    }

    static createModalDeleteUser(username){

        const form = document.createElement("form")
        form.classList.add("modalForm")

        const div = document.createElement("div")
        div.classList.add("modalForm__header")

        const h2 = document.createElement("h2")
        h2.innerText = `Deseja excluir a conta de ${username}?`

        const closeBtn = document.createElement("button")
        closeBtn.classList.add("closeModal")
        closeBtn.id = "closeModal"
        closeBtn.innerText = "X"

        const sendBtn = document.createElement("button")
        sendBtn.classList.add("button--primary")
        sendBtn.innerText = "Sim, quero excluir"
        sendBtn.type = "submit"
        sendBtn.id = "deleteUser"

        div.append(h2, closeBtn)
        form.append(div, sendBtn)

        return form
    }


}

