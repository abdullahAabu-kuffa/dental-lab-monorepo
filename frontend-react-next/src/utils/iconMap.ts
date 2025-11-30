import {
  FaTelegram,
  FaWhatsapp,
  FaEnvelope,
  FaLinkedin,
  FaMapMarkerAlt,
  FaUserMd,
  FaClipboardList,
  FaCogs,
  FaTruck
} from 'react-icons/fa';

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'FaTelegram': FaTelegram,
  'FaWhatsapp': FaWhatsapp,
  'FaEnvelope': FaEnvelope,
  'FaLinkedin': FaLinkedin,
  'FaMapMarkerAlt': FaMapMarkerAlt,
  'FaUserMd': FaUserMd,
  'FaClipboardList': FaClipboardList,
  'FaCogs': FaCogs,
  'FaTruck': FaTruck,
};

export const getIcon = (iconName: string) => {
  return iconMap[iconName] || FaEnvelope;
};