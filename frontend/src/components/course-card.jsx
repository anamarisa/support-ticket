import React from "react";
import star from "../assets/icons/star.svg";
import user from "../assets/icons/user.svg";

export default function CourseCard({
  title,
  joined,
  rating,
  thumbnail,
  onPlay,
}) {
  return (
    <div className="font-inter rounded-md border bg-white shadow-xs overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="aspect-video w-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="text-2xl font-semibold tracking-[-0.019em] leading-[118%] line-clamp-2">
          {title}
        </h2>
        <div className="text-sm text-muted-foreground flex flex-row items-center gap-2 my-2">
          <p className="flex items-center gap-1">
            <img src={user} alt="" className="size-4" />
            {joined} Joined
          </p>
          <p className="flex items-center gap-1">
            <img src={star} className="size-4" alt="" />
            {rating} Rating
          </p>
        </div>
        <button
          onClick={onPlay}
          className="mt-auto cursor-pointer bg-[#142946] hover:bg-[#334054] text-white rounded-md px-4 py-2 text-sm font-medium"
        >
          Play Now
        </button>
      </div>
    </div>
  );
}
