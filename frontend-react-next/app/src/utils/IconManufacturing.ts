// Ultra-Simplified IconManufacturing - Pure re-export from UnifiedIcons
import { 
  MANUFACTURING_STEPS,
  Upload, 
  Box, 
  Layers, 
  PrinterIcon, 
  Wrench, 
  Microscope, 
  Package, 
  Truck 
} from './UnifiedIcons';

// Re-export everything
export {
  MANUFACTURING_STEPS,
  Upload, 
  Box, 
  Layers, 
  PrinterIcon, 
  Wrench, 
  Microscope, 
  Package, 
  Truck
};

// Legacy compatibility for WelcomePage
export const USER_PROCESS_STEPS = MANUFACTURING_STEPS.map(step => ({
  icon: step.icon,
  title: step.title,
  completed: step.status === 'completed' || step.status === 'active'
}));