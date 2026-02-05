import React from 'react';
import { motion } from 'framer-motion';
import TitleSlide from './slides/TitleSlide';
import DefinitionSlide from './slides/DefinitionSlide';
import ComparisonSlide from './slides/ComparisonSlide';
import SplitSlide from './slides/SplitSlide';
import VisualSlide from './slides/VisualSlide';
import CultureSlide from './slides/CultureSlide';
import AIIntegrationSlide from './slides/AIIntegrationSlide';
import PortfolioSlide from './slides/PortfolioSlide';
import QuizIntroSlide from './slides/QuizIntroSlide';
import QuizSlide from './slides/QuizSlide';
import ExerciseSlide from './slides/ExerciseSlide';
import DemoSlide from './slides/DemoSlide';
import LiveChatSlide from './slides/LiveChatSlide';
import TakeHomeSlide from './slides/TakeHomeSlide';
import TakeawaysSlide from './slides/TakeawaysSlide';
import ResourcesSlide from './slides/ResourcesSlide';
import EndingSlide from './slides/EndingSlide';
import AnimatedFlowSlide from './slides/AnimatedFlowSlide';
import AnimatedChartSlide from './slides/AnimatedChartSlide';
import DayInLifeSlide from './slides/DayInLifeSlide';
import VisualMetaphorSlide from './slides/VisualMetaphorSlide';

const slideComponents = {
  title: TitleSlide,
  definition: DefinitionSlide,
  comparison: ComparisonSlide,
  split: SplitSlide,
  visual: VisualSlide,
  culture: CultureSlide,
  'ai-integration': AIIntegrationSlide,
  portfolio: PortfolioSlide,
  'quiz-intro': QuizIntroSlide,
  quiz: QuizSlide,
  exercise: ExerciseSlide,
  demo: DemoSlide,
  'live-chat': LiveChatSlide,
  'take-home': TakeHomeSlide,
  takeaways: TakeawaysSlide,
  resources: ResourcesSlide,
  ending: EndingSlide,
  'animated-flow': AnimatedFlowSlide,
  'animated-chart': AnimatedChartSlide,
  'day-in-life': DayInLifeSlide,
  'visual-metaphor': VisualMetaphorSlide,
};

const SlideRenderer = ({ slide, addPoints, currentSlide, audioProps }) => {
  const SlideComponent = slideComponents[slide.type];

  if (!SlideComponent) {
    return (
      <div className="text-center">
        <p className="text-red-500">Unknown slide type: {slide.type}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <SlideComponent 
        slide={slide} 
        addPoints={addPoints}
        slideIndex={currentSlide}
        audioProps={audioProps}
      />
    </motion.div>
  );
};

export default SlideRenderer;
