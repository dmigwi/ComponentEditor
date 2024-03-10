import * as blockSchema from "../../../circuito-schema/block.json";
import { supportedControllersUISchema } from "../form/commonfields";

export function blockuiSchema(blocksList, controllersList, supportBlocksList) {
  return {
    name: {
      "ui:readonly": true
    },
    path: {
      "ui:widget": "hidden"
    },
    blockId: {
      "ui:widget": "hidden"
    },
    category: {
      "ui:field": "typeahead",
      typeahead: {
        id: "block-schema-categories",
        options: blockSchema.default.properties.category.items.enum,
        minLength: 0,
        multiple: true
      }
    },
    app: {
      numericName: {
        "ui:widget": "hidden"
      },
      shortName: {
        "ui:widget": "hidden"
      },
      image: {
        "ui:widget": "imagewidget"
      },
      indicators: {
        verified: {
          "ui:widget": "hidden"
        }
      },
      desc: {
        "ui:widget": "textarea",
        "ui:options": {
          rows: 7
        }
      }
    },
    notes: {
      "ui:widget": "textarea",
      "ui:placeholder": "Describe any modification you made in a new line",
      "ui:options": {
        rows: 7
      }
    },
    altComp: {
      cost: {
        "ui:classNames": "two-coloumn-field"
      },
      block: {
        "ui:field": "typeahead",
        "ui:classNames": "two-coloumn-field",
        typeahead: {
          id: "block-list",
          options: blocksList,
          minLength: 0
        }
      }
    },
    circuits: {
      "ui:field": "tabbedarray",
      items: {
        "ui:field": "tabbedobject",
        "ui:options": {
          tabs: [
            {
              name: "Info",
              props: ["name", "cost", "supportedControllers"]
            },
            { name: "Parts", props: ["parts"] },
            { name: "Ports", props: ["ports"] },
            { name: "Wiring", props: ["wires"] },
            { name: "Coders", props: ["coders"] },
            { name: "Support Blocks", props: ["requiredBlocks"] }
          ]
        },
        name: {
          "ui:classNames": "two-coloumn-field"
        },
        cost: {
          "ui:classNames": "two-coloumn-field"
        },
        supportedControllers: supportedControllersUISchema(controllersList),
        parts: {
          "ui:options": {
            orderable: false
          },
          items: {
            name: {
              "ui:classNames": "two-coloumn-field",
              "ui:disabled": "true"
            },
            part: {
              "ui:field": "partfield",
              "ui:classNames": "two-coloumn-field"
            }
          }
        },
        coders: {
          "ui:options": {
            orderable: false
          },
          items: {
            "ui:field": "coderfield"
          }
        },
        wires: {
          items: {
            from: {
              "ui:classNames": "two-coloumn-field",
              "ui:widget": "wiredropdown"
            },
            to: {
              "ui:classNames": "two-coloumn-field",
              "ui:widget": "wiredropdown"
            }
          },
          "ui:options": {
            orderable: false
          }
        },
        ports: {
          "ui:options": {
            orderable: false
          },
          items: {
            "ui:classNames": "Card",
            interface: {
              requires: {
                "ui:options": {
                  orderable: false
                },
                items: {
                  cost: {
                    "ui:classNames": "three-coloumn-field"
                  },
                  spec: {
                    "ui:classNames": "three-coloumn-field",
                    "ui:emptyValue": ""
                  },
                  voltage: {
                    "ui:classNames": "three-coloumn-field"
                  }
                }
              },
              provides: {
                "ui:options": {
                  orderable: false
                },
                items: {
                  spec: {
                    "ui:classNames": "two-coloumn-field",
                    "ui:emptyValue": ""
                  },
                  voltage: {
                    "ui:classNames": "two-coloumn-field"
                  }
                }
              },
              isBus: {
                "ui:widget": "hidden"
              }
            }
          }
        },
        requiredBlocks: {
          "ui:options": {
            orderable: false
          },
          items: {
            cost: {
              "ui:classNames": "two-coloumn-field"
            },
            blocks: {
              "ui:field": "typeahead",
              "ui:options": {
                forceLabelDisplay: true
              },
              "ui:classNames": "two-coloumn-field",
              typeahead: {
                id: "supported-block-list",
                options: supportBlocksList,
                minLength: 0,
                multiple: true
              }
            }
          }
        }
      }
    }
  };
}
