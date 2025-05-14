import React from "react";
import { useParams, Link } from "react-router-dom";
import { courses } from "@/data/course";
import star from "@/assets/icons/star.svg";
import user from "@/assets/icons/user.svg";
import { ChevronLeft } from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return <div className="p-6 text-red-600">Course not found.</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-2 sm:p-6 space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-gray-600 transition"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Courses
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        {course.title}
      </h1>

      <div className="w-full overflow-hidden rounded-md border border-gray-200">
        <video controls className="w-full aspect-video rounded-md">
          <source src={course.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <img src={user} alt="user icon" className="w-5 h-5" />
          <span className="font-medium">
            {course.joined.toLocaleString()} people joined
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img src={star} alt="star icon" className="w-5 h-5" />
          <span className="font-medium">{course.rating} / 5.0 rating</span>
        </div>
      </div>
    </div>
  );
}
