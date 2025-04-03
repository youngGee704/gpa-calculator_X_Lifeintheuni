
import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Semester, formatGPA, calculateGradeClass } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface CGPACalculatorContextType {
  semesters: Semester[];
  studentName: string;
  calculatedCGPA: number | null;
  totalCreditUnitsAll: number;
  totalQualityPointsAll: number;
  setStudentName: (name: string) => void;
  addSemester: () => void;
  removeSemester: (id: string) => void;
  updateSemester: (id: string, field: keyof Semester, value: any) => void;
  calculateCGPA: () => void;
  resetForm: () => void;
  handleGPAChange: (id: string, gpa: string) => void;
  handleCreditUnitsChange: (id: string, creditUnits: string) => void;
}

const CGPACalculatorContext = createContext<CGPACalculatorContextType | undefined>(undefined);

export const CGPACalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
  
  const [studentName, setStudentName] = useState<string>('');
  const [calculatedCGPA, setCalculatedCGPA] = useState<number | null>(null);
  const [totalCreditUnitsAll, setTotalCreditUnitsAll] = useState<number>(0);
  const [totalQualityPointsAll, setTotalQualityPointsAll] = useState<number>(0);
  
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

    const totalQualityPoints = semesters.reduce(
      (sum, semester) => sum + semester.totalQualityPoints, 
      0
    );
    
    const totalCreditUnits = semesters.reduce(
      (sum, semester) => sum + semester.totalCreditUnits, 
      0
    );

    const cgpa = totalCreditUnits > 0 ? totalQualityPoints / totalCreditUnits : 0;

    setCalculatedCGPA(cgpa);
    setTotalCreditUnitsAll(totalCreditUnits);
    setTotalQualityPointsAll(totalQualityPoints);

    toast({
      title: "CGPA Calculated",
      description: `Your CGPA is ${formatGPA(cgpa)} (${calculateGradeClass(cgpa)})`,
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
    if (creditUnits === '') {
      updateSemester(id, 'totalCreditUnits', 0);
      updateSemester(id, 'totalQualityPoints', 0);
      return;
    }
    
    const value = parseInt(creditUnits);
    if (isNaN(value) || value < 0) return;
    
    const semester = semesters.find(s => s.id === id);
    if (!semester) return;
    
    updateSemester(id, 'totalCreditUnits', value);
    const totalQualityPoints = semester.gpa * value;
    updateSemester(id, 'totalQualityPoints', totalQualityPoints);
  };

  return (
    <CGPACalculatorContext.Provider value={{
      semesters,
      studentName,
      calculatedCGPA,
      totalCreditUnitsAll,
      totalQualityPointsAll,
      setStudentName,
      addSemester,
      removeSemester,
      updateSemester,
      calculateCGPA,
      resetForm,
      handleGPAChange,
      handleCreditUnitsChange,
    }}>
      {children}
    </CGPACalculatorContext.Provider>
  );
};

export const useCGPACalculator = () => {
  const context = useContext(CGPACalculatorContext);
  if (context === undefined) {
    throw new Error('useCGPACalculator must be used within a CGPACalculatorProvider');
  }
  return context;
};
