import React from 'react';
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
const ACCESS_TOKEN = 'ya29.a0AfH6SMDhw5N4b0I5Nk7YWiMgxzVisIXLwEU2HkUGIulxylWvkaEOpnLVNG2avXpikMENNIqPtuVR4eV3M_OXSaxdRwiS9TTtan1SJdGs9w5MjrhP-ztv1KjCZrpbKzr_6MQt66Ap8j8dGYiNVKkcHki0IctKBKQK1oE'

class App extends React.Component {
    
    
  constructor() {
    super()
    this.state = {
      data: [],
      value: 1
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    
    Tabletop.init({
      key: '1CvuBgaAY0DtayM3yy9WAH5MU-dUwyTkx_iHN1ZDZP-8',
      callback: googleData => {
        this.setState({
          data: googleData
        })
      },
      simpleSheet: true
    })
  }

  updateAgree = () => {
    var start = 0;
    var end = 0;
    start = this.state.value;
    end = parseInt(this.state.value, 10) + 1;
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //update this token with yours. 
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({

        requests: [{
          repeatCell: {
            range: {
              startColumnIndex: 3,
              endColumnIndex: 4,
              startRowIndex: start,
              endRowIndex: end,
              sheetId: 0
            },
            cell: {
              "userEnteredValue": {
                    "numberValue": 1
                },
                "userEnteredFormat": {
                    "horizontalAlignment": "CENTER",
                    "verticalAlignment": "MIDDLE",
                    "numberFormat": {
                        "pattern": "\"AGREE\"",
                        "type": "NUMBER"
                    }
                }
            },
            fields: "*"
          }
        }]

      })
    })
  }

  updateDisagree = () => {
    var start = 0;
    var end = 0;
    start = this.state.value;
    end = parseInt(this.state.value, 10) + 1;
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}:batchUpdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //update this token with yours. 
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({

        requests: [{
          repeatCell: {
            range: {
              startColumnIndex: 3,
              endColumnIndex: 4,
              startRowIndex: start,
              endRowIndex: end,
              sheetId: 0
            },
            cell: {
              "userEnteredValue": {
                    "numberValue": 0
                },
                "userEnteredFormat": {
                    "horizontalAlignment": "CENTER",
                    "verticalAlignment": "MIDDLE",
                    "numberFormat": {
                        "pattern": "\"DISAGREE\"",
                        "type": "NUMBER"
                    }
                }
            },
            fields: "*"
          }
        }]

      })
    })
  }

  render() {
    const { data } = this.state;
      
    var someData = []
      
    return (
      <div>   
         <div>
          {
            data.map(obj => {
              
                  someData.push({
                    request: obj.Request,
                    doctor: obj.Doctor,
                    status: obj.Status,
                  })      
              
            })
          }
          
          <MaterialTable
            icons={tableIcons}
             columns={[
                { title: 'Request Code', field: 'request' },
                { title: 'Doctor Code', field: 'doctor' },
                { title: 'Status', field: 'status'},
              ]}
              data = {someData}
              title =  "Simposium"          

          /> 
        </div>
        <form>
          <label>
            Kode:   REQ-
            <input type="number" onChange={this.handleChange} />
          </label>
          <input type="submit" name="button" value="Agree" onClick={this.updateAgree} />
          <input type="submit" name="button" value="Disagree" onClick={this.updateDisagree} />
        </form>
      </div>
    );
  }
}

export default App;