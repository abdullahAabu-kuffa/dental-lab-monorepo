// UNIFIED ICONS SYSTEM - Single Source of Truth for All Icons

// Lucide React Icons - All available icons
import React from 'react';
import { FaTelegram, FaWhatsapp, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
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

/**
 * Get icon component by name from any category
 */
export const getIcon = (iconName: string, category?: string) => {
  // Simple implementation - just return the icon by name from the imports
  // Since the complex mapping system is not used, we'll keep it simple
  const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    user: User,
    userPlus: UserPlus,
    userCheck: UserCheck,
    home: Home,
    userCircle: UserCircle,
    userX: UserX,
    globe: Globe,
    crown: Crown,
    plus: Plus,
    minus: Minus,
    search: Search,
    settings: Settings,
    checkCircle: CheckCircle,
    clock: Clock,
    package: Package,
    upload: Upload,
    eye: Eye,
    phone: Phone,
    fileText: FileText,
    calendar: Calendar,
    alertCircle: AlertCircle,
    activity: Activity,
    play: Play,
    pause: Pause,
    filter: Filter,
    refreshCw: RefreshCw,
    download: Download,
    share2: Share2,
    heart: Heart,
    star: Star,
    check: Check,
    x: X,
    zap: Zap,
    award: Award,
    shield: Shield,
    alertTriangle: AlertTriangle,
    checkCircle2: CheckCircle2,
    xCircle: XCircle,
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
    arrowUp: ArrowUp,
    arrowDown: ArrowDown,
    edit: Edit,
    trash2: Trash2,
    copy: Copy,
    externalLink: ExternalLink,
    link: Link,
    save: Save,
    printer: Printer,
    send: Send,
    menu: Menu,
    xIcon: XIcon,
    creditCard: CreditCard,
    trendingUp: TrendingUp,
    trendingDown: TrendingDown,
    workflow: Workflow,
    list: List,
    grid3X3: Grid3X3,
    barChart3: BarChart3,
    pieChart: PieChart,
    dollar: DollarSign,
    shoppingCart: ShoppingCart,
    shoppingBag: ShoppingBag,
    briefcase: Briefcase,
    truck: Truck,
    box: Box,
    layers: Layers,
    printerIcon: PrinterIcon,
    wrench: Wrench,
    microscope: Microscope,
    cog: Cog,
    settings2: Settings2,
    gauge: Gauge,
    thermometer: Thermometer,
    beaker: Beaker,
    flaskConical: FlaskConical,
    messageSquare: MessageSquare,
    phoneCall: PhoneCall,
    video: Video,
    mail: Mail,
    mailOpen: MailOpen,
    messageCircle: MessageCircle,
    stethoscope: Stethoscope,
    heartMedical: HeartMedical,
    pill: Pill,
    syringe: Syringe,
    testTube: TestTube,
    bone: Bone,
    brain: Brain,
    smile: Smile,
    mapPin: MapPin,
    camera: Camera,
    image: Image,
    videoIcon: VideoIcon,
    volume2: Volume2,
    volumeX: VolumeX,
    sun: Sun,
    moon: Moon,
    cloud: Cloud,
    cloudRain: CloudRain,
    cloudSnow: CloudSnow,
    umbrella: Umbrella,
    wind: Wind,
    map: MapPin,
    telegram: FaTelegram,
    whatsapp: FaWhatsapp,
    linkedin: FaLinkedinIn,
    email: FaEnvelope
  };

  return iconMap[iconName] || User;
};

// Export all icons for easy access
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
  Sun, Moon, Cloud, CloudRain, CloudSnow, Umbrella, Wind
};