
import React, { useRef } from 'react';
import { Printer } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCGPACalculator } from '@/context/CGPACalculatorContext';
import { formatGPA, calculateGradeClass } from '@/types';
import PdfDownloadButton from '@/components/PdfDownloadButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CGPAResultCardProps {
  onPrint: () => void;
}

const CGPAResultCard: React.FC<CGPAResultCardProps> = ({ onPrint }) => {
  const { 
    calculatedCGPA, 
    totalCreditRegisteredAll, 
    totalCreditEarnedAll,
    studentName 
  } = useCGPACalculator();
  
  const printRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  if (calculatedCGPA === null) return null;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-sans">CGPA Result</CardTitle>
          <div className="flex gap-2">
            <Button 
              onClick={onPrint}
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 font-sans"
            >
              <Printer className="h-4 w-4" /> Print Result
            </Button>
            <PdfDownloadButton 
              contentRef={printRef} 
              fileName={`CGPA-Result-${studentName || 'Student'}`} 
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isMobile && (
            <Alert variant="warning" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-sans">
                Mobile app users: Please use the "Download PDF" option instead of printing for better compatibility.
              </AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500 font-sans">Total Credit Registered (TCR)</p>
              <p className="text-2xl font-bold font-sans">{totalCreditRegisteredAll}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500 font-sans">Total Grade Points (TGP)</p>
              <p className="text-2xl font-bold font-sans">{totalCreditEarnedAll}</p>
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-md text-center">
            <p className="text-sm text-blue-600 mb-2 font-sans">Your Cumulative Grade Point Average (CGPA)</p>
            <p className="text-4xl font-bold text-blue-700 font-sans">{formatGPA(calculatedCGPA)}</p>
            <p className="mt-2 text-blue-600 font-sans">{calculateGradeClass(calculatedCGPA)}</p>
          </div>
        </div>
        
        {/* Add this hidden div for PDF printing/download */}
        <div className="hidden" ref={printRef} />
      </CardContent>
    </Card>
  );
};

export default CGPAResultCard;
