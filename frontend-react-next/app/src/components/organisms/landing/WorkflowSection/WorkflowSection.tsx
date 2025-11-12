import WorkflowGrid from '../../../molecules/HeroSectionMolecules/WorkflowGrid/WorkflowGrid';
import HeroHeading from '../../../molecules/HeroSectionMolecules/HeroHeading/HeroHeading';
import HeroSubtitle from '../../../molecules/HeroSectionMolecules/HeroSubtitle/HeroSubtitle';
import { WORKFLOW_STEPS } from '../../../../config/workflow.data';
import { typography, componentStyles } from '../../../../../design-system';

const WorkflowSection: React.FC = () => {
  return (
    <section className={`${componentStyles.layout.relative} ${componentStyles.layout.spacingSection} ${componentStyles.background.sectionDark}`}>
      <div className={componentStyles.layout.containerExtended}>
        <div className="text-center mb-16">
          <HeroHeading
            primaryText="How It "
            gradientText="Works"
            gradientColors="linear-gradient(to right, #FFD700, #E4B441, #C39321)"
          />
          <HeroSubtitle
            text="A seamless digital workflow from scan to delivery"
          />
        </div>
        
        <WorkflowGrid steps={WORKFLOW_STEPS} />
      </div>
    </section>
  );
};

export default WorkflowSection;
