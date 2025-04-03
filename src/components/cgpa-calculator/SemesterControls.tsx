
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCGPACalculator } from '@/context/CGPACalculatorContext';

const SemesterControls: React.FC = () => {
  const { addSemester, resetForm, calculateCGPA } = useCGPACalculator();
  
  return (
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
  );
};

export default SemesterControls;
