export default function StarBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 3D-ish Emojis for stars and sparkles */}
      <div className="absolute top-[8%] left-[15%] text-white text-2xl drop-shadow-sm opacity-90">✨</div>
      <div className="absolute top-[6%] left-[45%] text-yellow-200 text-xl drop-shadow-sm opacity-90 animate-pulse">⭐</div>
      <div className="absolute top-[12%] right-[18%] text-purple-300 text-lg drop-shadow-sm opacity-70">✨</div>
      
      <div className="absolute top-[28%] left-[15%] text-white text-3xl drop-shadow-md opacity-90">⭐</div>
      <div className="absolute top-[25%] right-[25%] text-white text-2xl drop-shadow-md opacity-90">⭐</div>
      
      <div className="absolute top-[45%] left-[10%] text-purple-300 text-2xl drop-shadow-sm opacity-80">✨</div>
      <div className="absolute top-[48%] right-[12%] text-yellow-200 text-2xl drop-shadow-md opacity-90 animate-pulse delay-75">⭐</div>
      
      <div className="absolute bottom-[30%] left-[25%] text-white text-lg drop-shadow-sm opacity-80">⭐</div>
      <div className="absolute bottom-[18%] right-[8%] text-white text-4xl drop-shadow-lg opacity-90">⭐</div>
      
      <div className="absolute bottom-[4%] left-[12%] text-purple-300 text-3xl drop-shadow-sm opacity-70">✨</div>
      <div className="absolute bottom-[2%] left-[50%] text-yellow-200 text-2xl drop-shadow-sm opacity-90 animate-pulse delay-150">⭐</div>
    </div>
  );
}
