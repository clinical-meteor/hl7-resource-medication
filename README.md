## clinical:hl7-resource-medication

> **NOTICE:  After a very successful run of nearly 50+ pilots and prototypes, this package is being retired and archived.  Future work on FHIR Medication resource is being done in the [clinical:hl7-fhir-data-infrastructure](https://github.com/clinical-meteor/hl7-fhir-data-infrastructure) atmosphere package and the [material-fhir-ui](https://github.com/clinical-meteor/material-fhir-ui) NPM package.**    

> One of our learnings over the 50+ pilots was how to best organize our packages, and we've determined that we want to a) consolidate React pure function components (Tables, Cards, etc) into an NPM package that is accessible to Webpack and other build environments.  And b) we wanted to consolidate the React class components which rely on Meteor's reactive data infrastructure into it's own separate package.  We're also c) moving the Rest server endpoints into a third package.   

> Separating each FHIR resource into it's own package was a time consuming task; but was definately worth.  Over the 50+ pilots, we were able to track usage patterns and what functionality was specific to each resource and what was shared, common, infrastructure.  Our refactor back into a consolidated package architecture will be based on all those learnings, and we look forward to publishing some of the best FHIR UI libraries on the web.  

#### Licensing  
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

#### API Reference  
The resource in this package implements Medication resource schema, specified at [https://www.hl7.org/fhir/DSTU2/medication.html](https://www.hl7.org/fhir/DSTU2/medication.html). 



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


#### Substances      

https://www.npr.org/sections/thesalt/2019/02/24/696272090/cultured-a-look-at-how-foods-can-help-the-microbes-inside-us-thrive?utm_source=facebook.com&utm_medium=social&utm_campaign=npr&utm_term=nprnews&utm_content=20190224&fbclid=IwAR39W3TdloqIqHLy_UHOrj8xD37iUN3DjirojEVPCV_q41O15LtlpjtRELA
