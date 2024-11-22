export interface FormTask{
    id?:string
    title:string,
    desc:string,
    assign_created:[{assgin:string,created:string}],
    prio_status:[{prio:string,status:string}]
}