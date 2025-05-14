import React from "react";
import CourseCard from "@/components/course-card";
import { Link } from "react-router-dom";

export default function CoursePage({ courses }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-white">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {courses.map((course) => (
          <Link to={`/course/${course.id}`} key={course.id}>
            <CourseCard
              title={course.title}
              joined={course.joined}
              rating={course.rating}
              thumbnail={course.thumbnail}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
