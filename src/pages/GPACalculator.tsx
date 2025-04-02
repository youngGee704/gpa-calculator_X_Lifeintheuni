
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle, Trash2, Info, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Course, GRADES, GRADE_POINTS, formatGPA } from '@/types';
import GradePointTable from '@/components/GradePointTable';
import { toast } from '@/components/ui/use-toast';

const GPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  
  // Initialize with one empty course
  useEffect(() => {
    if (courses.length === 0) {
      addCourse();
    }
  }, []);

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: uuidv4(), code: '', creditUnits: 0, grade: '' }
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length === 1) {
      toast({
        title: "Cannot remove",
        description: "You need at least one course to calculate GPA",
        variant: "destructive",
      });
      return;
    }
    
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course => {
      if (course.id === id) {
        return { ...course, [field]: value };
      }
      return course;
    }));
  };

  const calculateGPA = () => {
    // Validate inputs
    const invalidCourses = courses.filter(course => 
      !course.code || 
      !course.grade || 
      course.creditUnits <= 0
    );

    if (invalidCourses.length > 0) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all course details correctly",
        variant: "destructive",
      });
      return;
    }

    // Calculate quality points for each course
    const coursesWithPoints = courses.map(course => {
      const gradePoint = GRADE_POINTS[course.grade] || 0;
      const qualityPoints = gradePoint * course.creditUnits;
      return { ...course, gradePoint, qualityPoints };
    });

    // Calculate GPA
    const totalQualityPoints = coursesWithPoints.reduce(
      (sum, course) => sum + (course.qualityPoints || 0), 0
    );
    
    const totalCreditUnits = coursesWithPoints.reduce(
      (sum, course) => sum + course.creditUnits, 0
    );

    const gpa = totalCreditUnits > 0 ? totalQualityPoints / totalCreditUnits : 0;

    // Update courses with calculated points
    setCourses(coursesWithPoints);
    
    // Show result toast
    toast({
      title: "GPA Calculated",
      description: `Your GPA is ${formatGPA(gpa)} from ${totalCreditUnits} Credit Units`,
    });
  };

  const resetForm = () => {
    setCourses([{ id: uuidv4(), code: '', creditUnits: 0, grade: '' }]);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Semester GPA Calculator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enter your courses, credit units, and grades to calculate your semester GPA based on the Nigerian university grading system.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Course Details</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowInfo(!showInfo)}>
              {showInfo ? <X className="h-4 w-4" /> : <Info className="h-4 w-4" />}
            </Button>
          </div>
          <CardDescription>
            Add all your courses for the semester
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showInfo && (
            <Alert className="mb-6">
              <Info className="h-4 w-4" />
              <AlertTitle>How GPA is calculated</AlertTitle>
              <AlertDescription>
                <p className="mb-2">GPA = Total Quality Points ÷ Total Credit Units</p>
                <p className="mb-2">Quality Points = Grade Point × Credit Units</p>
                <GradePointTable />
              </AlertDescription>
            </Alert>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Code</TableHead>
                <TableHead>Credit Units</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <Input 
                      placeholder="e.g. MTH101" 
                      value={course.code}
                      onChange={(e) => updateCourse(course.id, 'code', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={course.creditUnits.toString()}
                      onValueChange={(value) => updateCourse(course.id, 'creditUnits', parseInt(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Units" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((unit) => (
                          <SelectItem key={unit} value={unit.toString()}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={course.grade}
                      onValueChange={(value) => updateCourse(course.id, 'grade', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {GRADES.map((grade) => (
                          <SelectItem key={grade.value} value={grade.value}>
                            {grade.name} ({grade.points})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCourse(course.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={addCourse} 
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" /> Add Course
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={resetForm}>Reset</Button>
              <Button onClick={calculateGPA}>Calculate GPA</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GPACalculator;
