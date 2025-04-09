
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody,
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useCGPACalculator } from '@/context/CGPACalculatorContext';
import { formatGPA } from '@/types';
import { toast } from '@/components/ui/use-toast';

const SemesterTable: React.FC = () => {
  const { 
    semesters, 
    updateSemester, 
    removeSemester, 
  } = useCGPACalculator();
  
  const handleTCRChange = (id: string, value: string) => {
    if (value === '') {
      updateSemester(id, 'totalCreditRegistered', 0);
      return;
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) {
      toast({
        title: "Invalid Input",
        description: "Credit units must be a positive number",
        variant: "destructive",
      });
      return;
    }
    
    updateSemester(id, 'totalCreditRegistered', numValue);
  };

  const handleTGPChange = (id: string, value: string) => {
    if (value === '') {
      updateSemester(id, 'totalGradePoints', 0);
      return;
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) {
      toast({
        title: "Invalid Input",
        description: "Total Grade Points must be a positive number",
        variant: "destructive",
      });
      return;
    }
    
    updateSemester(id, 'totalGradePoints', numValue);
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Semester Name</TableHead>
          <TableHead>Total Credit Registered (TCR)</TableHead>
          <TableHead>Total Grade Points (TGP)</TableHead>
          <TableHead>Semester GPA</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {semesters.map((semester) => {
          const semesterGPA = semester.totalCreditRegistered > 0 
            ? semester.totalGradePoints / semester.totalCreditRegistered 
            : 0;
            
          return (
            <TableRow key={semester.id}>
              <TableCell>
                <Input 
                  placeholder="e.g. Year 1, Semester 1" 
                  value={semester.name}
                  onChange={(e) => updateSemester(semester.id, 'name', e.target.value)}
                  className="font-sans"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 24" 
                  value={semester.totalCreditRegistered === 0 ? '' : semester.totalCreditRegistered}
                  onChange={(e) => handleTCRChange(semester.id, e.target.value)}
                  className="font-sans"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 114" 
                  value={semester.totalGradePoints === 0 ? '' : semester.totalGradePoints}
                  onChange={(e) => handleTGPChange(semester.id, e.target.value)}
                  className="font-sans"
                />
              </TableCell>
              <TableCell>
                <div className="text-center font-sans">
                  {formatGPA(semesterGPA)}
                </div>
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
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SemesterTable;
