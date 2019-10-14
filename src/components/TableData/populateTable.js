import React, { Component } from 'react'
import "./styles.css"

class PopulateTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			setDropdownData:"",
			clonedList:this.props.items
		}
	}
 componentDidMount(){
	 this.setDropdownValue();
 }
handleChange=(event)=>{
	if(event.target.value){
		this.props.onUpdateOriginalFields(this.state.clonedList.field_label,event.target.value);
	}
}
handleDropdownChange=(event)=>{ 
	if(event.target.value){
		this.setState({setDropdownData: event.target.value});
		this.props.onUpdateOriginalFields(this.state.clonedList.field_label,event.target.value);
	}
}
setDropdownValue=()=>{
	let selectedValue="";
	let selectedArr=this.state.clonedList.field_options.filter((item)=>item.isSelected);
	if(selectedArr.length>0){
		selectedValue=selectedArr[0].lookupValue;
		this.setState({setDropdownData:selectedValue});
	}
}
componentDidUpdate(nextProps){
	if(this.state.clonedList && nextProps.items!==this.state.clonedList){		
		this.setState({ clonedList: nextProps.items }, () => {
			if(this.state.clonedList.field_type === "dropdown"){			
				this.setDropdownValue();
			}
		});
		
	}	
}
	render() {

		if (this.state.clonedList.field_type === "date") {
			return (
				<div>
					<div className="label">{this.state.clonedList.field_label} &nbsp;
						<input type="date" onChange={this.handleChange} name={this.state.clonedList.field_label} value={this.state.clonedList.field_value } readOnly={this.props.isReadOnly} />
					</div>
				</div>
			)
		}
		if (this.state.clonedList.field_type === "number") {
			return (
				<div>
					<div className="label">
						{this.state.clonedList.field_label} &nbsp;
			<input type="number" onChange={this.handleChange} name={this.state.clonedList.field_label} value={this.state.clonedList.field_value} readOnly={this.props.isReadOnly} />
					</div>

				</div>
			)
		}
		if (this.state.clonedList.field_type === "text") {
			return (
				<div>
					<div className="label">
						{this.state.clonedList.field_label} &nbsp;
			<input type="text" onChange={this.handleChange} name={this.state.clonedList.field_label} value={this.state.clonedList.field_value} readOnly={this.props.isReadOnly} />
					</div>

				</div>
			)
		}


		if (this.state.clonedList.field_type === "dropdown") {
			return (
				<div>
					<div className="label">
						{this.state.clonedList.field_label} &nbsp;
						<select onChange={this.handleDropdownChange} value={this.state.setDropdownData} disabled={this.props.isReadOnly}>
          {this.state.clonedList.field_options.map((team) => <option key={team.lookupCd} value={team.lookupValue}>{team.lookupValue}</option>)}
        </select>

					</div>
				</div>
			)
		}
		if (this.state.clonedList.field_type === "textarea") {
			return (
				<div>
					<div className="label">
						{this.state.clonedList.field_label} &nbsp;
			<textarea rows="3" cols="20" onChange={this.handleChange} value={this.state.clonedList.field_value} readOnly={this.props.isReadOnly}>{this.props.isDataCopied ? this.state.clonedList.field_value : ""}</textarea>
					</div>

				</div>
			)
		}

	}
}
export default PopulateTable
