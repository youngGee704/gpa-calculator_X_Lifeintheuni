
import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle, Trash2, Info, X, AlertCircle, Printer } from 'lucide-react';
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
import { useReactToPrint } from 'react-to-print';
import PrintableResult from '@/components/PrintableResult';

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
  const [studentName, setStudentName] = useState<string>('');
  const [calculatedCGPA, setCalculatedCGPA] = useState<number | null>(null);
  const [totalCreditUnitsAll, setTotalCreditUnitsAll] = useState<number>(0);
  const [totalQualityPointsAll, setTotalQualityPointsAll] = useState<number>(0);
  
  const printRef = useRef<HTMLDivElement>(null);

  // Fix: Use correct syntax for useReactToPrint
  const handlePrint = useReactToPrint({
    documentTitle: "CGPA Result",
    onPrintError: () => toast({
      title: "Print Error",
      description: "An error occurred while printing",
      variant: "destructive",
    }),
    content: () => printRef.current,
  });

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
      semester => !semester.name || semester.totalCreditUnits <= 0 || isNaN(semester.gpa) || semester.gpa > 5
    );

    if (invalidSemesters.length > 0) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all semester details with valid GPAs (0-5) and credit units",
        variant: "destructive",
      });
      return;
    }

    // Calculate CGPA - Total Quality Points divided by Total Credit Units
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

    setCalculatedCGPA(cgpa);
    setTotalCreditUnitsAll(totalCreditUnits);
    setTotalQualityPointsAll(totalQualityPoints);

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
    setStudentName('');
    setCalculatedCGPA(null);
    setTotalCreditUnitsAll(0);
    setTotalQualityPointsAll(0);
  };

  const handleGPAChange = (id: string, gpa: string) => {
    // Fix: Allow empty string for clearing the field
    if (gpa === '') {
      updateSemester(id, 'gpa', 0);
      updateSemester(id, 'totalQualityPoints', 0);
      return;
    }
    
    const numGpa = parseFloat(gpa);
    if (isNaN(numGpa) || numGpa < 0 || numGpa > 5) return;

    const semester = semesters.find(s => s.id === id);
    if (!semester) return;

    const totalQualityPoints = numGpa * semester.totalCreditUnits;
    
    updateSemester(id, 'gpa', numGpa);
    updateSemester(id, 'totalQualityPoints', totalQualityPoints);
  };

  const handleCreditUnitsChange = (id: string, creditUnits: string) => {
    const value = parseInt(creditUnits);
    if (isNaN(value) || value < 0) return;
    
    const semester = semesters.find(s => s.id === id);
    if (!semester) return;
    
    updateSemester(id, 'totalCreditUnits', value);
    // Update quality points when credit units change
    const totalQualityPoints = semester.gpa * value;
    updateSemester(id, 'totalQualityPoints', totalQualityPoints);
  };

  const printData = calculatedCGPA !== null ? [
    { label: "Total Semesters", value: semesters.length },
    { label: "Total Credit Units (TCR)", value: totalCreditUnitsAll },
    { label: "Total Quality Points (TCE)", value: totalQualityPointsAll },
    { label: "Cumulative Grade Point Average (CGPA)", value: formatGPA(calculatedCGPA) },
    { label: "Degree Classification", value: calculateGradeClass(calculatedCGPA) }
  ] : [];

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
              <AlertTitle>How to Calculate Your GPA and CGPA in 60 Seconds!</AlertTitle>
              <AlertDescription>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Grade Point Average (GPA)</h4>
                    <p className="mb-2">The formula is simple:</p>
                    <div className="bg-gray-100 p-2 rounded text-center my-2">
                      GPA = Total Credit Earned (TCE) ÷ Total Credit Registered (TCR)
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Cumulative Grade Point Average (CGPA)</h4>
                    <p className="mb-2">Your CGPA is an academic report of your performance per session.</p>
                    <div className="bg-gray-100 p-2 rounded text-center my-2">
                      CGPA = (TCE of 1st Semester + TCE of 2nd Semester) ÷ (TCR of 1st Semester + TCR of 2nd Semester)
                    </div>
                  </div>
                  
                  <GradePointTable />
                  
                  <div>
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
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Semester Name</TableHead>
                <TableHead>Total Credit Units (TCR)</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead>Quality Points (TCE)</TableHead>
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
                      onChange={(e) => handleCreditUnitsChange(semester.id, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      inputMode="decimal"
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

      {calculatedCGPA !== null && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>CGPA Result</CardTitle>
              {/* Fix: Pass a function to onClick that calls handlePrint */}
              <Button 
                onClick={() => handlePrint()} 
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
                  <p className="text-2xl font-bold">{totalCreditUnitsAll}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Total Quality Points (TCE)</p>
                  <p className="text-2xl font-bold">{totalQualityPointsAll}</p>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-md text-center">
                <p className="text-sm text-blue-600 mb-2">Your Cumulative Grade Point Average (CGPA)</p>
                <p className="text-4xl font-bold text-blue-700">{formatGPA(calculatedCGPA)}</p>
                <p className="mt-2 text-blue-600">{calculateGradeClass(calculatedCGPA)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Alert variant="default" className="bg-gray-50 border border-gray-200">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Quick Tip</AlertTitle>
        <AlertDescription>
          To calculate your CGPA accurately, you need to know the total credit units and GPA for each semester. If you don't know your semester GPAs, use the GPA Calculator first.
        </AlertDescription>
      </Alert>

      {/* Hidden printable component */}
      <div className="hidden">
        <PrintableResult
          ref={printRef}
          title="CGPA Calculation Result"
          data={printData}
          studentName={studentName}
        />
      </div>
    </div>
  );
};

export default CGPACalculator;
