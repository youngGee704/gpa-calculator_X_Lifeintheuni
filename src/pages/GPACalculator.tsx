
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle, Trash2, Info, X, Printer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Course, GRADES, GRADE_POINTS, formatGPA } from '@/types';
import GradePointTable from '@/components/GradePointTable';
import { toast } from '@/components/ui/use-toast';
import { useReactToPrint } from 'react-to-print';
import PrintableResult from '@/components/PrintableResult';

const GPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const [calculatedGPA, setCalculatedGPA] = useState<number | null>(null);
  const [totalCreditUnits, setTotalCreditUnits] = useState<number>(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState<number>(0);
  const [studentName, setStudentName] = useState<string>('');
  
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  
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
    const tce = coursesWithPoints.reduce(
      (sum, course) => sum + (course.qualityPoints || 0), 0
    );
    
    const tcr = coursesWithPoints.reduce(
      (sum, course) => sum + course.creditUnits, 0
    );

    const gpa = tcr > 0 ? tce / tcr : 0;

    // Update courses with calculated points
    setCourses(coursesWithPoints);
    setCalculatedGPA(gpa);
    setTotalCreditUnits(tcr);
    setTotalQualityPoints(tce);
    
    // Show result toast
    toast({
      title: "GPA Calculated",
      description: `Your GPA is ${formatGPA(gpa)} from ${tcr} Credit Units`,
    });
  };

  const resetForm = () => {
    setCourses([{ id: uuidv4(), code: '', creditUnits: 0, grade: '' }]);
    setCalculatedGPA(null);
    setTotalCreditUnits(0);
    setTotalQualityPoints(0);
    setStudentName('');
  };

  const printData = calculatedGPA !== null ? [
    { label: "Total Courses", value: courses.length },
    { label: "Total Credit Units (TCR)", value: totalCreditUnits },
    { label: "Total Quality Points (TCE)", value: totalQualityPoints },
    { label: "Grade Point Average (GPA)", value: formatGPA(calculatedGPA) },
  ] : [];

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
            <CardTitle>Student Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
                Student Name (Optional)
              </label>
              <Input 
                id="studentName"
                placeholder="Enter your name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

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
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Grade Point Average (GPA)</h4>
                    <p className="mb-2">The formula is simple:</p>
                    <div className="bg-gray-100 p-2 rounded text-center my-2">
                      GPA = Total Credit Earned (TCE) ÷ Total Credit Registered (TCR)
                    </div>
                    <p className="mb-2">Quality Points = Grade Point × Credit Units</p>
                  </div>
                  <GradePointTable />
                </div>
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

      {calculatedGPA !== null && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>GPA Result</CardTitle>
              <Button 
                onClick={handlePrint} 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
              >
                <Printer className="h-4 w-4" /> Print Result
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Total Credit Units (TCR)</p>
                  <p className="text-2xl font-bold">{totalCreditUnits}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Total Quality Points (TCE)</p>
                  <p className="text-2xl font-bold">{totalQualityPoints}</p>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-md text-center">
                <p className="text-sm text-blue-600 mb-2">Your Grade Point Average (GPA)</p>
                <p className="text-4xl font-bold text-blue-700">{formatGPA(calculatedGPA)}</p>
                <p className="mt-2 text-blue-600">{calculateGradeClass(calculatedGPA)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hidden printable component */}
      <div className="hidden">
        <PrintableResult
          ref={printRef}
          title="GPA Calculation Result"
          data={printData}
          studentName={studentName}
        />
      </div>
    </div>
  );
};

// Helper function to match the existing function in types
const calculateGradeClass = (gpa: number): string => {
  if (gpa >= 4.5) return 'First Class Honours';
  if (gpa >= 3.5) return 'Second Class Honours (Upper Division)';
  if (gpa >= 2.4) return 'Second Class Honours (Lower Division)';
  if (gpa >= 1.5) return 'Third Class Honours';
  if (gpa >= 1.0) return 'Pass';
  return 'Fail';
};

export default GPACalculator;
