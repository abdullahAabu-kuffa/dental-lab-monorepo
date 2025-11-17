import {
  Upload,
  Box,
  Layers,
  Printer,
  Wrench,
  Microscope,
  Package,
  Truck
} from 'lucide-react';
import { ProcessStep } from '../types';

// ProcessStep interface is now imported from the consolidated types file

export const MANUFACTURING_STEPS: ProcessStep[] = [
  {
    id: "file-uploaded",
    title: "File Uploaded",
    icon: Upload,
    status: "completed",
  },
  {
    id: "3d-design",
    title: "3D Design", 
    icon: Box,
    status: "completed",
  },
  {
    id: "material-selection",
    title: "Material Selection",
    icon: Layers,
    status: "completed",
  },
  {
    id: "3d-printing",
    title: "3D Printing",
    icon: Printer,
    status: "active",
  },
  {
    id: "post-processing",
    title: "Post Processing",
    icon: Wrench,
    status: "pending",
  },
  {
    id: "quality-check",
    title: "Quality Check",
    icon: Microscope,
    status: "pending",
  },
  {
    id: "packaging",
    title: "Packaging",
    icon: Package,
    status: "pending",
  },
  {
    id: "delivery",
    title: "Delivery",
    icon: Truck,
    status: "pending",
  },
];

// Legacy compatibility for WelcomePage
export const USER_PROCESS_STEPS = MANUFACTURING_STEPS.map(step => ({
  icon: step.icon,
  title: step.title,
  completed: step.status === 'completed' || step.status === 'active'
}));