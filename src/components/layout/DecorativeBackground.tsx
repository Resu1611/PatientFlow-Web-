import React from 'react';

export default function DecorativeBackground() {
  return (
    <>
      <div
        className="absolute top-0 left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, rgba(26,64,41,0.7) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-20 right-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none animate-float-slow"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-60 left-[30%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(206,248,141,0.08) 0%, transparent 70%)' }}
      />
    </>
  );
}
