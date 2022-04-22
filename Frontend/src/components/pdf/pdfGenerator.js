//pdf import
import React, { PureComponent } from 'react';
import jsPDF from 'jspdf';
//end pdfimport


//pdf
//pass infos
/*
pdfGenerator.propTypes = {
    score: PropTypes.string,
  };
*/

export default class pdfGenerator extends PureComponent{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  
  //Function
jsPdfGenerator = () =>{
  //new doc
  var doc = new jsPDF('p','pt');
  //personalize
  doc.text(20,20,'Report');
  doc.setFont('courier');
  doc.text(20,30,'hihi');
  doc.save("Report.pdf");
}

  //render
  render(){
    return(<button onClick={this.jsPdfGenerator}>Get REPORT</button>)
  }

}
