
// UNIFIED ICONS SYSTEM - Single Source of Truth for All Icons

// Lucide React Icons - All available icons
import {
  // User & Navigation Icons
  User, UserPlus, UserCheck, Home, UserCircle, UserX, Globe,
  
  // UI Icons
  Crown, Plus, Minus, Search, Settings, CheckCircle, Clock, Package,
  Upload, Eye, Phone, FileText, Calendar, AlertCircle, Activity,
  Play, Pause, Filter, RefreshCw, Download, Share2, Heart, Star,
  
  // Status Icons
  Check, X, Zap, Award, Shield, AlertTriangle, CheckCircle2, XCircle,
  
  // Action Icons
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Edit, Trash2, Copy,
  ExternalLink, Link, Save, Printer, Send, Menu, X as XIcon,
  
  // Business Icons
  CreditCard, TrendingUp, TrendingDown, Workflow, List, Grid3X3,
  BarChart3, PieChart, DollarSign, ShoppingCart, ShoppingBag, Briefcase, Truck,
  
  // Manufacturing Icons
  Box, Layers, Printer as PrinterIcon, Wrench, Microscope, Cog, Settings2,
  Gauge, Thermometer, Beaker, FlaskConical,
  
  // Communication Icons
  MessageSquare, PhoneCall, Video, Mail, MailOpen, MessageCircle,
  
  // Medical/Dental Icons
  Stethoscope, Heart as HeartMedical, Pill, Syringe, TestTube, Bone, Brain, Smile,
  
  // Additional Utility Icons
  MapPin, Camera, Image, Video as VideoIcon, Volume2, VolumeX,
  Sun, Moon, Cloud, CloudRain, CloudSnow, Umbrella, Wind
} from 'lucide-react';

// React Icons for Landing Page & Social Media
import {
  FaTelegram, FaWhatsapp, FaLinkedin, FaEnvelope, FaPhone,
  FaMapMarkerAlt, FaUserMd, FaClipboardList, FaCogs, FaTruck as FaTruckIcon,
  FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok,
  FaGithub, FaGitlab, FaBitbucket, FaJira, FaSlack,
  FaDocker, FaAws, FaDatabase, FaServer, FaCloud, FaNetworkWired, FaShieldAlt
} from 'react-icons/fa';


// ICON MAPS - Categorized for Easy Access


export const ICON_MAP = {
  // Status Icons
  status: {
    completed: Check,
    inProgress: Zap, 
    pending: Clock,
    rejected: X,
    success: CheckCircle2,
    error: XCircle,
    warning: AlertTriangle,
    info: AlertCircle
  },
  
  // Process Icons  
  process: {
    orderReceived: Package,
    designReview: Eye,
    manufacturing: Settings,
    qualityCheck: CheckCircle,
    upload: Upload,
    review: FileText,
    design: Settings2,
    production: Cog,
    finalQA: Microscope,
    shipping: Truck,
    delivery: Package
  },
  
  // Manufacturing Icons
  manufacturing: {
    box: Box,
    layers: Layers,
    printer: PrinterIcon,
    wrench: Wrench,
    microscope: Microscope,
    cog: Cog,
    gauge: Gauge,
    thermometer: Thermometer,
    beaker: Beaker,
    flask: FlaskConical
  },
  
  // User Interface Icons
  ui: {
    user: User,
    userPlus: UserPlus,
    userCheck: UserCheck,
    home: Home,
    crown: Crown,
    plus: Plus,
    minus: Minus,
    search: Search,
    settings: Settings,
    checkCircle: CheckCircle,
    clock: Clock,
    package: Package,
    phone: Phone,
    fileText: FileText,
    calendar: Calendar,
    activity: Activity,
    heart: Heart,
    star: Star
  },
  
  // Action Icons
  action: {
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
    edit: Edit,
    trash: Trash2,
    copy: Copy,
    save: Save,
    refresh: RefreshCw,
    menu: Menu,
    close: XIcon,
    externalLink: ExternalLink,
    download: Download,
    share: Share2,
    print: Printer,
    send: Send
  },
  
  // Business Icons
  business: {
    creditCard: CreditCard,
    trendingUp: TrendingUp,
    trendingDown: TrendingDown,
    workflow: Workflow,
    list: List,
    grid: Grid3X3,
    chart: BarChart3,
    pieChart: PieChart,
    dollar: DollarSign,
    cart: ShoppingCart,
    briefcase: Briefcase
  },
  
  // Communication Icons
  communication: {
    message: MessageSquare,
    phoneCall: PhoneCall,
    video: Video,
    email: Mail,
    emailOpen: MailOpen,
    chat: MessageCircle,
    send: Send
  },
  
  // Medical Icons
  medical: {
    stethoscope: Stethoscope,
    heart: HeartMedical,
    pill: Pill,
    syringe: Syringe,
    testTube: TestTube,
    bone: Bone,
    brain: Brain
  },
  
  // Weather & Environment
  environment: {
    map: MapPin,
    camera: Camera,
    image: Image,
    video: VideoIcon,
    sun: Sun,
    moon: Moon,
    cloud: Cloud,
    cloudRain: CloudRain,
    cloudSnow: CloudSnow,
    umbrella: Umbrella,
    wind: Wind
  },
  
  // Social & Platform Icons
  social: {
    telegram: FaTelegram,
    whatsapp: FaWhatsapp,
    linkedin: FaLinkedin,
    email: FaEnvelope,
    facebook: FaFacebook,
    twitter: FaTwitter,
    instagram: FaInstagram,
    youtube: FaYoutube
  },
  
  // Tech & DevOps Icons  
  tech: {
    github: FaGithub,
    docker: FaDocker,
    aws: FaAws,
    database: FaDatabase,
    server: FaServer,
    cloud: FaCloud,
    network: FaNetworkWired,
    shield: FaShieldAlt
  }
};

