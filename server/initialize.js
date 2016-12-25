// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (process.env.INITIALIZE) {
    console.log('INITIALZING');
    // if (Medications.find().count() === 0) {
    //   console.log('No Medications found.  Creating some...');

    var pharmaKit = {
      inventory: [{
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
      },

      {
        resourceType: 'Medication',
        code: {
          text: "Zyrtec"
        },
        isBrand: true,
        manufacturer: {
          display: '',
          reference: ''
        },
        product: {
          form: {
            text: 'tablet'
          },
          ingredient: [{
            item: {
              resourceType: 'Substance',
              code: {
                text: 'Cetinizine HCl'
              },
              description: 'Antihistamine'
            },
            instance: [{
              quantity: '10 mg'
            }]
          }]
        },
        package: {
          container: {
            text: 'bottle'
          },
          content: [{
            amount: {
              value: 70,
              unit: 'tablet'
            }
          }]
        }
      },

      {
        resourceType: 'Medication',
        code: {
          text: "Mentholatum Ointment"
        },
        isBrand: true,
        manufacturer: {
          display: '',
          reference: ''
        },
        product: {
          form: {
            text: 'salve'
          },
          ingredient: [{
            item: {
              resourceType: 'Substance',
              code: {
                text: 'Camphor'
              },
              description: 'Topical analgesic'
            },
            instance: [{
              quantity: '9%'
            }]
          },{
            item: {
              resourceType: 'Substance',
              code: {
                text: 'Menthol, natural'
              },
              description: 'Topical analgesic'
            },
            instance: [{
              quantity: '1.3%'
            }]
          }]
        },
        package: {
          container: {
            text: ''
          },
          content: [{
            amount: {
              value: 1,
              unit: 'fl oz'
            }
          }]
        }
      },
      {
        resourceType: 'Medication',
        code: {
          text: "Hydrogen Peroxide"
        },
        isBrand: true,
        manufacturer: {
          display: '',
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
                text: 'Hydrogen peroxide (stabilized)'
              },
              description: 'First aid antiseptic, Oral deriding agent'
            },
            instance: [{
              quantity: '3%'
            }]
          }]
        },
        package: {
          container: {
            text: 'liquid'
          },
          content: [{
            amount: {
              value: 16,
              unit: 'fl oz'
            }
          }]
        }
      },
      {
        resourceType: 'Medication',
        code: {
          text: "TopCare"
        },
        isBrand: true,
        manufacturer: {
          display: '',
          reference: ''
        },
        product: {
          form: {
            text: 'gel'
          },
          ingredient: [{
            item: {
              resourceType: 'Substance',
              code: {
                text: 'Aloe barbadensis leaf tract'
              },
              description: 'analgesic'
            }
          }]
        },
        package: {
          container: {
            text: 'bottle'
          },
          content: [{
            amount: {
              value: 16,
              unit: 'fl oz'
            }
          }]
        }
      },



      // ---------------------------------------------------------
      // below probably doesn't work
      // {
      //   brandName: 'NyQuill',
      //   quantity: '70',
      //   quantityType: 'liquid',
      //   count: 1,
      //   activeIngredients: [{
      //     name: 'Cetinizine HCl',
      //     dosage: '10 mg',
      //     purpose: 'Antihistamine'
      //   }]
      // },
      // {
      //   brandName: 'Zyrtec',
      //   quantity: '70',
      //   quantityType: 'tablet',
      //   count: 1,
      //   activeIngredients: [{
      //     name: 'Cetinizine HCl',
      //     dosage: '10 mg',
      //     purpose: 'Antihistamine'
      //   }]
      // },
      // {
      //   brandName: 'Mentholatum Ointment',
      //   quantity: '1 oz',
      //   quantityType: 'salve',
      //   count: 1,
      //   activeIngredients: [{
      //     name: 'Camphor',
      //     dosage: '9%',
      //     purpose: 'Topical analgesic'
      //   },  {
      //     name: 'Menthol, natural',
      //     dosage: '1.3%',
      //     purpose: 'Topical analgesic'
      //   }]
      // },
      // {
      //   brandName: 'Hydrogen Peroxide',
      //   generic: true,
      //   quantity: '16 fl oz',
      //   quantityType: 'fluid',
      //   count: 1,
      //   activeIngredients: [{
      //     name: 'Hydrogen peroxide (stabilized)',
      //     dosage: '3%',
      //     purpose: [
      //       'First aid antiseptic',
      //       'Oral deriding agent'
      //     ]}
      //   ]
      // },
      // {
      //   brandName: 'TopCare',
      //   generic: false,
      //   quantity: '16 fl oz',
      //   quantityType: 'gel',
      //   count: 1,
      //   activeIngredients: [{
      //     name: 'Aloe barbadensis leaf tract ',
      //     purpose: [
      //       'analgesic'
      //     ]}
      //   ]
      // },


      ]
    };

    pharmaKit.inventory.forEach(function(medication){
      if (Medications.find({brandName: medication.brandName}).count() === 0) {
        Medications.insert(medication);
      }
    });



    //}
  }
});





var medicationTemplate = {
  resourceType: 'Medication',
  code: {
    text: "TopCare"
  },
  isBrand: true,
  manufacturer: {
    display: '',
    reference: ''
  },
  product: {
    form: {
      text: 'gel'
    },
    ingredient: [{
      item: {
        resourceType: 'Substance',
        code: {
          text: ''
        },
        description: ''
      },
      instance: [{
        quantity: ''
      }]
    }]
  },
  package: {
    container: {
      text: 'bottle'
    },
    content: [{
      amount: {
        value: 16,
        unit: 'fl oz'
      }
    }]
  }
};


var supplies = [{
  brandName: 'Ace',
  supply: 'Joint Bandage',
  generic: false,
  count: 1
},
{
  brandName: '',
  supply: 'Ice pack',
  reusable: true,
  generic: true,
  count: 1
},
{
  supply: 'Hot water bottle',
  reusable: true,
  generic: true,
  count: 1
},
{
  supply: 'Stethoscope',
  reusable: true,
  generic: true,
  count: 1
},
{
  brandName: 'Johnson & Johnson',
  supply: 'conforming bandage',
  size: {
    width: '10.2 cm',
    length: '190.5 cm'
  },
  sterile: true,
  reusable: false,
  generic: true,
  count: 1
}];
