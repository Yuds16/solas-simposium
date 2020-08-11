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

class App extends React.Component {
    
    
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    
    Tabletop.init({
      key: '1EDiit5C2L-RFA8BmIfJ_uLp8iLylTO6Hi3wH33QMq_g',
      callback: googleData => {
        this.setState({
          data: googleData
        })
      },
      simpleSheet: true
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
                    nama: obj.Sales,
                    kode: obj.Dokter,
                    tanggal: obj.Tanggal,
                    waktu: obj.Waktu,
                    status: obj.Status,
                  })      
              
            })
          }
          
          <MaterialTable
            icons={tableIcons}
             columns={[
                { title: 'Nama Sales', field: 'nama' },
                { title: 'Kode Dokter', field: 'kode' },
                { title: 'Waktu', field: 'waktu'},
                { title: 'Tanggal', field: 'tanggal'},
                { title: 'Status', field: 'status'},
              ]}
              data = {someData}
              title =  "Monitoring"          

          /> 
        </div>
      </div>

    );
  }
}

export default App;