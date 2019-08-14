import React, { Component } from 'react'
import './styles.css'
import TableData from '../../components/TableData'

// const dataList=[
//     {
//         "field_type":"number",
//         "field_value":"1234",
//         "field_label":"Emp ID",
//         "field_options":[]
        
//     },
//     {
//         "field_type":"text",
//         "field_value":"Abc_xyz",
//         "field_label":"Emp name",
//         "field_options":[]
        
//     },
//     {
//         "field_type":"date",
//         "field_value":"1994-06-16",
//         "field_label":"D.O.B.",
//         "field_options":[]
//     }
// ];
const dataList=[
	{
		"field_type":"text",
		"field_value":"XXXX",
		"field_label":"Company Name",
		"field_options":[]
		
	},
	{
		"field_type":"number",
		"field_value":1111,
		"field_label":"Company ID",
		"field_options":[]
	},
	
	
	{
		"field_type":"dropdown",
		"field_value":"",
		"field_label":"Rating",
		"field_options":[
		{
					"lookupCd":1,
					"lookupValue":1,
					"isSelected":false
		},
		{
					"lookupCd":2,
					"lookupValue":2,
					"isSelected":true
		},
		{
					"lookupCd":3,
					"lookupValue":3,
					"isSelected":false
		},
		{
					"lookupCd":4,
					"lookupValue":4,
					"isSelected":false
		},
		{
					"lookupCd":5,
					"lookupValue":5,
					"isSelected":false
		}
		]
		
	},
	{
		"field_type":"textarea",
		"field_value":"not available",
		"field_label":"Comments",
		"field_options":[]
	}
	];

class Main extends Component {
	constructor(props){
		super(props)
            this.state = {
                originalDataList:dataList,
				dataListWithoutValue:null,
				isDataCopied:false
			};
			this.onUpdateOriginalFields = this.onUpdateOriginalFields.bind(this);
    }

	handlePopulateBtn =()=>{
		this.setState({isDataCopied:true, dataListWithoutValue:this.state.originalDataList});
	};
	onUpdateOriginalFields=(label,value)=>{
	  let fields=JSON.parse(JSON.stringify(this.state.dataListWithoutValue));
	  fields.map((item,index)=>{
		  if(item.field_label===label){
		  if(item.field_type==="dropdown"){
			fields[index].field_options.map((fieldItem)=>{
				if(fieldItem.lookupCd===Number(value)){
					fieldItem.isSelected=true;
				}
				else{
					fieldItem.isSelected=false;
				}
			});

		  }
		  else{
			fields[index].field_value=value;
		}
	}
	  });
	  this.setState({dataListWithoutValue:fields})
	}
	componentDidMount(){
		if(this.state.originalDataList){
			let list=JSON.parse(JSON.stringify(this.state.originalDataList));
			list.map((fieldItem)=>{
				fieldItem.field_value="";
				if(fieldItem.field_type==="dropdown"){
					fieldItem.field_options.map((item)=>{
						item.isSelected=false;
					});
				}
			});
			this.setState({dataListWithoutValue: list});
		}
	}
	render() {
		return (
			<div className="Main">
			<button className="mystyle" type="button" onClick={this.handlePopulateBtn}>Utilize data</button>
				<div className="tableAlignment">
				
				<TableData dataList={this.state.originalDataList} isDataCopied={true} isReadOnly={true} />
				&nbsp;&nbsp;&nbsp;
				{this.state.dataListWithoutValue && this.state.dataListWithoutValue.length>0 &&
					<TableData dataList={this.state.dataListWithoutValue}  isDataCopied={this.state.isDataCopied} isReadOnly={false} onUpdateOriginalFields={this.onUpdateOriginalFields} />
				}
				</div>
                
			</div>
	    )
	}
}

export default Main