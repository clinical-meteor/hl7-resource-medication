## clinical:hl7-resource-medication

#### Licensing  
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)


#### Integration & Verification Tests  
[![CircleCI](https://circleci.com/gh/clinical-meteor/hl7-resource-medication/tree/master.svg?style=svg)](https://circleci.com/gh/clinical-meteor/hl7-resource-medication/tree/master)


#### API Reference  
The resource in this package implements Medication resource schema, specified at [https://www.hl7.org/fhir/medication.html](https://www.hl7.org/fhir/medication.html). 



#### Installation  

````bash
# to add hl7 resource schemas and rest routes
meteor add clinical:hl7-resource-medication

# to initialize default data
INITIALIZE=true meteor
````


#### Example   

```js
var nyQuill = {
  code: {
    text: "NyQuill"
  },
  isBrand: true,
  manufacturer: {
    display: 'VICKS',
    reference: ''
  },
  product: {
    form: {
      text: 'liquid'
    },
    ingredient: [{
      item: {
        resourceType: 'Substance',
        code: {
          text: 'Acetaminophen'
        },
        description: 'Pain reliever/fever reducer.'
      },
      instance: [{
        quantity: '650 mg'
      }]
    },{
      item: {
        resourceType: 'Substance',
        code: {
          text: 'Dextromethorphan HBr'
        },
        description: 'Cough suppressant.'
      },
      instance: [{
        quantity: '30 mg'
      }]
    },{
      item: {
        resourceType: 'Substance',
        code: {
          text: 'Doxylamine succinate'
        },
        description: 'Antihistamine.'
      },
      instance: [{
        quantity: '12.5 mg'
      }]
    }]
  },
  package: {
    container: {
      text: 'vial'
    },
    content: [{
      amount: {
        value: 12,
        unit: 'fl oz'
      }
    }]
  }
}
Medications.insert(nyQuill);
```


#### Extending the Schema

```js
ExtendedMedicationSchema = new SimpleSchema([
  MedicationSchema,
  {
    "createdAt": {
      "type": Date,
      "optional": true
    }
  }
]);
Medications.attachSchema( ExtendedMedicationSchema );
```


#### Utilities  

If you're working with HL7 FHIR Resources, we recommend using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).

   
#### Acknowledgements     

Many thanks to DxRx Medical, NY Methodist Hospital, and the New Orleans Pharmacy Museum for research and studies conducted in support of this library.  