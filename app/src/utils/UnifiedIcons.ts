// Unified Icons System - All icons in one place
import {
  // User & Navigation Icons
  User, UserPlus, UserCheck,
  
  // UI Icons  
  Crown, Plus, Search, Settings, CheckCircle, Clock, Package, 
  Upload, Eye, Phone, FileText, Calendar, AlertCircle, Home,
  
  // Status Icons
  Check, X, Activity, Zap,
  
  // Action Icons
  ArrowLeft, Truck, Microscope,
  
  // Business Icons
  CreditCard, TrendingUp, Workflow, List
} from 'lucide-react';

// React Icons for Landing Page
import {
  FaTelegram, FaWhatsapp, FaLinkedin, FaEnvelope, 
  FaMapMarkerAlt, FaUserMd, FaClipboardList, FaCogs, FaTruck
} from 'react-icons/fa';

// Icon Maps for dynamic usage
export const ICON_MAP = {
  // Status icons
  completed: Check,
  inProgress: Zap, 
  pending: Clock,
  rejected: X,
  
  // Process icons
  orderReceived: Package,
  designReview: Eye,
  manufacturing: Settings,
  qualityCheck: CheckCircle,
  
  // Service icons
  crown: Crown,
  tooth: Zap,
  smile: User,
  microscope: Microscope,
  
  // Contact icons
  location: Phone,
  telegram: FaTelegram,
  whatsapp: FaWhatsapp,
  linkedin: FaLinkedin,
  email: FaEnvelope
} as const;

// Helper function to get icon component
export const getIcon = (iconName: string) => {
  return ICON_MAP[iconName as keyof typeof ICON_MAP] || User;
};

// Export everything for easy access
export {
  // User & Navigation Icons
  User, UserPlus, UserCheck,
  
  // UI Icons  
  Crown, Plus, Search, Settings, CheckCircle, Clock, Package, 
  Upload, Eye, Phone, FileText, Calendar, AlertCircle, Home,
  
  // Status Icons
  Check, X, Activity, Zap,
  
  // Action Icons
  ArrowLeft, Truck, Microscope,
  
  // Business Icons
  CreditCard, TrendingUp, Workflow, List,
  
  // React Icons
  FaTelegram, FaWhatsapp, FaLinkedin, FaEnvelope, 
  FaMapMarkerAlt, FaUserMd, FaClipboardList, FaCogs, FaTruck
};

// Type definitions
export type IconName = keyof typeof ICON_MAP;
export type LucideIconName = 'User' | 'Crown' | 'Settings' | 'CheckCircle' | 'Clock' | 'Package' | 'Upload' | 'Eye' | 'Phone' | 'FileText' | 'Calendar' | 'AlertCircle' | 'Home' | 'UserPlus' | 'Activity' | 'Check' | 'X' | 'Zap' | 'ArrowLeft' | 'Truck' | 'Microscope' | 'CreditCard' | 'TrendingUp' | 'Workflow' | 'List';