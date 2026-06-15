"use client";

type MapBlockProps = {
  title: string;
  address?: string;
  lat: number;
  lng: number;
};

export default function MapBlock({
  title,
  address,
  lat,
  lng,
}: MapBlockProps) {
  return (
    <div className="w-full my-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
      
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">
          📍 {title}
        </h3>

        {address && (
          <p className="mt-1 text-sm text-white/50">
            {address}
          </p>
        )}
      </div>

      {/* Map */}
      <div className="w-full h-[400px]">
        <iframe
          title={title}
          width="100%"
          height="100%"
          loading="lazy"
          className="border-0"
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-white/10 text-xs text-white/40">
        <span>Latitude: {lat}</span>
        <span>Longitude: {lng}</span>
      </div>
    </div>
  );
}