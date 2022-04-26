//pdf import
import React, { Component, PureComponent } from 'react';
import jsPDF from 'jspdf';

//end pdfimport


//pdf
//pass infos



export default class pdfGenerator extends Component{
  //Function
jsPdfGenerator = () =>{
  //new doc
  var doc = new jsPDF('landscape','px','a4','false');
  //personalize
  doc.text(20,20,'Report');
  doc.setFont('courier');
  doc.text(20,30,'hihi');
  doc.save("Report.pdf");
}

  //render
  render(){
    return(
    <button onClick={this.jsPdfGenerator}>Get REPORT</button>
    )}

}
