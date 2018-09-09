import SimpleSchema from 'simpl-schema';

// create the object using our BaseModel
Medication = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Medication.prototype._collection = Medications;

// // Create a persistent data store for addresses to be stored.
// // HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');

if(typeof Medications === 'undefined'){
  if(Package['clinical:autopublish']){
    Medications = new Mongo.Collection('Medications');
  } else if(Package['clinical:desktop-publish']){    
    Medications = new Mongo.Collection('Medications');
  } else {
    Medications = new Mongo.Collection('Medications', {connection: null});
  }
}


//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Medications._transform = function (document) {
  return new Medication(document);
};



MedicationSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Medication"
  },
  "code" :  {
    optional: true,
    type: CodeableConceptSchema
  }, // Codes that identify this medication
  "isBrand" :  {
    optional: true,
    type: Boolean
  }, // True if a brand
  "manufacturer" :  {
    optional: true,
    type: ReferenceSchema
  },// (Organization) // Manufacturer of the item
  "product" :  {
    optional: true,
    type: Object
  }, 

  "product.form" :  {
    optional: true,
    type: CodeableConceptSchema
  }, // powder | tablets | carton +
  "product.ingredient" :  {
    type: Array,
    optional: true
  }, 
  "product.ingredient.$" :  {
    type: Object,
    optional: true,
    blackbox: true
  }, 

  "product.batch.$" :  {
    optional: true,
    type: Object
  },

  "product.batch" :  {
    optional: true,
    type: Array
  },
  "product.batch.$.lotNumber" :  {
    optional: true,
    type: String
  },
  "product.batch.$.expirationDate" :  {
    optional: true,
    type: Date
  },
  "package" :  {
    optional: true,
    type: Object
   }, 

  "package.container" :  {
    optional: true,
    type: CodeableConceptSchema
   }, // E.g. box, vial, blister-pack

   "package.content" :  {
    optional: true,
    type: Array
  }, 
   "package.content.$" :  {
    optional: true,
    type: Object
  }, 

  "package.content.$.item" :  {
    optional: true,
    type: ReferenceSchema
  }, //(Medication) }, // R!  A product in the package
  "package.content.$.amount" :  {
    optional: true,
    type: QuantitySchema // (SimpleQuantity)
  }, // Quantity present in the package
  "url": {
    optional: true,
    type: String
  }
});

BaseSchema.extend(MedicationSchema);
DomainResourceSchema.extend(MedicationSchema);
Medications.attachSchema(MedicationSchema);

export default { Medication, Medications, MedicationSchema };