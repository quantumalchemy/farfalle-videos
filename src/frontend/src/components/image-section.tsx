/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { Skeleton } from "./ui/skeleton";

export const ImageSectionSkeleton = () => {
  return (
    <div className="my-4 grid grid-cols-1 gap-2 lg:grid-cols-2 w-full">
      {[...Array(4)].map((_, index) => (
        <div className="w-full h-full" key={`image-skeleton-${index}`}>
          <Skeleton className="rounded-md object-cover shadow-none border-none w-full bg-card h-[160px] " />
        </div>
      ))}
    </div>
  );
};

export function ImageSection({ images }: { images: string[] }) {
  if (images && images.length > 0) {
    return (
      <div className="my-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
        {images.map((image) => {
          let videoId;
          try {
            videoId = new URL(image).searchParams.get('v');
          } catch (error) {
            console.error('Invalid URL:', image);
          }
          
          const thumbnailSrc = videoId 
            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            : image;

          return (
            <a
              key={videoId || image}
              href={image}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-video w-full h-full overflow-hidden hover:scale-[1.03] duration-150 rounded-lg transition-all shadow-md relative"
            >
              <img
                src={thumbnailSrc}
                alt={videoId ? `YouTube video thumbnail for ${videoId}` : 'Image'}
                className="w-full object-cover object-top h-full max-h-[90vh]"
              />
              {videoId && (
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {videoId}
                </span>
              )}
            </a>
          );
        })}
      </div>
    );
  }
  return null;
}
