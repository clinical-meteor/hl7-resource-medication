import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Tabs, Tab } from 'material-ui/Tabs';
import { CardTitle, CardText } from 'material-ui/Card';
import { GlassCard, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';

import MedicationDetail from './MedicationDetail';
import MedicationsTable from './MedicationsTable';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';


Session.setDefault('medicationPageTabIndex', 1);
Session.setDefault('medicationSearchFilter', ''); 
Session.setDefault('selectedMedication', false);


export class MedicationsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('medicationPageTabIndex'),
      medicationSearchFilter: Session.get('medicationSearchFilter'),
      currentMedication: Session.get('selectedMedication')
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("MedicationsPage[data]", data);
    return data;
  }

  handleTabChange(index){
    Session.set('medicationPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedMedication', false);
    Session.set('medicationUpsert', false);
  }

  render() {
    return (
      <div id="medicationsPage">
      <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle
              title="Medications"
            />
            <CardText>
              <Tabs id="medicationsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
                <Tab className="newMedicationTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0} >
                  <MedicationDetail id='newMedication' />
                </Tab>
                <Tab className="medicationListTab" label='Medications' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                  <MedicationsTable />
                </Tab>
                <Tab className="medicationDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                  <MedicationDetail id='medicationDetails' />
                </Tab>
              </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(MedicationsPage.prototype, ReactMeteorData);

export default MedicationsPage;