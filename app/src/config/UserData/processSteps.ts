// Process steps data for order manufacturing process

export interface ProcessStep {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending';
  timestamp?: string;
  details: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: '1',
    name: 'Order Received',
    status: 'completed',
    timestamp: '09:30 AM',
    details: 'Initial order received'
  },
  {
    id: '2',
    name: 'Design Review',
    status: 'pending',
    timestamp: undefined,
    details: 'Design approval in progress'
  },
  {
    id: '3',
    name: 'Manufacturing',
    status: 'pending',
    timestamp: undefined,
    details: 'Production in progress'
  },
  {
    id: '4',
    name: 'Quality Check',
    status: 'pending',
    timestamp: undefined,
    details: 'Final quality inspection'
  }
];

export const updateProcessStepStatus = (
  steps: ProcessStep[], 
  orderStatus: string
): ProcessStep[] => {
  return steps.map(step => {
    if (step.id === '1') {
      // Order Received is always completed
      return { ...step, status: 'completed' as const, timestamp: '09:30 AM' };
    }
    
    if (step.id === '2') {
      // Design Review
      if (orderStatus === 'Design Review') {
        return { ...step, status: 'active' as const, timestamp: '11:15 AM (Active)' };
      } else if (['Manufacturing', 'Quality Check', 'Completed'].includes(orderStatus)) {
        return { ...step, status: 'completed' as const, timestamp: '11:15 AM' };
      }
      return { ...step, status: 'pending' as const, timestamp: undefined };
    }
    
    if (step.id === '3') {
      // Manufacturing
      if (orderStatus === 'Manufacturing') {
        return { ...step, status: 'active' as const, timestamp: '02:00 PM (Active)' };
      } else if (['Quality Check', 'Completed'].includes(orderStatus)) {
        return { ...step, status: 'completed' as const, timestamp: '02:00 PM' };
      }
      return { ...step, status: 'pending' as const, timestamp: undefined };
    }
    
    if (step.id === '4') {
      // Quality Check
      if (orderStatus === 'Quality Check') {
        return { ...step, status: 'active' as const, timestamp: '08:00 PM (Active)' };
      } else if (orderStatus === 'Completed') {
        return { ...step, status: 'completed' as const, timestamp: '08:00 PM' };
      }
      return { ...step, status: 'pending' as const, timestamp: undefined };
    }
    
    return step;
  });
};