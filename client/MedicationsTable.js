import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';
import { Glass } from 'meteor/clinical:glass-ui';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { FaTags, FaCode, FaPuzzlePiece, FaLock  } from 'react-icons/fa';

Session.setDefault('selectedMedications', []);

export class MedicationsTable extends React.Component {
  getMeteorData() {
    let self = this;

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        block: {
          maxWidth: 250
        },
        checkbox: {
          //marginBottom: 16
        },
        rowText: Glass.darkroom({cursor: 'pointer'})
      },
      selected: [],
      medications: Medications.find().map(function(medication){
        let result = {
          _id: '',
          name: '',
          manufacturer: '',
          activeIngredient: '',
          form: '',
          amount: '',
          activeIngredient: ''
        };

        result._id = get(medication, '_id');
        result.code = get(medication, 'code.coding[0].code');
        result.code = get(medication, 'code.text');
        result.name = get(medication, 'code.coding[0].display');
        result.form = get(medication, 'product.form.coding[0].display');
        result.activeIngredient = get(medication, 'product.ingredient[0].item.display');
        result.amount = get(medication, 'package.content[0].amount.value');
        result.manufacturer = get(medication, 'manufacturer.display');

        // if we get a specific fhirVersion, be explicit about where to get the value
        switch (self.props.fhirVersion) {
          case '1.0.2':
            result.activeIngredient = get(medication, 'product.ingredient[0].item.display');            
            break;      
          case '3.0.1':
            result.activeIngredient = get(medication, 'product.ingredient[0].itemReference.display');            
            break;      
          default:
            // otherwise, walk through the likely steps, if possible
            // may be worth extracting to Medication.prototype.getPrimaryIngredient()
            if(get(medication, 'product.ingredient[0].item.display')){
              result.activeIngredient = get(medication, 'product.ingredient[0].item.display');            
            } else if(get(medication, 'product.ingredient[0].itemReference.display')){
              result.activeIngredient = get(medication, 'product.ingredient[0].itemReference.display');
            }
            break;
        }

        return result;
      })
    };


    return data;
  }
  renderTogglesHeader(){
    if (!this.props.hideToggle) {
      return (
        <th className="toggle">Toggle</th>
      );
    }
  }
  renderToggles(patientId ){
    if (!this.props.hideToggle) {
      return (
        <td className="toggle">
            <Toggle
              defaultToggled={true}
            />
          </td>
      );
    }
  }
  renderIdentifierHeader(){
    if (!this.props.hideIdentifier) {
      return (
        <th className="identifier">Identifier</th>
      );
    }
  }
  renderIdentifier(medication ){
    if (!this.props.hideIdentifier) {
      let classNames = 'identifier';
      if(this.props.barcodes){
        classNames = 'barcode identifier'
      }
      return (
        <td className={classNames}>{ get(medication, 'identifier[0].value') }</td>       );
    }
  }
  renderActionIconsHeader(){
    if (!this.props.hideActionIcons) {
      return (
        <th className='actionIcons' style={{minWidth: '120px'}}>Actions</th>
      );
    }
  }
  renderActionIcons(actionIcons ){
    if (!this.props.hideActionIcons) {
      return (
        <td className='actionIcons' style={{minWidth: '120px'}}>
          <FaLock style={{marginLeft: '2px', marginRight: '2px'}} />
          <FaTags style={{marginLeft: '2px', marginRight: '2px'}} />
          <FaCode style={{marginLeft: '2px', marginRight: '2px'}} />
          <FaPuzzlePiece style={{marginLeft: '2px', marginRight: '2px'}} />          
        </td>
      );
    }
  } 
  rowClick(id){
    Session.set('medicationUpsert', false);
    Session.set('selectedMedicationId', id);
    Session.set('medicationPageTabIndex', 2);
  }
  render () {
    if(process.env.NODE_ENV === "test") console.log("MedicationTable.render()");

    let tableRows = [];
    for (var i = 0; i < this.data.medications.length; i++) {
      tableRows.push(
      <tr className='medicationRow' ref='med-{i}' key={i} style={this.data.style.rowText} onClick={ this.rowClick.bind('this', this.data.medications[i]._id) }>
        { this.renderToggles(this.data.medications[i]) }
        { this.renderActionIcons(this.data.medications[i]) }
        <td className="code hidden-on-phone">{this.data.medications[i].code}</td>
        <td className="name hidden-on-phone">{this.data.medications[i].name}</td>
        <td className="manufacturer hidden-on-phone">{this.data.medications[i].manufacturer}</td>
        <td className="amount">{this.data.medications[i].amount}</td>
        <td className="form">{this.data.medications[i].form}</td>
        <td className="activeIngredient">{this.data.medications[i].activeIngredient}</td>
        { this.renderIdentifier(this.data.medications[i]) }
      </tr>);
    }


    return(
      <Table id="medicationsTable" ref='medicationsTable' hover >
        <thead>
          <tr>
            { this.renderTogglesHeader() }
            { this.renderActionIconsHeader() }
            <th className="code hidden-on-phone">Code</th>
            <th className="name hidden-on-phone">Name</th>
            <th className="manufacturer hidden-on-phone">Manufacturer</th>
            <th className="amount">Amount</th>
            <th className="form">Form</th>
            <th className="activeIngredient">Active ingredient</th>
            { this.renderIdentifierHeader() }
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


MedicationsTable.propTypes = {
  data: PropTypes.array,
  fhirVersion: PropTypes.string,
  query: PropTypes.object,
  paginationLimit: PropTypes.number,
  hideIdentifier: PropTypes.bool,
  hideToggle: PropTypes.bool,
  hideActionIcons: PropTypes.bool,
  barcodes: PropTypes.bool,
  onRowClick: PropTypes.func
};
ReactMixin(MedicationsTable.prototype, ReactMeteorData);
export default MedicationsTable;