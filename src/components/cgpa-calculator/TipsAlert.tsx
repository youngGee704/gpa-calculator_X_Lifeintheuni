
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const TipsAlert: React.FC = () => {
  return (
    <Alert variant="default" className="bg-gray-50 border border-gray-200">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Quick Tip</AlertTitle>
      <AlertDescription className="font-sans">
        <p className="mb-2">To calculate your CGPA accurately, you need to know two values for each semester:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Total Credit Registered (TCR)</strong>: Sum of credit units for all courses registered in a semester</li>
          <li><strong>Total Grade Points (TGP)</strong>: Sum of (Grade Point × Credit Units) for all courses in a semester</li>
        </ul>
        <p className="mt-2">Formula: CGPA = Sum of all TGP ÷ Sum of all TCR</p>
      </AlertDescription>
    </Alert>
  );
};

export default TipsAlert;
