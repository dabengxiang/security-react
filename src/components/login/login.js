import React from 'react';
import { connect } from 'dva';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

@connect(
    state =>{
        let {login} = state;
        return  {login};
    }
)
class Login extends React.Component{


    constructor(){
        super();
    }

    state = {
        isAuth: '0',
        orderInfo: {
            id: '',
            name: ''
        },
        meFlag : '0'
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.props.dispatch({type:'login/login',data:values}).then(res=>{
                sessionStorage.setItem("isAuth","1");
                this.setState({
                    isAuth: '1'
                });
            });
            
          }
        });
      };



      componentDidMount(){
   
        let isAuth; 
        this.props.dispatch({type:'login/me',data:''}).then(res => {
            console.log(res);

            if(res !== null && res.code === 200 && res.data!=null){
                this.setState({isAuth: '1'});         
            }
            this.setState({meFlag: '1'});        

        })


      }


   

      getLoginHtml(){
        const { getFieldDecorator } = this.props.form;

          return (
          <div style={{width:'350px', margin:'auto' }}>
                <Form  onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input 
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                    <Button type="primary" htmlType="submit" style={{width:'100%'}} className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
                </div>)
                
      }


      ToLoginPage(){
        // window.location.href='www.baidu.com';

        if(this.state.meFlag === '1'){
            window.location.href = "http://auth.immoc.com:9090/oauth/authorize?" +
            'client_id=admin&' +
            'redirect_uri=http://admin.immoc.com:8070/oauth/callback&' +
            'response_type=code';
        }
        this.state.meFlag === '0';

      }

      getOrderInfo(){
          this.props.dispatch({type:'login/getOrderInfo',data:2}).then(res => {
              this.setState({orderInfo:res});
          });
      }



      //这是密码模式的logout 
      passwordlogout(){
        this.props.dispatch({type:'login/logout'}).then(res => {
            sessionStorage.removeItem("isAuth");
        });
      }


      //验证码session管理的logout
      sessionLogout(){
        this.props.dispatch({type:'login/sessionLogout'}).then(res => {
            window.location.href = "http://auth.immoc.com:9090/logout?redirect_uri=http://admin.immoc.com:8000";
        
        }); 
      }


    render(){

        
        const { getFieldDecorator } = this.props.form;
        return (

            <div>
            {

                this.state.isAuth === '0' ? 
                this.ToLoginPage(): 
                <div style={{ width:'350px', margin:'auto' ,marginTop:'300px'}}>
                   <div style={{ fontSize:'large',fontWeight:'bolder' ,color:'blue'}}>
                        welcome to the immoc security
                    </div>
                    <div>
                        id： <font color='green'>{this.state.orderInfo.id}</font>
                    </div>

                    <div>
                        名字: <font color='green'>{this.state.orderInfo.name}</font>

                    </div>
                    <Button type="primary" onClick={()=>this.getOrderInfo()}>
                        getOrderInfo
                    </Button>
                    <br/><br/>
                    <Button type="primary" onClick={()=>this.sessionLogout()}>
                        logout
                    </Button>

                </div>

            }

            </div>

           
        )
  
}

};


export default  Form.create()(Login);


