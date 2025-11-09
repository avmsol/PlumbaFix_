import { useEffect, useState } from 'react';
import { MapPin, CheckCircle, Radio, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import type { Screen } from '../App';

interface QuoteBroadcastProps {
  onNavigate: (screen: Screen) => void;
  jobAddress: string;
}

interface Plumber {
  id: string;
  name: string;
  photo: string;
  distance: string;
  angle: number;
  delay: number;
}

export default function QuoteBroadcast({ onNavigate, jobAddress }: QuoteBroadcastProps) {
  const [stage, setStage] = useState<'broadcasting' | 'receiving' | 'complete'>('broadcasting');
  const [plumbersNotified, setPlumbersNotified] = useState(0);
  const [visiblePlumbers, setVisiblePlumbers] = useState<Set<string>>(new Set());

  // Mock plumbers in the area
  const nearbyPlumbers: Plumber[] = [
    {
      id: '1',
      name: 'Mike Johnson',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
      distance: '1.2 mi',
      angle: 0,
      delay: 0.3,
    },
    {
      id: '2',
      name: 'Sarah Martinez',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      distance: '1.8 mi',
      angle: 45,
      delay: 0.5,
    },
    {
      id: '3',
      name: 'David Chen',
      photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop',
      distance: '2.1 mi',
      angle: 90,
      delay: 0.7,
    },
    {
      id: '4',
      name: 'Lisa Anderson',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      distance: '2.4 mi',
      angle: 135,
      delay: 0.9,
    },
    {
      id: '5',
      name: 'Robert Taylor',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      distance: '2.7 mi',
      angle: 180,
      delay: 1.1,
    },
    {
      id: '6',
      name: 'Emily Wilson',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      distance: '2.9 mi',
      angle: 225,
      delay: 1.3,
    },
    {
      id: '7',
      name: 'James Brown',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      distance: '3.2 mi',
      angle: 270,
      delay: 1.5,
    },
    {
      id: '8',
      name: 'Maria Garcia',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      distance: '3.5 mi',
      angle: 315,
      delay: 1.7,
    },
  ];

  const totalPlumbers = nearbyPlumbers.length;

  useEffect(() => {
    // Broadcasting stage (1.5s)
    const broadcastTimer = setTimeout(() => {
      setStage('receiving');
    }, 1500);

    // Plumbers receiving notifications (incrementally)
    const notificationIntervals: NodeJS.Timeout[] = [];
    nearbyPlumbers.forEach((plumber, index) => {
      const timer = setTimeout(() => {
        setPlumbersNotified((prev) => prev + 1);
        setVisiblePlumbers((prev) => new Set([...prev, plumber.id]));
      }, 1500 + index * 200);
      notificationIntervals.push(timer);
    });

    // Complete stage
    const completeTimer = setTimeout(() => {
      setStage('complete');
    }, 1500 + totalPlumbers * 200 + 1000);

    // Navigate to jobs screen
    const navigateTimer = setTimeout(() => {
      onNavigate('jobs');
    }, 1500 + totalPlumbers * 200 + 3000);

    return () => {
      clearTimeout(broadcastTimer);
      clearTimeout(completeTimer);
      clearTimeout(navigateTimer);
      notificationIntervals.forEach(clearTimeout);
    };
  }, [onNavigate, totalPlumbers]);

  // Calculate plumber positions on a circle
  const getPlumberPosition = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    };
  };

  const radius = 140; // radius for plumber positioning

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#007AFF]/5 via-[#F4F8FB] to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm px-4 lg:px-6 pt-14 pb-4 lg:pt-6 lg:pb-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-12 h-12 bg-gradient-to-br from-[#007AFF] to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2"
          >
            <Radio className="w-6 h-6 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl lg:text-2xl mb-0.5"
          >
            {stage === 'broadcasting' && 'Broadcasting Request...'}
            {stage === 'receiving' && 'Plumbers Receiving Request'}
            {stage === 'complete' && 'Request Sent Successfully!'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-xs"
          >
            {stage === 'broadcasting' && 'Searching for certified plumbers in your area'}
            {stage === 'receiving' && `Notifying ${totalPlumbers} available plumbers nearby`}
            {stage === 'complete' && 'You\'ll receive quotes from interested plumbers soon'}
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8 overflow-hidden">
        <div className="max-w-4xl mx-auto w-full">
          <div className="relative w-full max-w-xl mx-auto" style={{ aspectRatio: '1/1' }}>
            
            {/* Central Location Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 0.8 }}
                className="relative"
              >
                {/* Ripple effects */}
                <AnimatePresence>
                  {stage === 'broadcasting' && (
                    <>
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 3, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: 'easeOut',
                          }}
                          className="absolute inset-0 rounded-full border-4 border-[#007AFF]"
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Center pin */}
                <div className="relative w-20 h-20 bg-gradient-to-br from-[#007AFF] to-[#0051D5] rounded-full flex items-center justify-center shadow-xl">
                  <MapPin className="w-10 h-10 text-white" />
                </div>

                {/* Address label */}
                <Card className="absolute top-full mt-4 left-1/2 -translate-x-1/2 px-4 py-2 whitespace-nowrap shadow-lg border-gray-200">
                  <p className="text-sm text-gray-900">{jobAddress}</p>
                </Card>
              </motion.div>
            </div>

            {/* Range circle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border-2 border-dashed border-[#007AFF]/30 bg-[#007AFF]/5"
            />

            {/* Plumbers around the circle */}
            <AnimatePresence>
              {nearbyPlumbers.map((plumber) => {
                const position = getPlumberPosition(plumber.angle, radius);
                const isVisible = visiblePlumbers.has(plumber.id);

                return (
                  <motion.div
                    key={plumber.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      isVisible
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{
                      type: 'spring',
                      duration: 0.5,
                      delay: plumber.delay,
                    }}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                    }}
                  >
                    <div className="relative">
                      {/* Notification pulse */}
                      {isVisible && stage === 'receiving' && (
                        <motion.div
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: 'easeOut',
                          }}
                          className="absolute inset-0 rounded-full bg-green-400"
                        />
                      )}

                      {/* Plumber avatar */}
                      <div className="relative w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                        <img
                          src={plumber.photo}
                          alt={plumber.name}
                          className="w-full h-full object-cover"
                        />
                        {isVisible && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-[#00C853] rounded-full flex items-center justify-center border-2 border-white"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>

                      {/* Distance badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: plumber.delay + 0.3 }}
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
                      >
                        <div className="bg-white px-2 py-0.5 rounded-full shadow-md border border-gray-200">
                          <span className="text-xs text-gray-600">{plumber.distance}</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Card className="p-6 max-w-md mx-auto border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#007AFF]/20 to-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#007AFF]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Plumbers Notified</p>
                    <motion.p
                      key={plumbersNotified}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-2xl text-gray-900"
                    >
                      {plumbersNotified} / {totalPlumbers}
                    </motion.p>
                  </div>
                </div>
                
                {stage === 'complete' && (
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring' }}
                    className="w-12 h-12 bg-[#00C853] rounded-full flex items-center justify-center"
                  >
                    <CheckCircle className="w-7 h-7 text-white" />
                  </motion.div>
                )}
              </div>

              {stage === 'complete' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-4 border-t border-gray-100"
                >
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-lg">✨</span>
                    <p>
                      Your request has been sent to all nearby certified plumbers. 
                      You'll start receiving quotes within the next few minutes!
                    </p>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>

          {/* Auto-redirect message */}
          {stage === 'complete' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center text-sm text-gray-500 mt-6"
            >
              Redirecting to your jobs...
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
