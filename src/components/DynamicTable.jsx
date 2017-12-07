import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'
import Delete from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'
import {red500} from 'material-ui/styles/colors'
import _ from 'lodash'


class DeleteButton extends React.Component {

  _handleDelete = () => {
    this.props.delete(this.props.item);
  }
  render() {
    return(
      <IconButton onTouchTap={this._handleDelete}>
        <Delete color={red500} />
      </IconButton>
    )
  }
}



class DynamicTable extends React.Component {

  constructor(){
    super()
  }

  _handleDelete = () => {
    this.props.delete(this.props.r_id);
  }

  onRowSelect = (selectedRows) => {
    if(this.props.onRowSelection != null){
      this.props.onRowSelection(selectedRows)
    } 
  }

  render() {
    let multiSelectable = (this.props.multiSelectable == null ? false : true)
    let header = [];
    let index = 0;
    let classname = '';
    for(let k in this.props.tableData[0]){
      if(this.props.hideKey == true && k == this.props.primaryKey){ classname = 'none'}
      header.push(<TableHeaderColumn style={{position: 'static', display: classname}} key={index++}>{_.startCase(k)}</TableHeaderColumn>);
      classname= ''
    }
    //Push remove column label
    if(this.props.removeEnabled){ header.push(<TableHeaderColumn style={{position: 'static'}} key={index++}>Delete</TableHeaderColumn>) }

    let rows = [];

    classname= ''
    for(let r in this.props.tableData){
      let cols = []
      for(let k in this.props.tableData[r]){
        if(this.props.hideKey == true && k == this.props.primaryKey){ classname = 'none'}
        cols.push(
          <TableRowColumn style={{display: classname}} key={index++}>
            {this.props.tableData[r][k]}
          </TableRowColumn>
        )
        classname= ''
      }
      //Push a remove button if enabled
      if(this.props.removeEnabled){ cols.push(
                                                <TableRowColumn key={index++}>
                                                  <DeleteButton delete={this.props.delete} item={this.props.tableData[r]} r_id={this.props.tableData[r][this.props.primaryKey]} />
                                                </TableRowColumn>
                                              )
      }

      let s = (rows.length === this.props.selectedRow ? true : false)
      let enable_rowclick = this.props.onRowClick
      rows.push(
        <TableRow onTouchTap={ (enable_rowclick == null ? () => {null} : () => {this.props.onRowClick(this.props.tableData[r][this.props.primaryKey])} ) } selected={s} key={index++}>
          {cols}
        </TableRow>
      )
    }

    return(
      <div style={{display: (this.props.tableData.length == 0 ? 'none' : 'block')}}>
      <Table 
        className='dTable'
        onRowSelection={this.onRowSelect}
        multiSelectable={multiSelectable} fixedHeader={false} onCellClick={this.props.cellClick}> 
        <TableHeader adjustForCheckbox={multiSelectable} displaySelectAll={multiSelectable}>
          <TableRow>
            {header}
          </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={multiSelectable}>
          {rows}
        </TableBody>
      </Table>


      </div>
    );
  }
}

export default DynamicTable;
