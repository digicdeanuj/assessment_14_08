import React, { Component } from 'react'
import "./styles.css"
import PopulateTable from './populateTable';

class TableData extends Component {
	constructor(props){
		super(props);
		this.state={
			finalDataList:JSON.parse(JSON.stringify(this.props.dataList)),
		}
    }
    
	componentWillUpdate(nextProps){
		if(this.state.finalDataList && nextProps.dataList!==this.state.finalDataList){
			this.setState({finalDataList: nextProps.dataList});
		}
	}
    render() {		
		return (
		<div>
           <div className="BorderBox">
		   {this.state.finalDataList && this.state.finalDataList.map((items,index)=>{
						return <PopulateTable  items={items} isDataCopied={this.props.isDataCopied} isReadOnly={this.props.isReadOnly} onUpdateOriginalFields={this.props.onUpdateOriginalFields} key={index}/>
						})
					}
		   </div>                
        </div>
        )
	}
}
export default TableData
				