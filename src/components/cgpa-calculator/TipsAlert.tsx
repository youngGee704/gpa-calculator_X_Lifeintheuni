
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const TipsAlert: React.FC = () => {
  return (
    <Alert variant="default" className="bg-gray-50 border border-gray-200">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Quick Tip</AlertTitle>
      <AlertDescription>
        To calculate your CGPA accurately, you need to know the total credit units and GPA for each semester. 
        If you don't know your semester GPAs, use the GPA Calculator first.
      </AlertDescription>
    </Alert>
  );
};

export default TipsAlert;