// Flattened map for backward compatibility
export const ALL_ICONS = {
  // Status
  ...ICON_MAP.status,
  // Process  
  ...ICON_MAP.process,
  // Manufacturing
  ...ICON_MAP.manufacturing,
  // UI
  ...ICON_MAP.ui,
  // Actions
  ...ICON_MAP.action,
  // Business
  ...ICON_MAP.business,
  // Communication
  ...ICON_MAP.communication,
  // Medical
  ...ICON_MAP.medical,
  // Environment
  ...ICON_MAP.environment,
  // Social
  ...ICON_MAP.social,
  // Tech
  ...ICON_MAP.tech
} as const;

// Legacy compatibility mappings
export const LEGACY_MAPPINGS = {
  STATUS_ICONS: ICON_MAP.status,
  PROCESS_ICONS: ICON_MAP.process,
  ORDER_ICONS: ALL_ICONS,
  ICON_MAP: ALL_ICONS
} as const;


// HELPER FUNCTIONS


/**
 * Get icon component by name from any category
 */
export const getIcon = (iconName: string, category?: string) => {
  // Try specific category first if provided
  if (category && ICON_MAP[category as keyof typeof ICON_MAP]) {
    const categoryIcons = ICON_MAP[category as keyof typeof ICON_MAP] as Record<string, React.ComponentType<{ className?: string }>>;
    if (categoryIcons[iconName]) {
      return categoryIcons[iconName];
    }
  }
  
  // Fallback to flattened map
  return ALL_ICONS[iconName as keyof typeof ALL_ICONS] || User;
};

/**
 * Get multiple icons from category
 */
export const getIcons = (icons: string[], category: string) => {
  return icons.map(iconName => getIcon(iconName, category));
};

/**
 * Check if icon exists
 */
export const hasIcon = (iconName: string, category?: string) => {
  if (category && ICON_MAP[category as keyof typeof ICON_MAP]) {
    const categoryIcons = ICON_MAP[category as keyof typeof ICON_MAP] as Record<string, React.ComponentType<{ className?: string }>>;
    return iconName in categoryIcons;
  }
  return iconName in ALL_ICONS;
};


// MANUFACTURING STEPS DATA
// NOTE: Manufacturing steps data has been consolidated into UserProcessSteps.ts
// This helps maintain better separation of concerns between icon definitions and business logic

