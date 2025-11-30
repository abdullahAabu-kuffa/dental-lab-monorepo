import { FormField } from "../../types";
import {
  User,
  Crown,
  Zap,
  Settings,
  CheckCircle,
} from "../../utils/UnifiedIcons";
export const NEW_ORDER_FORM_FIELDS: (FormField & { price?: number })[] = [
  // Basic Information
  {
    id: "patientName",
    type: "text",
    label: "Patient's Name",
    required: true,
    validation: {
      pattern: {
        value: "^[A-Za-z\\s]+$",
        message: "Name can only contain letters and spaces.",
      },
      minLength: 3,
    },
  },
  {
    id: "age",
    type: "select",
    label: "Age",
    required: true,
    options: Array.from({ length: 78 }, (_, i) => (18 + i).toString()),
  },

  // Zircon Services with Prices
  {
    id: "zircon_preshaded",
    type: "checkbox",
    label: "Zircon Preshaded",
    price: 250,
  },
  {
    id: "zircon_multilayer",
    type: "checkbox",
    label: "Zircon Multilayer",
    price: 300,
  },
  {
    id: "zircon_ultra_multilayer",
    type: "checkbox",
    label: "Zircon Ultra Multilayer",
    price: 400,
  },
  {
    id: "zircon_cutback",
    type: "checkbox",
    label: "Zircon Cut back (Zircomax)",
    price: 350,
  },
  {
    id: "zircon_layering",
    type: "checkbox",
    label: "Zircon Layering",
    price: 200,
  },

  // E.max Services with Prices
  {
    id: "emax_press",
    type: "checkbox",
    label: "E.Max Press",
    price: 280,
  },
  {
    id: "emax_cad",
    type: "checkbox",
    label: "E.Max Cad",
    price: 320,
  },
  {
    id: "emax_cad_ivoclar",
    type: "checkbox",
    label: "E.Max Cad Ivoclar",
    price: 380,
  },
  {
    id: "emax_cad_cutback",
    type: "checkbox",
    label: "E.Max Cad Cutback",
    price: 360,
  },
  {
    id: "emax_cad_layering",
    type: "checkbox",
    label: "E.Max Cad Layering",
    price: 420,
  },

  // Implant Services with Prices
  {
    id: "implant_cobalt_chromium",
    type: "checkbox",
    label: "Cobalt Chromium Bar + Zircon",
    price: 450,
  },
  {
    id: "implant_nickle_chromium",
    type: "checkbox",
    label: "Nickle Chromium Bar + Zircon",
    price: 420,
  },
  {
    id: "implant_titanium",
    type: "checkbox",
    label: "Titanium Bar + Zircon",
    price: 550,
  },
  {
    id: "implant_gingiva",
    type: "checkbox",
    label: "+ Gingiva",
    price: 180,
  },
  {
    id: "implant_crown",
    type: "checkbox",
    label: "+ Implant Crown",
    price: 320,
  },

  // Other Services with Prices
  {
    id: "resin_tryin_printed",
    type: "checkbox",
    label: "Resin Try-in Printed",
    price: 150,
  },
  {
    id: "model_printed",
    type: "checkbox",
    label: "Model Printed",
    price: 120,
  },
  {
    id: "guide_printed",
    type: "checkbox",
    label: "Guide Printed",
    price: 200,
  },
  {
    id: "pmma_milled",
    type: "checkbox",
    label: "PMMA Milled",
    price: 100,
  },
  {
    id: "night_guard_china",
    type: "checkbox",
    label: "Night Guard China",
    price: 180,
  },
  {
    id: "night_guard_brazil",
    type: "checkbox",
    label: "Night Guard Brazil",
    price: 220,
  },

  // File Upload
  {
    id: "attachment",
    type: "file",
    label: "Attach Documents (X-ray, Photos, etc.)",
    required: false,
  },

  // Notes
  {
    id: "notes",
    type: "textarea",
    label: "Notes",
    required: false,
    validation: {
      minLength: 10,
    },
  },
];

// Form sections configuration
export const FORM_SECTIONS = [
  {
    title: "📋 Basic Information",
    icon: User,
    color: "from-blue-500 to-blue-600",
    fields: NEW_ORDER_FORM_FIELDS.filter((f) =>
      ["patientName", "age"].includes(f.id)
    ),
  },
  {
    title: "🦷 Zircon Services",
    icon: Crown,
    color: "from-purple-500 to-purple-600",
    fields: NEW_ORDER_FORM_FIELDS.filter(
      (f) => f.type === "checkbox" && f.id.startsWith("zircon_")
    ),
  },
  {
    title: "🦷 E.max Services",
    icon: Zap,
    color: "from-green-500 to-green-600",
    fields: NEW_ORDER_FORM_FIELDS.filter(
      (f) => f.type === "checkbox" && f.id.startsWith("emax_")
    ),
  },
  {
    title: "🦷 Implant Services",
    icon: Settings,
    color: "from-orange-500 to-orange-600",
    fields: NEW_ORDER_FORM_FIELDS.filter(
      (f) => f.type === "checkbox" && f.id.startsWith("implant_")
    ),
  },
  {
    title: "🦷 Other Services",
    icon: CheckCircle,
    color: "from-pink-500 to-pink-600",
    fields: NEW_ORDER_FORM_FIELDS.filter(
      (f) =>
        f.type === "checkbox" &&
        !f.id.startsWith("zircon_") &&
        !f.id.startsWith("emax_") &&
        !f.id.startsWith("implant_")
    ),
  },
];

// Section descriptions
export const SECTION_DESCRIPTIONS: Record<string, string> = {
  "📋 Basic Information": "Patient details and order date",
  "🦷 Zircon Services": "Select any zircon services needed",
  "🦷 E.max Services": "Select any e.max services needed",
  "🦷 Implant Services": "Select any implant services needed",
  "🦷 Other Services": "Select any additional services needed",
};

// Helper function to get form sections
export const getFormSections = () => {
  return [
    {
      title: "📋 Basic Information",
      fields: NEW_ORDER_FORM_FIELDS.slice(0, 2),
    },
    { title: "🦷 Zircon Services", fields: NEW_ORDER_FORM_FIELDS.slice(2, 7) },
    { title: "🦷 E.max Services", fields: NEW_ORDER_FORM_FIELDS.slice(7, 12) },
    {
      title: "🦷 Implant Services",
      fields: NEW_ORDER_FORM_FIELDS.slice(12, 17),
    },
    { title: "🦷 Other Services", fields: NEW_ORDER_FORM_FIELDS.slice(17, 23) },
  ];
};

// Helper function to get service fields only
export const getServiceFields = (): FormField[] => {
  return NEW_ORDER_FORM_FIELDS.filter((field) => field.type === "checkbox");
};
