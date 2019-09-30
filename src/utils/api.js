import {get, insert ,remove,update, postForm, post} from './AxiosUtil';

import * as api from './AxiosUtil';

 export function login(data){

    return post("admin/login",data);
    
 }


 export function getOrderInfo(data){
    return get("admin/api/order/order/get/"+data); 
 }


 export function layout(data){
    return postForm("admin/layout");
 }
 
 