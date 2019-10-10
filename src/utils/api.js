import {get, insert ,remove,update, postForm, post} from './AxiosUtil';

import * as api from './AxiosUtil';

 export function login(data){

    return post("admin/login",data);
    
 }


 export function getOrderInfo(data){
    return get("admin/api/order/order/get/"+data); 
 }


 export function logout(data){
    return postForm("admin/logout");
 }
 
 
 export function me(data){
    // return get("admin/me");

    return get("admin/api/user/me");
 }

 
 export function sessionLogout(data){
    return postForm("admin/sessionLogout");
 }

 
 export function tokenLogout(data){
    return postForm("admin/tokenLogout");
 }
 