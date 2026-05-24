"use client";

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-frame bg-[#f0e6ff]">
      {children}
    </div>
  );
}
