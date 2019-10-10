import axios from "axios";
import { Modal, message } from "antd";
import qs from 'qs';
import * as api  from "./api";

const confirm = Modal.confirm;

window.flag = false; //��������

// ����ʱ[config]:showTimeout    1.[true]:��ʾ��ʾ 2.["again"]:��ʾ�ٴ���ʾ������
axios.defaults.timeout = 6000;
axios.defaults.withCredentials = true;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Access-Control-Allow-Methods"] = "GET, POST, PATCH, PUT, DELETE, OPTIONS";
axios.defaults.headers["Access-Control-Allow-Headers"] = "Origin, Content-Type, X-Auth-Token";
axios.defaults.headers.get["X-Requested-With"] = "XMLHttpRequest"; //Ajax get�����ʶ
axios.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest"; //Ajax post�����ʶ
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8"; //POST���������ȡ����������
axios.defaults.headers.post["Accept"] = "application/json"; //POST���������ȡ����������
axios.defaults.headers.put["X-Requested-With"] = "XMLHttpRequest"; //Ajax put�����ʶ
axios.defaults.headers.delete["X-Requested-With"] = "XMLHttpRequest"; //Ajax delete�����ʶ

axios.interceptors.response.use(
    function(response) {
        // console.log("进来了");
        // if (response.status == 500 && response.message == "refresh fail" ) {
        //         console.log("进来了");
        // }
        return response;
    },
    function(error) {
        console.log(error.response);

        if (error.response.status == 500 && error.response.data.message == "refresh fail" ) {
            api.tokenLogout().then(res=>{
                if(res.code === 200){
                    // window.location.href = "http://auth.immoc.com:9090/logout?redirect_uri=http://admin.immoc.com:8000";
                    
                    window.location.href = "http://auth.immoc.com:9090/oauth/authorize?" +
                    'client_id=admin&' +
                    'redirect_uri=http://admin.immoc.com:8070/oauth/callback&' +
                    'response_type=code';
                        }
            });

        }
        return error.response;
    }
);

axios.interceptors.request.use(function(config) {
    // const user = JSON.parse(Cookies.get("user") || "{}");
    // û�е�¼������¼ҳ
    // if (!user.userName) {
    //     // �ų�·��
    //     let isAuthPath = true; // �Ƿ�����֤·��
    //     if (auth.excludePaths && auth.excludePaths.length > 0) {
    //         for (let excludePath of auth.excludePaths) {
    //             let regexp = new RegExp(excludePath);
    //             if (regexp.test(config.url)) {
    //                 isAuthPath = false;
    //             }
    //         }
    //     }

    //     if (isAuthPath) {
    //         if (!window.loginWarnflag) {
    //             window.loginWarnflag = true; // ��ǵ�ǰ�Ƿ��е�¼��ʾ������
    //             const returnUrl = encodeURIComponent(window.location.href); // ��¼���践�ص� url
    //             Modal.warning({
    //                 title: "��ʾ",
    //                 key: "1",
    //                 content: "�Ự�ѹ��ڣ�",
    //                 okText: "���µ�¼",
    //                 onOk() {
    //                     // ��ջ���
    //                     sessionStorage.clear();

    //                     window.loginWarnflag = false; // ����
    //                     window.location = deployBaseR + `${auth.loginUri}?returnUrl=${returnUrl}`;
    //                 }
    //             });
    //         }
    //         return false;
    //     }
    // }

    //���get�������
    if (config.method == "get") {
        config.params = {
            ...config.params,
            _t: Date.parse(new Date()) / 1000
        };
    } else {
        config.params = {
            ...config.params,
            _t: Date.parse(new Date()) / 1000
        };
    }
    return config;
});

export function query(url, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params: params, ...config })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

// ��������
export function exportDataExcel(url, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, { ...params }, { responseType: "blob", ...config })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

// ����ģ��
export function exportTemplateExcel(url, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params: params, responseType: "blob", ...config })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}
//Excel����post�������post����Ҳ������get����,�����һЩϵ������
export function importExcel(url, datas, config) {
    return new Promise((resolve, reject) => {
        axios.post(url,datas,config).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

//post�������post����Ҳ������get����
export function post(url, datas, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, datas, { params: params, ...config })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function postForm(url, datas, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, qs.stringify(datas), { params: params, ...config })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function get(url, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params: params, ...config })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function insert(url, datas, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, datas, { params: params, ...config })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function update(url, datas, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, datas, { params: params, ...config })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function remove(url, datas, params, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, datas, { params: params, ...config })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function requestAll(...paramsFun) {
    return new Promise((resolve, reject) => {
        axios
            .all(...paramsFun)
            .then(
                axios.spread(function(...response) {
                    let responseList = [];
                    for (let res of response) {
                        if (!res.status && res.response) {
                            responseList.push(res.response.data);
                        } else {
                            responseList.push(res.data);
                        }
                    }
                    return responseList;
                })
            )
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}
