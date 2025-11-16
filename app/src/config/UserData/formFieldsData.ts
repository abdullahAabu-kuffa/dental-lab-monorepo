export interface FormField {
  id: string;
  type: 'text' | 'checkbox' | 'textarea' | 'file';
  label: string;
  required?: boolean;
}

// Form fields data
export const NEW_ORDER_FORM_FIELDS: FormField[] = [
  // Basic Information
  {
    id: 'patientName',
    type: 'text',
    label: 'Patient\'s Name',
    required: true
  },
  {
    id: 'date',
    type: 'text',
    label: 'Date',
    required: true
  },

  // Zircon Services
  {
    id: 'zircon_preshaded',
    type: 'checkbox',
    label: 'Zircon Preshaded'
  },
  {
    id: 'zircon_multilayer',
    type: 'checkbox',
    label: 'Zircon Multilayer'
  },
  {
    id: 'zircon_ultra_multilayer',
    type: 'checkbox',
    label: 'Zircon Ultra Multilayer'
  },
  {
    id: 'zircon_cutback',
    type: 'checkbox',
    label: 'Zircon Cut back (Zircomax)'
  },
  {
    id: 'zircon_layering',
    type: 'checkbox',
    label: 'Zircon Layering'
  },

  // E.max Services
  {
    id: 'emax_press',
    type: 'checkbox',
    label: 'E.Max Press'
  },
  {
    id: 'emax_cad',
    type: 'checkbox',
    label: 'E.Max Cad'
  },
  {
    id: 'emax_cad_ivoclar',
    type: 'checkbox',
    label: 'E.Max Cad Ivoclar'
  },
  {
    id: 'emax_cad_cutback',
    type: 'checkbox',
    label: 'E.Max Cad Cutback'
  },
  {
    id: 'emax_cad_layering',
    type: 'checkbox',
    label: 'E.Max Cad Layering'
  },

  // Implant Services
  {
    id: 'implant_cobalt_chromium',
    type: 'checkbox',
    label: 'Cobalt Chromium Bar + Zircon'
  },
  {
    id: 'implant_nickle_chromium',
    type: 'checkbox',
    label: 'Nickle Chromium Bar + Zircon'
  },
  {
    id: 'implant_titanium',
    type: 'checkbox',
    label: 'Titanium Bar + Zircon'
  },
  {
    id: 'implant_gingiva',
    type: 'checkbox',
    label: '+ Gingiva'
  },
  {
    id: 'implant_crown',
    type: 'checkbox',
    label: '+ Implant Crown'
  },

  // Other Services
  {
    id: 'resin_tryin_printed',
    type: 'checkbox',
    label: 'Resin Try-in Printed'
  },
  {
    id: 'model_printed',
    type: 'checkbox',
    label: 'Model Printed'
  },
  {
    id: 'guide_printed',
    type: 'checkbox',
    label: 'Guide Printed'
  },
  {
    id: 'pmma_milled',
    type: 'checkbox',
    label: 'PMMA Milled'
  },
  {
    id: 'night_guard_china',
    type: 'checkbox',
    label: 'Night Guard China'
  },
  {
    id: 'night_guard_brazil',
    type: 'checkbox',
    label: 'Night Guard Brazil'
  },

  // File Upload
  {
    id: 'attachment',
    type: 'file',
    label: 'Attach Documents (X-ray, Photos, etc.)',
    required: false
  },

  // Notes
  {
    id: 'notes',
    type: 'textarea',
    label: 'Notes',
    required: false
  }
];

// Helper function to get form sections
export const getFormSections = () => {
  return [
    { title: '📋 Basic Information', fields: NEW_ORDER_FORM_FIELDS.slice(0, 2) },
    { title: '🦷 Zircon Services', fields: NEW_ORDER_FORM_FIELDS.slice(2, 7) },
    { title: '🦷 E.max Services', fields: NEW_ORDER_FORM_FIELDS.slice(7, 12) },
    { title: '🦷 Implant Services', fields: NEW_ORDER_FORM_FIELDS.slice(12, 17) },
    { title: '🦷 Other Services', fields: NEW_ORDER_FORM_FIELDS.slice(17, 23) }
  ];
};

// Helper function to get service fields only
export const getServiceFields = (): FormField[] => {
  return NEW_ORDER_FORM_FIELDS.filter(field => field.type === 'checkbox');
};