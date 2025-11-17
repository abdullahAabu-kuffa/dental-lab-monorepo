// app/User/Order/config/orderIcons.ts
import { 
  Package, 
  Eye, 
  Settings, 
  CheckCircle,
  Clock,
  Zap,
  Check,
  X,
  User,
  Crown
} from 'lucide-react';

// Manufacturing process step icons
export const PROCESS_ICONS = {
  orderReceived: Package,
  designReview: Eye,
  manufacturing: Settings,
  qualityCheck: CheckCircle
} as const;

// Status indicator icons
export const STATUS_ICONS = {
  completed: Check,
  inProgress: Zap,
  pending: Clock,
  rejected: X
} as const;

// Export the missing icons for User page
export { User, Crown };

// Export all icons for easy access
export const ORDER_ICONS = {
  ...PROCESS_ICONS,
  ...STATUS_ICONS
} as const;