import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';
import { Glass } from 'meteor/clinical:glass-ui';
import { get } from 'lodash';

Session.setDefault('selectedMedications', []);

export class MedicationsTable extends React.Component {
  getMeteorData() {

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
          form: '',
          primaryIngredient: ''
        };

        result._id = get(medication, '_id');
        result.name = get(medication, 'code.text');
        result.manufacturer = get(medication, 'manufacturer.display');
        result.form = get(medication, 'product.form.text');
        result.primaryIngredient = get(medication, 'product.ingredient[0].item.code.text');

        return result;
      })
    };


    return data;
  }


  rowClick(id){
    Session.set('medicationUpsert', false);
    Session.set('selectedMedication', id);
    Session.set('medicationPageTabIndex', 2);
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.medications.length; i++) {
      tableRows.push(
      <tr className='medicationRow' ref='med-{i}' key={i} style={this.data.style.rowText} onClick={ this.rowClick.bind('this', this.data.medications[i]._id) }>
        <td className="check">
          <Toggle
            ref='med-{i}'
            style={this.data.style.checkbox}
          />
        </td>
        <td className="medicationName hidden-on-phone">{this.data.medications[i].name}</td>
        <td className="manufacturerDisplay hidden-on-phone">{this.data.medications[i].manufacturer}</td>
        <td className="medicationForm">{this.data.medications[i].form}</td>
        <td className="activeIngredient">{this.data.medications[i].primaryIngredient}</td>
        <td className="barcode hidden-on-phone">{this.data.medications[i]._id}</td>
      </tr>);
    }


    return(
      <Table id="medicationsTable" ref='medicationsTable' hover >
        <thead>
          <tr>
            <th className="check">prescribed</th>
            <th className="medicationName hidden-on-phone">name</th>
            <th className="manufacturerDisplay hidden-on-phone">manufacturer</th>
            <th className="medicationForm">form</th>
            <th className="activeIngredient">active ingredient</th>
            <th className="id hidden-on-phone">medication._id</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}

ReactMixin(MedicationsTable.prototype, ReactMeteorData);
export default MedicationsTable;