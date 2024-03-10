export const svguiSchema = {
  pins: {
    items: {
      name: {
        "ui:classNames": "two-coloumn-field"
      },
      type: {
        "ui:classNames": "two-coloumn-field"
      }
    }
  }
};

export const svgSchema = {
  type: "object",
  required: ["width", "height", "color"],
  properties: {
    name: {
      type: "string",
      title: "Name"
    },
    width: {
      title: "Width [mm]",
      default: 0,
      type: "number"
    },
    height: {
      title: "Height [mm]",
      default: 0,
      type: "number"
    },
    color: {
      title: "Color",
      type: "string",
      default: "Red",
      oneOf: [
        { const: "#CF2F27", title: "Red" },
        { const: "#45925A", title: "Green" },
        { const: "#0B5597", title: "Blue" },
        { const: "#000000", title: "Black" },
        { const: "#338085", title: "Ocean" },
        { const: "#338F85", title: "Purple" }
      ]
    },
    pinTypes: {
      title: "Pin Type",
      type: "string",
      default: "pads",
      enum: ["pads", "headers"]
    },
    pins: {
      type: "array",
      title: "Pins:",
      items: {
        type: "object",
        required: ["name", "type"],
        properties: {
          name: {
            title: "Pin Name:",
            type: "string"
          },
          type: {
            title: "Pin Type:",
            type: "string",
            default: "male",
            enum: ["male", "female"]
          }
        }
      }
    }
  }
};
