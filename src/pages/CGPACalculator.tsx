
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle, Trash2, Info, X, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Semester, formatGPA, calculateGradeClass } from '@/types';
import GradePointTable from '@/components/GradePointTable';
import { toast } from '@/components/ui/use-toast';

const CGPACalculator = () => {
  const [semesters, setSemesters] = useState<Semester[]>([
    { 
      id: uuidv4(), 
      name: 'Semester 1', 
      courses: [], 
      totalCreditUnits: 0, 
      totalQualityPoints: 0,
      gpa: 0 
    }
  ]);
  
  const [showInfo, setShowInfo] = useState(false);

  const addSemester = () => {
    setSemesters([
      ...semesters, 
      { 
        id: uuidv4(), 
        name: `Semester ${semesters.length + 1}`, 
        courses: [], 
        totalCreditUnits: 0, 
        totalQualityPoints: 0,
        gpa: 0 
      }
    ]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length === 1) {
      toast({
        title: "Cannot remove",
        description: "You need at least one semester to calculate CGPA",
        variant: "destructive",
      });
      return;
    }
    
    setSemesters(semesters.filter(semester => semester.id !== id));
  };

  const updateSemester = (id: string, field: keyof Semester, value: any) => {
    setSemesters(semesters.map(semester => {
      if (semester.id === id) {
        return { ...semester, [field]: value };
      }
      return semester;
    }));
  };

  const calculateCGPA = () => {
    // Validate inputs
    const invalidSemesters = semesters.filter(
      semester => !semester.name || semester.totalCreditUnits <= 0 || semester.gpa <= 0 || semester.gpa > 5
    );

    if (invalidSemesters.length > 0) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all semester details with valid GPAs (0-5) and credit units",
        variant: "destructive",
      });
      return;
    }

    // Calculate CGPA
    const totalQualityPoints = semesters.reduce(
      (sum, semester) => sum + semester.totalQualityPoints, 
      0
    );
    
    const totalCreditUnits = semesters.reduce(
      (sum, semester) => sum + semester.totalCreditUnits, 
      0
    );

    const cgpa = totalCreditUnits > 0 ? totalQualityPoints / totalCreditUnits : 0;
    const gradeClass = calculateGradeClass(cgpa);

    // Show result toast
    toast({
      title: "CGPA Calculated",
      description: `Your CGPA is ${formatGPA(cgpa)} (${gradeClass})`,
    });
  };

  const resetForm = () => {
    setSemesters([
      { 
        id: uuidv4(), 
        name: 'Semester 1', 
        courses: [], 
        totalCreditUnits: 0, 
        totalQualityPoints: 0,
        gpa: 0 
      }
    ]);
  };

  const handleGPAChange = (id: string, gpa: string) => {
    const numGpa = parseFloat(gpa);
    if (isNaN(numGpa) || numGpa < 0 || numGpa > 5) return;

    const semester = semesters.find(s => s.id === id);
    if (!semester) return;

    const totalQualityPoints = numGpa * semester.totalCreditUnits;
    
    updateSemester(id, 'gpa', numGpa);
    updateSemester(id, 'totalQualityPoints', totalQualityPoints);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Cumulative GPA (CGPA) Calculator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enter your semester GPAs and credit units to calculate your cumulative GPA based on the Nigerian university grading system.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Semester Details</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowInfo(!showInfo)}>
              {showInfo ? <X className="h-4 w-4" /> : <Info className="h-4 w-4" />}
            </Button>
          </div>
          <CardDescription>
            Add all your semesters with their GPAs and total credit units
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showInfo && (
            <Alert className="mb-6">
              <Info className="h-4 w-4" />
              <AlertTitle>How CGPA is calculated</AlertTitle>
              <AlertDescription>
                <p className="mb-2">CGPA = Sum of (GPA × Total Credit Units for each semester) ÷ Sum of all Credit Units</p>
                <GradePointTable />
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Degree Classification</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>4.50 - 5.00: First Class Honours</li>
                    <li>3.50 - 4.49: Second Class Honours (Upper Division)</li>
                    <li>2.40 - 3.49: Second Class Honours (Lower Division)</li>
                    <li>1.50 - 2.39: Third Class Honours</li>
                    <li>1.00 - 1.49: Pass</li>
                    <li>0.00 - 0.99: Fail</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Semester Name</TableHead>
                <TableHead>Total Credit Units</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead>Quality Points</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {semesters.map((semester) => (
                <TableRow key={semester.id}>
                  <TableCell>
                    <Input 
                      placeholder="e.g. Year 1, Semester 1" 
                      value={semester.name}
                      onChange={(e) => updateSemester(semester.id, 'name', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      min="1"
                      placeholder="e.g. 18" 
                      value={semester.totalCreditUnits || ''}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        updateSemester(semester.id, 'totalCreditUnits', value || 0);
                        // Update quality points when credit units change
                        updateSemester(
                          semester.id, 
                          'totalQualityPoints', 
                          semester.gpa * (value || 0)
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      min="0"
                      max="5"
                      step="0.01"
                      placeholder="e.g. 4.50" 
                      value={semester.gpa || ''}
                      onChange={(e) => handleGPAChange(semester.id, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    {formatGPA(semester.totalQualityPoints)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSemester(semester.id)}
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
              onClick={addSemester} 
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" /> Add Semester
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={resetForm}>Reset</Button>
              <Button onClick={calculateCGPA}>Calculate CGPA</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert variant="default" className="bg-gray-50 border border-gray-200">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Quick Tip</AlertTitle>
        <AlertDescription>
          To calculate your CGPA accurately, you need to know the total credit units and GPA for each semester. If you don't know your semester GPAs, use the GPA Calculator first.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default CGPACalculator;
