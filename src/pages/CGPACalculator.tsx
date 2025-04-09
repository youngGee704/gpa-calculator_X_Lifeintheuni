
import React, { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useReactToPrint } from 'react-to-print';
import { toast } from '@/components/ui/use-toast';
import PrintableResult from '@/components/PrintableResult';
import { CGPACalculatorProvider, useCGPACalculator } from '@/context/CGPACalculatorContext';
import { calculateGradeClass, formatGPA } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Import our refactored components
import StudentInfoCard from '@/components/cgpa-calculator/StudentInfoCard';
import InformationSection from '@/components/cgpa-calculator/InformationSection';
import SemesterTable from '@/components/cgpa-calculator/SemesterTable';
import SemesterControls from '@/components/cgpa-calculator/SemesterControls';
import CGPAResultCard from '@/components/cgpa-calculator/CGPAResultCard';
import TipsAlert from '@/components/cgpa-calculator/TipsAlert';

const CGPACalculatorContent: React.FC = () => {
  const { 
    semesters, 
    studentName, 
    calculatedCGPA, 
    totalCreditRegisteredAll,
    totalCreditEarnedAll
  } = useCGPACalculator();
  
  const printRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handlePrint = useReactToPrint({
    documentTitle: "CGPA Result",
    onPrintError: () => toast({
      title: "Print Error",
      description: "An error occurred while printing. Try using the Download PDF option instead.",
      variant: "destructive",
    }),
    contentRef: printRef,
  });

  const printData = calculatedCGPA !== null ? [
    { label: "Total Semesters", value: semesters.length },
    { label: "Total Credit Registered (TCR)", value: totalCreditRegisteredAll },
    { label: "Total Grade Points (TGP)", value: totalCreditEarnedAll },
    { label: "Cumulative Grade Point Average (CGPA)", value: formatGPA(calculatedCGPA) },
    { label: "Degree Classification", value: calculateGradeClass(calculatedCGPA) }
  ] : [];

  return (
    <div className="space-y-8 font-sans">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 font-sans">Cumulative GPA (CGPA) Calculator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto font-sans">
          Enter your semester GPAs and credit units to calculate your cumulative GPA based on the Nigerian university grading system.
        </p>
      </div>

      {isMobile && (
        <Alert variant="warning" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-sans">Mobile App User Notice</AlertTitle>
          <AlertDescription className="font-sans">
            For mobile app users: Use the "Download PDF" option instead of printing for better compatibility. 
            For full features, visit the web version at{" "}
            <a 
              href="https://life-in-the-university-gpacalculator.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              life-in-the-university-gpacalculator.netlify.app
            </a>
          </AlertDescription>
        </Alert>
      )}

      <StudentInfoCard />

      <Card>
        <CardHeader>
          <InformationSection />
          <CardDescription className="font-sans">
            Add all your semesters with their GPAs and total credit units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SemesterTable />
          <SemesterControls />
        </CardContent>
      </Card>

      <CGPAResultCard onPrint={handlePrint} />
      
      <TipsAlert />

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

// Wrap the entire component in our context provider
const CGPACalculator: React.FC = () => (
  <CGPACalculatorProvider>
    <CGPACalculatorContent />
  </CGPACalculatorProvider>
);

export default CGPACalculator;
