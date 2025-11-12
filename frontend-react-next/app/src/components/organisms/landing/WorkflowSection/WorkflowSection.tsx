'use client';

import { motion } from 'framer-motion';
import HeroHeading from '../../../molecules/HeroHeading/HeroHeading';
import HeroSubtitle from '../../../molecules/HeroSubtitle/HeroSubtitle';
import { WORKFLOW_CARDS } from '../../../../config/workflow.config';

export default function WorkflowSection() {

  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <HeroHeading
            primaryText=""
            gradientText="Our Seamless Digital Workflow"
            gradientColors="linear-gradient(135deg, #D4AF37 0%, #F4E4A6 50%, #C9A961 100%)"
          />
          <HeroSubtitle
            text="A seamless digital workflow from scan to delivery"
          />
        </div>

        {/* Workflow Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {/* Connecting Lines */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-[2px] z-0">
              <div className="absolute w-full h-[2px] bg-[#444444]"></div>
            </div>

            {WORKFLOW_CARDS.map((card, index) => {
              const IconComponent = card.iconComponent;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  {/* Icon Circle */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#C9A961] to-[#D4A747] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                      <IconComponent size={40} color="white" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-2xl p-10 border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 group text-center">
                    {/* Step Number & Title */}
                    <div className="text-center mb-4">
                      <h3 className="text-white font-bold text-xl mb-2">
                        {card.step} {card.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <div className="text-center">
                      <p
                        className="text-[#AAAAAA] text-base leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: card.description.replace(/<strong>/g, '<span class="text-white font-bold">').replace(/<\/strong>/g, '</span>')
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}