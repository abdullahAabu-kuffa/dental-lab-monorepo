import { memo } from 'react';
import ServiceCard from '../../../atoms/ServiceCard/ServiceCard';
import type { Service } from '../../../../config/services.data';

interface ServicesGridProps {
  services: Service[];
}

const ServicesGrid = memo(function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
});

export default ServicesGrid;
export type { ServicesGridProps };