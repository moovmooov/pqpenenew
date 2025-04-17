import cn from 'clsx'
import { useStore } from '@/store/useStore'
import { motion } from 'framer-motion'

function StreakCounter() {
  const databaseData = useStore((state) => state.databaseData)
  const streak = useStore((state) => state.databaseData?.streak) || 0
  const statusTranslations = databaseData?.isNegative ? 'negativo' : 'positivo'
  
  // Get more intense effects for higher streaks
  const getStreakIntensity = () => {
    if (!streak) return { scale: 1, rotate: 0, glow: '', blur: 0, shake: false }
    
    // Thresholds for increasing intensity
    if (streak >= 10) {
      return { 
        scale: 1.3, 
        rotate: [-3, 3], 
        glow: databaseData?.isNegative 
          ? '0 0 30px rgba(255, 0, 0, 0.8), 0 0 60px rgba(255, 0, 0, 0.6), 0 0 90px rgba(255, 0, 0, 0.4)' 
          : '0 0 30px rgba(0, 255, 0, 0.8), 0 0 60px rgba(0, 255, 0, 0.6), 0 0 90px rgba(0, 255, 0, 0.4)',
        blur: databaseData?.isNegative ? 0.5 : 0,
        shake: databaseData?.isNegative
      }
    }
    if (streak >= 5) {
      return { 
        scale: 1.2, 
        rotate: [-2, 2], 
        glow: databaseData?.isNegative 
          ? '0 0 20px rgba(255, 0, 0, 0.7), 0 0 40px rgba(255, 0, 0, 0.4)' 
          : '0 0 20px rgba(0, 255, 0, 0.7), 0 0 40px rgba(0, 255, 0, 0.4)',
        blur: databaseData?.isNegative ? 0.3 : 0,
        shake: databaseData?.isNegative && streak >= 7
      }
    }
    if (streak >= 3) {
      return { 
        scale: 1.1, 
        rotate: [-1, 1], 
        glow: databaseData?.isNegative 
          ? '0 0 10px rgba(255, 0, 0, 0.5), 0 0 20px rgba(255, 0, 0, 0.3)' 
          : '0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.3)',
        blur: databaseData?.isNegative ? 0 : 0,
        shake: false
      }
    }
    
    return { scale: 1, rotate: 0, glow: '', blur: 0, shake: false }
  }
  
  
  
  const intensity = getStreakIntensity()
  
  const getShakeAnimations = () => {
    if (!intensity.shake) return null
    
    // Intensity multiplier increases with streak level
    const shakeIntensity = streak >= 15 ? 3 : streak >= 10 ? 2 : 1;
    
    return {
      x: {
        animate: [-12 * shakeIntensity, 12 * shakeIntensity],
        transition: { 
          duration: 0.12 / shakeIntensity, // Faster at higher streaks
          repeat: Infinity, 
          repeatType: "mirror",
          ease: "easeOut", // More abrupt movements
          repeatDelay: 0.05 // Brief pauses between shakes
        }
      },
      y: {
        animate: [7 * shakeIntensity, -6 * shakeIntensity],
        transition: { 
          duration: 0.15 / shakeIntensity,
          repeat: Infinity, 
          repeatType: "mirror",
          ease: "backOut", // Overshooting effect
          delay: 0.03, // Offset to create diagonal movement
          repeatDelay: 0.02
        }
      },
      // Add rotation for extreme streaks
      rotate: streak >= 12 ? {
        animate: [-5, 5],
        transition: {
          duration: 0.2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }
      } : null
    }
  }
  
  const shakeAnimations = getShakeAnimations()
  
  // Effects that get more extreme with higher negative streaks
  const getAdditionalEffects = () => {
    if (!databaseData?.isNegative || !streak) return null;
    
    if (streak >= 15) {
      return {
        filter: `blur(${intensity.blur}px) hue-rotate(${Math.sin(Date.now() * 0.002) * 30}deg)`,
        opacity: [0.8, 1],
        transition: {
          opacity: {
            duration: 0.2,
            repeat: Infinity,
            repeatType: "mirror"
          }
        },
        letterSpacing: ["0px", "3px"]
      };
    }
    
    if (streak >= 10) {
      return {
        filter: `blur(${intensity.blur}px)`,
        letterSpacing: ["0px", "2px"],
        transition: {
          letterSpacing: {
            duration: 0.3,
            repeat: Infinity,
            repeatType: "mirror"
          }
        }
      };
    }
    
    return {
      filter: `blur(${intensity.blur}px)`
    };
  }
  
  const additionalEffects = getAdditionalEffects();

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <p className={cn(
        "text-3xl transition-all duration-300",
        databaseData?.isNegative && streak && streak >= 5 ? "text-red-400" : ""
      )}>
        Penenew está
      </p>
      
      <motion.div className="relative">
        <motion.span 
          className={cn(
            databaseData?.isNegative ? 'text-red-500' : 'text-green-500', 
            'text-9xl font-extrabold'
          )}
          animate={{ 
            scale: intensity.scale,
            rotate: intensity.rotate,
          }}
          {...(shakeAnimations && {
            animate: {
              scale: intensity.scale,
              x: shakeAnimations.x.animate,
              y: shakeAnimations.y.animate,
              ...(shakeAnimations.rotate ? { rotate: shakeAnimations.rotate.animate } : { rotate: intensity.rotate })
            },
            transition: {
              scale: { duration: 0.8, repeat: Infinity, repeatType: "reverse" },
              x: shakeAnimations.x.transition,
              y: shakeAnimations.y.transition,
              ...(shakeAnimations.rotate ? { rotate: shakeAnimations.rotate.transition } : 
                { rotate: { duration: 0.8, repeat: Infinity, repeatType: "reverse" } })
            }
          })}
          {...(!shakeAnimations && {
            transition: { 
              duration: 0.8, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }
          })}
          style={{ 
            textShadow: intensity.glow,
            display: 'inline-block',
            ...(additionalEffects ? { filter: additionalEffects.filter } : {})
          }}
          {...(additionalEffects && additionalEffects.opacity && {
            animate: {
              ...shakeAnimations ? {
                x: shakeAnimations.x.animate,
                y: shakeAnimations.y.animate,
                ...(shakeAnimations.rotate ? { rotate: shakeAnimations.rotate.animate } : {})
              } : {},
              opacity: additionalEffects.opacity,
              ...(additionalEffects.letterSpacing ? { letterSpacing: additionalEffects.letterSpacing } : {})
            },
            transition: {
              ...shakeAnimations ? {
                x: shakeAnimations.x.transition,
                y: shakeAnimations.y.transition,
                ...(shakeAnimations.rotate ? { rotate: shakeAnimations.rotate.transition } : {})
              } : {},
              ...(additionalEffects.transition || {})
            }
          })}
        >
          {streak}
        </motion.span>
        
        {/* Extra glitch effect for extreme streaks */}
        {databaseData?.isNegative && streak >= 12 && (
          <motion.span 
            className="absolute inset-0 text-9xl font-extrabold text-red-700/30"
            style={{ 
              textShadow: '0 0 8px rgba(255, 0, 0, 0.8)',
              display: 'inline-block',
              filter: 'blur(1px)'
            }}
            animate={{
              x: [-2, 2, -1, 3, -3],
              y: [1, -2, 2, -1, 1]
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear"
            }}
          >
            {streak}
          </motion.span>
        )}
        
        {/* Flame effects for high negative streaks */}
        {databaseData?.isNegative && streak >= 8 && (
          <motion.div 
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: -1 }}
          >
            <motion.div 
              className={cn(
                "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-32 rounded-full filter blur-xl",
                streak >= 15 ? "bg-gradient-to-t from-red-700 via-purple-600 to-red-400 opacity-80" :
                streak >= 12 ? "bg-gradient-to-t from-red-700 via-orange-400 to-yellow-300 opacity-75" :
                "bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 opacity-70"
              )}
              animate={{ 
                height: streak >= 12 ? ["70%", "90%", "80%"] : ["60%", "70%"],
                width: streak >= 12 ? ["90%", "110%", "100%"] : ["80%", "90%"]
              }}
              transition={{ 
                duration: streak >= 12 ? 1.0 : 1.5, 
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
            
            {/* Additional particles for extreme streaks */}
            {streak >= 12 && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="absolute bg-red-500 rounded-full w-2 h-2 opacity-70 filter blur-sm"
                    animate={{
                      y: [0, -100 - (i * 20)],
                      x: [0, (i % 2 === 0 ? 1 : -1) * (20 + (i * 5))],
                      opacity: [0.7, 0]
                    }}
                    transition={{
                      duration: 2 - (i * 0.2),
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    style={{
                      bottom: '30%',
                      left: `${45 + (i * 2)}%`
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
        )}
      </motion.div>
      
      <p className="text-4xl font-bold">
        partidas seguidas <span className={cn(databaseData?.isNegative ? 'text-red-500' : 'text-green-500')}>{statusTranslations}</span>
      </p>
      
      {/* Taunting message */}
    </div>
  )
}

export default StreakCounter