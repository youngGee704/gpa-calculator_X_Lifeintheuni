
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCGPACalculator } from '@/context/CGPACalculatorContext';

const StudentInfoCard: React.FC = () => {
  const { studentName, setStudentName } = useCGPACalculator();
  
  return (
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
  );
};

export default StudentInfoCard;