// Sidebar icon configurations
export const SIDEBAR_ICONS = [
  // Status-based icons
  { id: 'completed', Icon: CheckCircle, label: 'Completed', category: 'status', gradient: 'from-emerald-500 to-green-500', count: 4 },
  { id: 'in-progress', Icon: Clock, label: 'In Progress', category: 'status', gradient: 'from-blue-500 to-cyan-500', count: 2 },
  { id: 'pending', Icon: AlertCircle, label: 'Pending', category: 'status', gradient: 'from-yellow-500 to-orange-500', count: 0 },
  { id: 'cancelled', Icon: Settings, label: 'Cancelled', category: 'status', gradient: 'from-red-500 to-pink-500', count: 0 },
  
  // Action icons
  { id: 'orders', Icon: FileText, label: 'All Orders', category: 'action', gradient: 'from-purple-500 to-indigo-500' },
  { id: 'new-order', Icon: Plus, label: 'New Order', category: 'action', gradient: 'from-emerald-500 to-green-500' },
  { id: 'track', Icon: Search, label: 'Track Order', category: 'action', gradient: 'from-blue-500 to-cyan-500' }
] as const;


// EXPORTS


// Export everything for easy access
export {
  // User & Navigation Icons
  User, UserPlus, UserCheck, Home, UserCircle, UserX, Globe,
  
  // UI Icons
  Crown, Plus, Minus, Search, Settings, CheckCircle, Clock, Package,
  Upload, Eye, Phone, FileText, Calendar, AlertCircle, Activity,
  Play, Pause, Filter, RefreshCw, Download, Share2, Heart, Star,
  
  // Status Icons
  Check, X, Zap, Award, Shield, AlertTriangle, CheckCircle2, XCircle,
  
  // Action Icons
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Edit, Trash2, Copy,
  ExternalLink, Link, Save, Printer, Send, Menu, XIcon,
  
  // Business Icons
  CreditCard, TrendingUp, TrendingDown, Workflow, List, Grid3X3,
  BarChart3, PieChart, DollarSign, ShoppingCart, ShoppingBag, Briefcase, Truck,
  
  // Manufacturing Icons
  Box, Layers, PrinterIcon, Wrench, Microscope, Cog, Settings2,
  Gauge, Thermometer, Beaker, FlaskConical,
  
  // Communication Icons
  MessageSquare, PhoneCall, Video, Mail, MailOpen, MessageCircle,
  
  // Medical/Dental Icons
  Stethoscope, HeartMedical, Pill, Syringe, TestTube, Bone, Brain, Smile,
  
  // Additional Utility Icons
  MapPin, Camera, Image, VideoIcon, Volume2, VolumeX,
  Sun, Moon, Cloud, CloudRain, CloudSnow, Umbrella, Wind,
  
  // React Icons
  FaTelegram, FaWhatsapp, FaLinkedin, FaEnvelope, FaPhone,
  FaMapMarkerAlt, FaUserMd, FaClipboardList, FaCogs, FaTruckIcon,
  FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok,
  FaGithub, FaGitlab, FaBitbucket, FaJira, FaSlack,
  FaDocker, FaAws, FaDatabase, FaServer, FaCloud, FaNetworkWired, FaShieldAlt
};

// Type definitions
export type IconName = keyof typeof ALL_ICONS;
export type IconCategory = keyof typeof ICON_MAP;
export type LucideIconName = 'User' | 'Crown' | 'Settings' | 'CheckCircle' | 'Clock' | 'Package' | 'Upload' | 'Eye' | 'Phone' | 'FileText' | 'Calendar' | 'AlertCircle' | 'Home' | 'UserPlus' | 'Activity' | 'Check' | 'X' | 'Zap' | 'ArrowLeft' | 'Truck' | 'Microscope' | 'CreditCard' | 'TrendingUp' | 'Workflow' | 'List' | 'Box' | 'Layers' | 'Printer' | 'Wrench';

// Backward compatibility exports
export const STATUS_ICONS = ICON_MAP.status;
export const PROCESS_ICONS = ICON_MAP.process;
export const ORDER_ICONS = ALL_ICONS;