
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

const SemesterTable: React.FC = () => {
  const { 
    semesters, 
    updateSemester, 
    removeSemester, 
    handleGPAChange,
    handleCreditUnitsChange
  } = useCGPACalculator();
  
  return (
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
                min="0"
                placeholder="e.g. 18" 
                value={semester.totalCreditUnits === 0 ? '' : semester.totalCreditUnits}
                onChange={(e) => handleCreditUnitsChange(semester.id, e.target.value)}
              />
            </TableCell>
            <TableCell>
              <Input 
                type="number"
                step="0.01"
                min="0"
                max="5"
                placeholder="e.g. 4.50" 
                value={semester.gpa === 0 ? '' : semester.gpa}
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
  );
};

export default SemesterTable;
