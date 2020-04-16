import React,{ Component } from 'react';
import logo from './assets/img/logo.svg';
import './App.css';
import axios from 'axios';
// const passwordHash = require('password-hash');
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component{
  msg='';
  notify = (msg) => toast(msg);
  
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmedPass: '',
      comment:''
    };
  }
  

  mySubmitHandler = (event) => {
    event.preventDefault();
    const newpassword = this.state.newPassword;
    if (this.state.newPassword !== this.state.confirmedPass) {
      this.notify("Passwords don't match");
      }
    else if (this.state.newPassword.length < 8) {
      this.notify("Your password must be at least 8 characters");
    }
    else if (this.state.newPassword.search(/[a-z]/i) < 0) {
      this.notify("Your password must contain at least one letter.");
    } 
    else if (this.state.newPassword.search(/[0-9]/) < 0) {
      this.notify("Your password must contain at least one number."); 
    }
    else if (this.state.newPassword.search(/[A-Z]/i) < 0) {
      this.notify("Your password must contain at least one capital letter."); 
    }
    else{
      axios
      .post('http://localhost:3000/api/signing/passengers/set-new-password', {newpassword}
      //   , {headers: {
      //     'authorization': 'x-login-token'
      //   }
      // }
      )
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        })    
    }
    }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  render(){
    return (
      <div className="row align-items-center my-5">
        <div className="container col-xs-7 col-sm col-md col-lg-6 mx-auto ">
          <div className="card card-signin mx-auto col-lg-8  my-5">
            <div className="card-body">
              <h5 className="card-title text-center">تغيير كلمة السر</h5>
              <form className="form-signin">
                <div className="form-label-group">
                  <input type="password" id="inputpass" 
                    name='newPassword' 
                    onChange={this.myChangeHandler} 
                    className="form-control" 
                    placeholder="كلمة السر الجديدة" 
                    required />
                  <label htmlFor="inputpass">كلمة السر الجديدة</label>
                </div>
                <div className="form-label-group">
                  <input type="password" id="inputPassword" 
                    name='confirmedPass' 
                    onChange={this.myChangeHandler}  
                    className="form-control"
                    placeholder="تأكيد كلمة السر" 
                    required />
                  <label htmlFor="inputPassword">تأكيد كلمة السر</label>
                </div>
                <button className="btn btn-lg  btn-block" 
                  onClick={this.mySubmitHandler}
                  type="submit">تنفيذ
                </button>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
        <div className="logo col-xs-7 col-sm col-md col-lg-5 mx-auto ">
          <img className="masthead-avatar mb-5" src={logo} alt="Logo" />
        </div>
      </div>
    );
  }
}