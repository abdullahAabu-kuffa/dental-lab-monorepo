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

export interface ProcessStep {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'completed' | 'active' | 'pending';
}

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
    status: "active",
  },
  {
    id: "3d-printing",
    title: "3D Printing",
    icon: Printer,
    status: "pending",
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