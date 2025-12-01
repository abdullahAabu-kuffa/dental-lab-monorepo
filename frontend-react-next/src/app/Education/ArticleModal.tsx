'use client';

import { X } from 'lucide-react';
import { EducationalResource } from '@/config/LandingData/educational-resources.data';

const DIFFICULTY_COLORS = {
  Beginner: 'bg-green-100 text-green-600',
  Intermediate: 'bg-yellow-100 text-yellow-600',
  Advanced: 'bg-red-100 text-red-600',
} as const;

interface ArticleModalProps {
  resource: EducationalResource | null;
  onClose: () => void;
}

export default function ArticleModal({ resource, onClose }: ArticleModalProps) {
  if (!resource) return null;

  const difficultyColor =
    DIFFICULTY_COLORS[resource.difficulty as keyof typeof DIFFICULTY_COLORS] ||
    'bg-gray-100 text-gray-600';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 bg-gray-100 text-xs font-semibold rounded-full text-gray-700 mb-3">
              {resource.category}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {resource.title}
            </h2>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{resource.readTime}</span>
              <span
                className={`px-2 py-1 rounded-full font-medium text-xs ${difficultyColor}`}
              >
                {resource.difficulty}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Image */}
        <div className="h-64 overflow-hidden">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-lg text-gray-700 mb-6">
            {resource.description}
          </p>

          <div className="text-gray-600 leading-relaxed space-y-4">
            <div className="prose max-w-none">
              {resource.id === '1' && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">Emergency Dental Care Guide</h4>
                  <p className="mb-4">Dental emergencies can happen at any time, and knowing how to respond quickly can make the difference between saving and losing a tooth.</p>
                  <h5 className="font-semibold mb-2">Immediate Steps for Common Emergencies:</h5>
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    <li><strong>Knocked-out tooth:</strong> Handle by the crown, rinse gently, and try to reinsert</li>
                    <li><strong>Severe toothache:</strong> Rinse with warm water and apply cold compress</li>
                    <li><strong>Broken tooth:</strong> Save any pieces and rinse your mouth with warm water</li>
                  </ul>
                  <p className="text-sm text-gray-500">Remember: Time is crucial in dental emergencies. Contact your dentist immediately!</p>
                </div>
              )}
              
              {resource.id === '2' && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">Dental Implants: Complete Guide</h4>
                  <p className="mb-4">Dental implants are titanium posts surgically placed into your jawbone to replace missing tooth roots.</p>
                  <h5 className="font-semibold mb-2">Benefits of Dental Implants:</h5>
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    <li>Permanent solution that can last a lifetime</li>
                    <li>Look and function like natural teeth</li>
                    <li>Prevent bone loss in the jaw</li>
                    <li>Don&apos;t require grinding down adjacent teeth</li>
                  </ul>
                  <h5 className="font-semibold mb-2">The Implant Process:</h5>
                  <p className="text-sm">The process typically takes 3-6 months and involves consultation, surgical placement, healing period, and crown attachment.</p>
                </div>
              )}
              
              {resource.id === '3' && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">Professional Teeth Whitening</h4>
                  <p className="mb-4">Professional teeth whitening is a safe and effective way to brighten your smile several shades in just one visit.</p>
                  <h5 className="font-semibold mb-2">What to Expect:</h5>
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    <li>Consultation to determine if you&apos;re a good candidate</li>
                    <li>Professional cleaning before treatment</li>
                    <li>Application of whitening gel and activation with special light</li>
                    <li>Multiple applications for optimal results</li>
                  </ul>
                  <p className="text-sm">Results can last 1-3 years with proper oral hygiene and avoiding stain-causing foods and drinks.</p>
                </div>
              )}
              
              {(resource.id === '4' || resource.id === '8') && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">Cosmetic Dentistry Options</h4>
                  <p className="mb-4">Modern cosmetic dentistry offers numerous options to enhance your smile and boost your confidence.</p>
                  <h5 className="font-semibold mb-2">Popular Treatments:</h5>
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    <li><strong>Veneers:</strong> Thin shells that cover the front of teeth</li>
                    <li><strong>Bonding:</strong> Tooth-colored resin to repair chips and gaps</li>
                    <li><strong>Contouring:</strong> Reshaping teeth for better appearance</li>
                    <li><strong>Whitening:</strong> Brightening discolored teeth</li>
                  </ul>
                  <p className="text-sm">Your cosmetic dentist will recommend the best treatment based on your specific needs and goals.</p>
                </div>
              )}
              
              {resource.id === '5' && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">Managing Tooth Sensitivity</h4>
                  <p className="mb-4">Tooth sensitivity affects millions of people and can make eating and drinking uncomfortable.</p>
                  <h5 className="font-semibold mb-2">Common Causes:</h5>
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    <li>Exposed tooth roots due to gum recession</li>
                    <li>Worn tooth enamel from aggressive brushing</li>
                    <li>Tooth decay or damaged fillings</li>
                    <li>Teeth grinding (bruxism)</li>
                  </ul>
                  <h5 className="font-semibold mb-2">Treatment Options:</h5>
                  <p className="text-sm">Desensitizing toothpaste, fluoride treatments, dental bonding, or gum grafts depending on the severity.</p>
                </div>
              )}
              
              {(resource.id === '6' || resource.id === '9') && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">Importance of Regular Checkups</h4>
                  <p className="mb-4">Regular dental checkups are essential for maintaining optimal oral health and preventing serious problems.</p>
                  <h5 className="font-semibold mb-2">What Happens During Checkups:</h5>
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    <li>Professional cleaning to remove plaque and tartar</li>
                    <li>Thorough examination for cavities and gum disease</li>
                    <li>Oral cancer screening</li>
                    <li>X-rays when necessary to detect hidden issues</li>
                  </ul>
                  <p className="text-sm">Most people should visit the dentist every 6 months, though some may need more frequent visits.</p>
                </div>
              )}
              
              {resource.id === '7' && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">Understanding Dental Implants</h4>
                  <p className="mb-4">Dental implants are the gold standard for tooth replacement, offering a permanent solution that looks, feels, and functions like natural teeth.</p>
                  <h5 className="font-semibold mb-2">Implant Components:</h5>
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    <li><strong>Implant fixture:</strong> The titanium post placed in the jawbone</li>
                    <li><strong>Abutment:</strong> The connector piece</li>
                    <li><strong>Crown:</strong> The visible tooth replacement</li>
                  </ul>
                  <h5 className="font-semibold mb-2">Who Can Get Implants:</h5>
                  <p className="text-sm">Most adults with good oral and general health are candidates. Your dentist will evaluate bone density and overall health.</p>
                </div>
              )}
              
              {/* Default content for articles without specific content */}
              {!['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(resource.id) && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">About This Topic</h4>
                  <p className="mb-4">{resource.description}</p>
                  <p>This comprehensive guide covers important aspects of dental health and treatment options. For personalized advice and treatment, consult with your dental professional.</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#E4B441] text-white font-semibold rounded-lg hover:bg-[#d4a431] transition-colors"
            >
              Close
            </button>

   
       
       
          </div>
        </div>
      </div>
    </div>
  );
}
