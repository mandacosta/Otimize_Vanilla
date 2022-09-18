import { instance } from "./axios.js";
import { ToastIndex } from "./toast.js";
import { ToastUserReg } from "./toast.js";

export class API{
    static is_admin = localStorage.getItem("@kenzieEmpresas: is_admin")

    //--------------ROTAS QUE NÃO NECESSITAM TOKEN
    
    static async register(data){
        const userData = await instance
        .post(`auth/register/user`, data)
        .then((resp) => {return resp})
        .then((resp) => {
            
            ToastIndex.creat("Cadastro realizado com sucesso", "green")

            return resp.data
        })
        .catch((err)=>{
            
            ToastIndex.creat(err.response.data.error, "red")
        })

        return userData
    }

    static async login(data){
        const userLogin = await instance
        .post(`auth/login`, data)
        .then((resp) => {return resp})
        .then((resp) => {
            localStorage.setItem("@kenzieEmpresas: token", resp.data.token)
            localStorage.setItem("@kenzieEmpresas: userID", resp.data.uuid)
            localStorage.setItem("@kenzieEmpresas: is_admin", resp.data.is_admin)
            ToastIndex.creat("Login realizado com sucesso", "green")

            return resp.data
        })
        .catch((err)=>{
            ToastIndex.creat(err.response.data.error, "red")
        })

        return userLogin
    }

    static async getAllCompanies(){
        const listCompanies = await instance
        .get(`companies`)
        .then((resp) => {return resp})
        .then((resp) => {

            return resp.data
        })
        .catch((err)=>{
            ToastIndex.creat(err.response.data.error, "red")
        })

        return listCompanies
    }

    static async getCompaniesBySector(sector){
        const listCompaniesSector = await instance
        .get(`companies/${sector}`)
        .then((resp) => {return resp})
        .then((resp) => {

            return resp.data
        })
        .catch((err)=>{
            ToastIndex.creat(err.response.data.error, "red")
        })

        return listCompaniesSector 
    }

    //-----------ROTAS DO USUÁRIO NORMAL


    static async getAllCoworkers(){
            const listCoworkers = await instance
            .get(`users/departments/coworkers`)
            .then((resp) => {
                return resp.data
            })
            .catch((err)=>{
                console.log(err)
            })

            return listCoworkers
    }

    static async  getMyDepartments(){
            const department = await instance
            .get(`users/departments`)
            .then((resp) => {
                return resp
            })
            .catch((err)=>{
                ToastIndex.creat(err.response.data.error, "red")
            })

            return department
    }

    static async  userDataUpdate(data){
        const userData = await instance
        .patch(`users`, data)
        .then((resp) => {

            return resp
        })
        .catch((err)=>{  
            ToastUserReg.creat(err.response.data.error, "red")
        })

        return userData
    }

    static async userData(userID){
        const profile = await instance
        .get(`users/profile`)
        .then((resp) => {
            return resp.data
        })
        .catch((err)=>{
            ToastIndex.creat(err.response.data.error, "red")
        })

        return profile
    }

    //-------ROTAS DO ADMIN

    static async getAllUsers(){
        const users = await instance
        .get(`users`)
        .then((resp) => {
            return resp.data
        })
        .catch((err)=>{
            ToastIndex.creat(err.response.data.error, "red")
        })

        return users
    }

    static async outWorkUsers(){
        const usersList = await instance
        .get(`admin/out_of_work`)
        .then((resp) => {
            return resp.data
        })
        .catch((err)=>{
            ToastIndex.creat(err.response.data.error, "red")
        })

        return usersList
    }

    static async userAdminUpdate(data, userID){
        const deptData = await instance
        .patch(`admin/update_user/${userID}`, data)
        .then((resp) => {
            ToastUserReg.creat("Dados atualizados !", "green")
            return resp.data
        })
        .catch((err)=>{   
            ToastIndex.creat(err.response.data.error, "red")
        })

        return deptData
    }

    static async deleteUser(userID){
        const deptData = await instance
        .delete(`admin/delete_user/${userID}`)
        .then((resp) => {
            ToastUserReg.creat("Usuário deletado", "green")
            return resp.data
        })
        .catch((err)=>{   
            ToastIndex.creat(err.response.data.error, "red")
        })

        return deptData


    }

    

    //-------ROTAS DO ADMIN - Departamentos

    static async  departmentsList(){
        const listDepartments = await instance
        .get(`departments`)
        .then((resp) => {
            return resp.data
        })
        .catch((err)=>{
            ToastIndex.creat(err.response.data.error, "red")
        })

        return listDepartments
        
    }

    static async  departmentsListCIA(ciaID){
        const list = await instance
        .get(`departments/${ciaID}`)
        .then((resp) => {
            return resp.data
        })
        .catch((err)=>{
            ToastIndex.creat(err.response.data.error, "red")
        })

        return list
    }

    static async  createDepartment(data){
        const deptData = await instance
        .post(`departments`, data)
        .then((resp) => {
            ToastUserReg.creat("Novo departamento Criado!", "green")
            return resp.data
        })
        .catch((err)=>{
            ToastIndex.creat(err.response.data.error, "red")
            
        })

        return deptData
    }

    static async  updateDepartment(dptID, data){
        const deptData = await instance
        .patch(`departments/${dptID}`, data)
        .then((resp) => {
            ToastUserReg.creat("Descrição atualizada", "green")
            return resp.data
        })
        .catch((err)=>{
            ToastIndex.creat(err.response.data.error, "red")
        })

        return deptData
    }

    static async  deleteDept(dptID){
        const retorno = await instance
        .delete(`departments/${dptID}`)
        .then((resp) => {
            ToastUserReg.creat("Departamento deletado", "green")
            return resp
        })
        .catch((err)=>{
            ToastIndex.creat(err.response.data.error, "red")
        })

        return retorno
    }


    static async  hireEmployee(data){
        const userData = await instance
        .patch(`departments/hire/`, data)
        .then((resp) => {
            ToastUserReg.creat("Nova contratação efetuada!", "green")
            return resp.data
        })
        .catch((err)=>{
            ToastIndex.creat(err.response.data.error, "red")
        })

        return userData
    }

    static async  fireEmployee(userID){
        const userData = await instance
        .patch(`departments/dismiss/${userID}`)
        .then((resp) => {
            ToastUserReg.creat("Funcionário(a) desligado", "green")
            return resp.data
        })
        .catch((err)=>{
            ToastIndex.creat(err.response.data.error, "red")
        })

        return userData
    }

    //....ROTA ADMIN: Company

    static async createCompany (data){
        const ciaData = await instance
    .post(`companies`, data)
    .then((resp) => {
        ToastUserReg.creat("Empresa Criada com sucesso", "green")
        return resp.data
    })
    .catch((err)=>{
        ToastUserReg.creat(err.response.data.error, "red")
    })

    return ciaData
    }

    //....ROTA ADMIN: SECTOR
    static async getAllSectors(){
        const userData = await instance
    .get(`sectors`)
    .then((resp) => {
        return resp.data
    })
    .catch((err)=>{
        ToastIndex.creat(err.response.data.error, "red")
    })

    return userData
    }
}