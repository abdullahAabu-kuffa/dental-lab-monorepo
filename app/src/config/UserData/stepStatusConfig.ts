// Step status configuration data for order process component

import { Clock, CheckCircle } from 'lucide-react';

export interface StepStatusConfig {
  bg: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export const STEP_STATUS_CONFIG: Record<string, StepStatusConfig> = {
  completed: { bg: 'bg-green-100 text-green-600', icon: CheckCircle, label: 'Complete' },
  active: { bg: 'bg-blue-100 text-blue-600', icon: Clock, label: 'Active' },
  pending: { bg: 'bg-gray-100 text-gray-600', icon: Clock, label: 'Pending' }
};

export type StepStatus = 'completed' | 'active' | 'pending';

export const getStepStatusConfig = (status: StepStatus): StepStatusConfig => {
  return STEP_STATUS_CONFIG[status] || STEP_STATUS_CONFIG.pending;
};