
import React from 'react';
import { Card } from './ui/card';

interface PrintableResultProps {
  title: string;
  data: {
    label: string;
    value: string | number;
  }[];
  studentName?: string;
  courses?: {
    code: string;
    creditUnits: number;
    grade: string;
    gradePoint?: number;
    gradePoints?: number; // Changed from creditUnitsEarned
  }[];
  isGPA?: boolean;
}

const PrintableResult = React.forwardRef<HTMLDivElement, PrintableResultProps>(
  ({ title, data, studentName, courses = [], isGPA = false }, ref) => {
    const currentDate = new Date().toLocaleDateString();
    
    return (
      <div ref={ref} className="p-8 bg-white relative font-sans">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none z-0">
          <div className="rotate-[-30deg] scale-150">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <img src="/lovable-uploads/c5ef713b-88e0-4f41-9479-fc49556e5dfc.png" alt="GRIDVEM Logo" className="h-20" />
                <img src="/lovable-uploads/998b8c4d-175b-40c7-a061-24b4761da881.png" alt="Life In the University Logo" className="h-20" />
              </div>
              <p className="text-gray-800 font-semibold text-lg">
                Powered by GRIDVEM & Life In the University
              </p>
            </div>
          </div>
        </div>
        
        {/* Logos at top */}
        <div className="flex justify-between mb-6">
          <img src="/lovable-uploads/c5ef713b-88e0-4f41-9479-fc49556e5dfc.png" alt="GRIDVEM Logo" className="h-16" />
          <img src="/lovable-uploads/998b8c4d-175b-40c7-a061-24b4761da881.png" alt="Life In the University Logo" className="h-16" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            {studentName && (
              <h2 className="text-xl">Student: {studentName}</h2>
            )}
            <p className="text-sm text-gray-600">Date: {currentDate}</p>
          </div>
          
          <Card className="border shadow-sm p-6">
            {isGPA && courses && courses.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold mb-2">Course Details</h3>
                <table className="w-full border-collapse mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2 text-left">Course</th>
                      <th className="border px-4 py-2 text-left">Credit Units</th>
                      <th className="border px-4 py-2 text-left">Grade</th>
                      <th className="border px-4 py-2 text-left">Grade Point</th>
                      <th className="border px-4 py-2 text-left">Grade Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="border px-4 py-2">{course.code}</td>
                        <td className="border px-4 py-2">{course.creditUnits}</td>
                        <td className="border px-4 py-2">{course.grade}</td>
                        <td className="border px-4 py-2">{course.gradePoint}</td>
                        <td className="border px-4 py-2">{course.gradePoints}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <table className="w-full">
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-4 font-medium">{item.label}</td>
                    <td className="py-3 px-4 text-right">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Nigerian University GPA/CGPA Calculator</p>
            <p>© {new Date().getFullYear()} GRIDVEM & Life In the University</p>
          </div>
        </div>
      </div>
    );
  }
);

PrintableResult.displayName = "PrintableResult";

export default PrintableResult;
