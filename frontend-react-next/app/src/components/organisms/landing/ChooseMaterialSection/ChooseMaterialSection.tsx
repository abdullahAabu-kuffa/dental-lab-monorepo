'use client';
import Button from '../../../atoms/Button/Button';
import { componentStyles, gradients } from '../../../../../design-system';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ChooseMaterialSection() {
  const router = useRouter();

  return (
    <section className={`${componentStyles.layout.spacingSection} bg-gradient-to-br from-gray-50 to-white`}>
      <div className={componentStyles.layout.containerDefault}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content - Left */}
          <div className="text-left space-y-6">
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Choose Your Material & <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradients.gold }}>Track Your Order Online</span>
            </h2>
            
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl lg:mx-0 leading-relaxed font-sans">
              Upload your <span className="font-bold text-gray-800">ExoCAD file</span>, select your preferred material, shade, and design options – and our lab will start manufacturing instantly. You can follow your order's progress online, step by step.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="lightPrimary"
                onClick={() => router.push('/get-started')}
              >
                Get Started
              </Button>
              <Button
                variant="lightSecondary"
                onClick={() => router.push('/track-order')}
              >
                Track Order
              </Button>
            </div>
          </div>

          {/* Image - Right */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <Image
                  src="/2920348.png"
                  alt="Dental Material Selection & Order Tracking"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}