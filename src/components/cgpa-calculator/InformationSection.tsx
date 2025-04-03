
import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import GradePointTable from '@/components/GradePointTable';

const InformationSection: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Semester Details</h2>
        <Button variant="outline" size="sm" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <X className="h-4 w-4" /> : <Info className="h-4 w-4" />}
        </Button>
      </div>
      
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
    </>
  );
};

export default InformationSection;
