// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (process.env.INITIALIZE) {
    console.log('INITIALZING');
    if (Medications.find().count() === 0) {
    console.log('No Medications found.  Creating some...');

let pharmaKit = {
  inventory: [{
    brandName: "NyQuil",
    quantity: "12 fl oz",
    count: 1,
    activeIngredients: [{
        name: "Acetaminophen",
        dosage: "650 mg",
        purpose: "Pain reliever/fever reducer"
      },
      {
        name: "Dextromethorphan HBr",
        dosage: "30 mg",
        purpose: "Cough suppressant"
      }, 
      {
        name: "Doxylamine succinate",
        dosage: "12.5 mg",
        purpose: "Antihistamine"
      }
    ]
  }, {
    brandName: "Zyrtec",
    quantity: "70",
    quantityType: "tablet",
    count: 1,
    activeIngredients: [{
        name: "Cetinizine HCl",
        dosage: "10 mg",
        purpose: "Antihistamine"
      }
    ]
  }, {
    brandName: "Mentholatum Ointment",
    quantity: "1 oz",
    quantityType: "salve",
    count: 1,
    activeIngredients: [{
        name: "Camphor",
        dosage: "9%",
        purpose: "Topical analgesic"
      },  {
        name: "Menthol, natural",
        dosage: "1.3%",
        purpose: "Topical analgesic"
      }
    ]
  }, {
    brandName: "Hydrogen Peroxide",
    generic: true,
    quantity: "16 fl oz",
    quantityType: "fluid",
    count: 1,
    activeIngredients: [{
        name: "Hydrogen peroxide (stabilized)",
        dosage: "3%",
        purpose: [
          "First aid antiseptic",
          "Oral deriding agent"
        ]
      }
    ]
  },  {
    brandName: "TopCare",
    generic: false,
    quantity: "16 fl oz",
    quantityType: "gel",
    count: 1,
    activeIngredients: [{
        name: "Aloe barbadensis leaf tract ",
        purpose: [
          "analgesic"
        ]
      }
    ]
  },  {
    brandName: "Ace",
    supply: "Joint Bandage",
    generic: false,
    count: 1
  },  {
    brandName: "",
    supply: "Ice pack",
    reusable: true,
    generic: true,
    count: 1
  },  {
    supply: "Hot water bottle",
    reusable: true,
    generic: true,
    count: 1
  },  {
    supply: "Stethoscope",
    reusable: true,
    generic: true,
    count: 1
  },   {
    brandName: "Johnson & Johnson",
    supply: "conforming bandage",
    size: {
      width: "10.2 cm",
      length: "190.5 cm"
    },
    sterile: true,
    reusable: false,
    generic: true,
    count: 1
  }]
}



    }
  }
});
