// User process steps data
import { Crown, Upload, Settings, Eye, FileText, Truck, CheckCircle, Clock } from '../../utils/UnifiedIcons';

export const USER_PROCESS_STEPS = [
  {
    id: 1,
    title: 'Upload Case',
    icon: Upload,
    completed: true,
    description: 'Upload dental impressions and specifications'
  },
  {
    id: 2,
    title: 'Material Selection',
    icon: Crown,
    completed: true,
    description: 'Choose from premium dental materials'
  },
  {
    id: 3,
    title: 'Design Process',
    icon: Settings,
    completed: false,
    description: 'Custom design and manufacturing'
  },
  {
    id: 4,
    title: 'Quality Check',
    icon: Eye,
    completed: false,
    description: 'Thorough quality assurance'
  },
  {
    id: 5,
    title: 'Documentation',
    icon: FileText,
    completed: false,
    description: 'Case documentation and reports'
  },
  {
    id: 6,
    title: 'Shipping',
    icon: Truck,
    completed: false,
    description: 'Secure delivery to your clinic'
  },
  {
    id: 7,
    title: 'Completion',
    icon: CheckCircle,
    completed: false,
    description: 'Order completed successfully'
  },
  {
    id: 8,
    title: 'Review',
    icon: Clock,
    completed: false,
    description: 'Client feedback and review'
  }
] as const;