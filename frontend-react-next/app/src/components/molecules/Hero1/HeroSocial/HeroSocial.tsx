import { CONTACT_INFO } from '../../../../config/contact.data';
import { getIcon } from '../../../../utils/iconMap';

export default function HeroSocial() {
  const socialContacts = CONTACT_INFO.filter(contact => 
    ['FaTelegram', 'FaWhatsapp', 'FaLinkedin'].includes(contact.icon)
  );

  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      {socialContacts.map((contact, index) => {
        const IconComponent = getIcon(contact.icon);
        return (
          <a
            key={index}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <IconComponent className="w-6 h-6 text-[#E4B441] group-hover:text-white transition-colors duration-300" />
            <span className="text-xs text-gray-300 group-hover:text-white transition-colors duration-300">
              {contact.title}
            </span>
          </a>
        );
      })}
    </div>
  );
}