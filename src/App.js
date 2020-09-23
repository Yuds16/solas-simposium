import React, { Component } from 'react';
import { forwardRef } from 'react';
import './App.css';
import Tabletop from 'tabletop';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const SHEET_ID = '1CvuBgaAY0DtayM3yy9WAH5MU-dUwyTkx_iHN1ZDZP-8';
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./config/service_account.json');

async function agree(row, admin) {
  try {
    const doc = new GoogleSpreadsheet(SHEET_ID);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    
    await sheet.loadCells();
    const target = sheet.getCell(row, admin);

    target.value = "Agree";
    await sheet.saveUpdatedCells();

    window.location.reload();
  } catch (err) {
    console.log(err);
    alert("Failed to complete action, please contact maintainance.");
  }
}

async function disagree(row, admin) {
  try {
    const doc = new GoogleSpreadsheet(SHEET_ID);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    
    await sheet.loadCells();
    const target = sheet.getCell(row, admin);

    target.value = "Disagree";
    await sheet.saveUpdatedCells();

    window.location.reload();
  } catch (err) {
    console.log(err);
    alert("Failed to complete action, please contact maintainance.");
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      password: "",
      value: 1,
    }

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value})
  }

  handleRowChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    
    Tabletop.init({
      key: SHEET_ID,
      callback: googleData => {
        this.setState({
          data: googleData
        })
      },
      simpleSheet: true
    })
  }

  updateAgree = (e) => {
    if (this.state.password === "password1") {
      agree(parseInt(this.state.value, 10), 4);
    } else if (this.state.password === "password2") {
      agree(parseInt(this.state.value, 10), 5);
    } else if (this.state.password === "password3") {
      agree(parseInt(this.state.value, 10), 6);
    } else {
      alert("Wrong Password");
    }
    e.preventDefault(true);
  }

  updateDisagree = (e) => {
    if (this.state.password === "password1") {
      disagree(parseInt(this.state.value, 10), 4);
    } else if (this.state.password === "password2") {
      disagree(parseInt(this.state.value, 10), 5);
    } else if (this.state.password === "password3") {
      disagree(parseInt(this.state.value, 10), 6);
    } else {
      alert("Wrong Password");
    }
    e.preventDefault(true);
  }

  render() {
    const { data } = this.state;
    var someData = [];

    return (
      <div>   
        <div>
          {
            data.map(obj => {
              if (obj.Request !== "" && obj.Doctor !== "") {
                someData.push({
                  request: obj.Request,
                  sales: obj.Sales,
                  doctor: obj.Doctor,
                  docName: obj.docName,
                  status: obj.Status,
                  detail: obj.Detail,
                })
              }
            })
          }
          
          <MaterialTable
            icons={tableIcons}
             columns={[
                { title: 'Kode Permintaan', field: 'request' },
                { title: 'Sales', field: 'sales' },
                { title: 'Kode Dokter', field: 'doctor' },
                { title: 'Name Dokter', field: 'docName' },
                { title: 'Detail', field: 'detail' },
                { title: 'Status', field: 'status'},
              ]}
              data = {someData}
              title =  "Simposium"          
          />
        </div>
        <br></br>
        <br></br>
        <div className="container">
          <form>
            <label>
              Password:
              <input type="password" onChange={this.handlePasswordChange} />
            </label>
            <br></br>
            <br></br>
            <label>
              Kode Permintaan:
              <input type="text" onChange={this.handleRowChange} />
            </label>
            <br></br>
            <input type="submit" className="button"  name="buttonAgree" value="Agree" onClick={this.updateAgree} />
            <input type="submit" className="right button" name="buttonDisagree" value="Disagree" onClick={this.updateDisagree} />
          </form>
          <br></br>
        </div>
      </div>
    );
  }
}

export default App;