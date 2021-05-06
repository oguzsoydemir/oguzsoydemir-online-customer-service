import React from "react";
import { connect } from "react-redux";
import { Login } from "../../../reducers/admin.reducers";
//import AdminChat from "../AdminChat/AdminChat";
import "./AdminLogin.css";

export class AdminLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      adminID: null,
      name: "",
      password: "",
    };
  }

  fetchData() {
    fetch(`http://localhost:5000/admin/select?name=${this.state.name}&password=${this.state.password}`)
      .then((response) => response.json())
      .then((response) => {
        const data = response.data;
        if (data) {
          this.setState({ adminID: data[0].adminID });
          this.setState({ name: data[0].name });
          this.setState({ password: data[0].password });
          const admin = {
            adminID: this.state.adminID,
            name: this.state.name,
            password: this.state.password,
          };
          this.props.loginAdminData(admin);
          this.props.history.push("/adminchat", this.state);
        } else {
          alert("Kullanıcı bulunamadı\nLütfen tekrar deneyiniz.");
        }
      })
      .catch((err) => console.log(err));
  }

  onUserClick(e) {
    e.preventDefault();
    this.fetchData();

    //alert(this.props);
    //this.props.history.push("/adminchat");
  }
  //<button className="button2 mt-10" onClick={this.onUserClick.bind(this)}>
  render() {
    return (
      <div className="outContainer2">
        <div className="inputContainer2">
          <form>
            <h3 className="heading2">Yönetici Girişi</h3>
            <input className="input2 m-tb-5" type="text" placeholder="Kullanıcı adı" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} />

            <input className="input2 m-tb-5" type="password" name="password" placeholder="Şifre" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />

            <button className="button2 mt-10" onClick={this.onUserClick.bind(this)}>
              <b>Giriş</b>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginAdminData: (admin) => dispatch(Login(admin)),
  };
}

function mapStateToProps(state) {
  return {
    adminData: {},
  };
}
//export default connect(undefined, mapDispatchToProps)(AdminLogin);
export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
