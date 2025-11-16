import { ProcessStep } from '../types';
import { 
  Upload, 
  FileText, 
  Settings, 
  Eye, 
  CheckCircle, 
  Truck, 
  Clock,
  Award 
} from 'lucide-react';

export const MANUFACTURING_STEPS: ProcessStep[] = [
  {
    id: '1',
    title: 'Upload',
    icon: Upload,
    status: 'completed'
  },
  {
    id: '2', 
    title: 'Review',
    icon: FileText,
    status: 'completed'
  },
  {
    id: '3',
    title: 'Design',
    icon: Settings,
    status: 'active'
  },
  {
    id: '4',
    title: 'Quality Check',
    icon: Eye,
    status: 'pending'
  },
  {
    id: '5',
    title: 'Production',
    icon: CheckCircle,
    status: 'pending'
  },
  {
    id: '6',
    title: 'Final QA',
    icon: Award,
    status: 'pending'
  },
  {
    id: '7',
    title: 'Shipping',
    icon: Truck,
    status: 'pending'
  },
  {
    id: '8',
    title: 'Delivery',
    icon: Clock,
    status: 'pending'
  }
];