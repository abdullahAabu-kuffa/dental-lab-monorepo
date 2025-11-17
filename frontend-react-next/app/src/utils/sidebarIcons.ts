// Ultra-Simplified sidebarIcons - Pure re-export from UnifiedIcons
import { 
  FileText, Plus, Search, CheckCircle, Clock, AlertCircle, Settings, 
  SIDEBAR_ICONS 
} from './UnifiedIcons';

// Re-export the interface (keeping it here since it's sidebar-specific)
export interface SidebarIcon {
  id: string;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  category: 'status' | 'action';
  gradient: string;
  onClick?: () => void;
  count?: number;
}

// Re-export everything
export {
  FileText, Plus, Search, CheckCircle, Clock, AlertCircle, Settings,
  SIDEBAR_ICONS
};