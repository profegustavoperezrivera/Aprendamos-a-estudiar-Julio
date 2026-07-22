import React, { useState, useEffect } from 'react';
import { Play, Square, RefreshCw, Wind, Smile, Activity } from 'lucide-react';

export default function ActiveBreak() {
  const [exercise, setExercise] = useState<'breath' | 'mobility' | 'stretch'>('breath');
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [breathPhase, setBreathPhase] = useState<'Inhala' | 'Retén' | 'Exhala'>('Inhala');
  const [breathCount, setBreathCount] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        
        // For breathing exercise, guide through Inhale (5s), Hold (5s), Exhale (5s)
        if (exercise === 'breath') {
          const cycleSec = (30 - timeLeft) % 15;
          if (cycleSec < 5) {
            setBreathPhase('Inhala');
          } else if (cycleSec < 10) {
            setBreathPhase('Retén');
          } else {
            setBreathPhase('Exhala');
          }
        }
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      if (exercise === 'breath') {
        setBreathCount((prev) => prev + 1);
      }
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, exercise]);

  const startTimer = () => {
    setTimeLeft(30);
    setTimerActive(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setTimeLeft(30);
    setBreathPhase('Inhala');
  };

  return (
    <div id="active-break-container" className="bg-amber-500/20 backdrop-blur-xl border border-amber-200/40 rounded-2xl p-6 shadow-lg max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="h-6 w-6 text-white animate-pulse" />
        <h3 className="text-xl font-bold text-white drop-shadow-sm">Pausa Activa Obligatoria (50 mins)</h3>
      </div>
      
      <p className="text-white/95 text-sm mb-6 font-semibold">
        Es momento de oxigenar el cerebro y relajar el cuerpo. Elige una de estas tres rutinas rápidas para recargar energías:
      </p>

      {/* Tabs */}
      <div className="flex border-b border-amber-200/30 mb-6">
        <button
          id="btn-tab-breath"
          onClick={() => { setExercise('breath'); resetTimer(); }}
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            exercise === 'breath'
              ? 'border-white text-white font-bold'
              : 'border-transparent text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          Respiración
        </button>
        <button
          id="btn-tab-mobility"
          onClick={() => { setExercise('mobility'); resetTimer(); }}
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            exercise === 'mobility'
              ? 'border-white text-white font-bold'
              : 'border-transparent text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          Movilidad
        </button>
        <button
          id="btn-tab-stretch"
          onClick={() => { setExercise('stretch'); resetTimer(); }}
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            exercise === 'stretch'
              ? 'border-white text-white font-bold'
              : 'border-transparent text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          Estiramiento
        </button>
      </div>

      {/* Exercise Content */}
      <div className="min-h-[220px] flex flex-col justify-between">
        {exercise === 'breath' && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 bg-white/40 shadow-sm border border-white/20 rounded-full mb-4">
              <Wind className={`h-10 w-10 text-amber-950 ${timerActive ? 'animate-bounce' : ''}`} />
            </div>
            <h4 className="font-bold text-white text-lg mb-1 drop-shadow-sm">Respiración Profunda (5-5-5)</h4>
            <p className="text-sm text-white/95 mb-4 font-medium">Inhala, retén y exhala lentamente durante 5 segundos cada uno.</p>
            
            {timerActive ? (
              <div className="mb-4">
                <div className="text-3xl font-black text-white drop-shadow-md transition-all duration-500 scale-110">
                  {breathPhase}
                </div>
                <div className="text-sm text-white/90 mt-1 font-semibold">Tiempo restante del ciclo: {timeLeft}s</div>
              </div>
            ) : (
              <div className="text-sm text-white/80 mb-4 font-semibold italic">
                {breathCount > 0 ? `¡Buen trabajo! Has completado ${breathCount} ciclo(s) de respiración.` : 'Listo para comenzar...'}
              </div>
            )}
          </div>
        )}

        {exercise === 'mobility' && (
          <div className="text-left space-y-3">
            <h4 className="font-bold text-white text-lg text-center mb-1 drop-shadow-sm">Movilidad Articular (30s)</h4>
            <ul className="text-sm text-white/95 space-y-2 list-disc list-inside font-medium">
              <li><strong className="text-white font-bold">Separar y juntar brazos</strong>: 10 repeticiones de hombros.</li>
              <li><strong className="text-white font-bold">Rotación completa de tronco</strong>: 5 giros suaves a cada lado.</li>
              <li><strong className="text-white font-bold">Elevación de rodillas</strong>: Levanta cada pierna 10 veces al pecho.</li>
            </ul>
            <p className="text-xs text-white/80 text-center italic mt-2 font-semibold">Usa el cronómetro de abajo para guiar tu tiempo.</p>
          </div>
        )}

        {exercise === 'stretch' && (
          <div className="text-left space-y-3">
            <h4 className="font-bold text-white text-lg text-center mb-1 drop-shadow-sm">Estiramientos Rápidos (30s)</h4>
            <ul className="text-sm text-white/95 space-y-2 list-disc list-inside font-medium">
              <li><strong className="text-white font-bold">Estiramiento de brazos</strong>: Brazos hacia arriba entrelazando dedos (5s x 3 ciclos).</li>
              <li><strong className="text-white font-bold">Tocar puntas de pies</strong>: Dobla el tronco hacia abajo intentando tocar la punta de tus pies sin flexionar las rodillas (5s x 3 ciclos).</li>
            </ul>
            <p className="text-xs text-white/80 text-center italic mt-2 font-semibold">Mantén la respiración fluida mientras estiras.</p>
          </div>
        )}

        {/* Timer controls */}
        <div className="mt-6 pt-4 border-t border-amber-200/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-mono font-bold text-white drop-shadow-sm">
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </span>
          </div>
          
          <div className="flex gap-2">
            {!timerActive ? (
              <button
                id="btn-active-break-start"
                onClick={startTimer}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer"
              >
                <Play className="h-4 w-4" /> Comenzar
              </button>
            ) : (
              <button
                id="btn-active-break-stop"
                onClick={stopTimer}
                className="px-4 py-2 bg-white/40 hover:bg-white/60 text-amber-950 border border-white/30 rounded-lg text-sm font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
              >
                <Square className="h-4 w-4" /> Detener
              </button>
            )}
            <button
              id="btn-active-break-reset"
              onClick={resetTimer}
              className="p-2 bg-white/25 hover:bg-white/45 text-white border border-white/20 rounded-lg text-sm transition-all cursor-pointer shadow-sm"
              title="Reiniciar"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
