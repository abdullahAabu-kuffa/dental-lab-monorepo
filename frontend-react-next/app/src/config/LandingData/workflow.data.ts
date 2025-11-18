import { WorkflowStep } from '../../types';

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: 'Consultation',
    description: 'Initial consultation to understand your requirements',
    icon: 'FaUserMd'
  },
  {
    id: 2,
    title: 'Planning',
    description: 'Detailed planning and design phase',
    icon: 'FaClipboardList'
  },
  {
    id: 3,
    title: 'Production',
    description: 'Precision manufacturing with quality control',
    icon: 'FaCogs'
  },
  {
    id: 4,
    title: 'Delivery',
    description: 'Quality assurance testing and delivery',
    icon: 'FaTruck'
  }
];