export default function AliveLogo({ className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center z-10 ${className}`}>
        <img 
            src="/logo_alive-removebg-preview.png" 
            alt="ALIVE Logo" 
            className="w-64 h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
        />
    </div>
  );
}
