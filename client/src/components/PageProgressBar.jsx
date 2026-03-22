import { motion as Motion, useScroll, useSpring } from 'framer-motion';

export default function PageProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 28,
    mass: 0.3,
  });

  return <Motion.div className="page-progress-bar" style={{ scaleX }} />;
}
