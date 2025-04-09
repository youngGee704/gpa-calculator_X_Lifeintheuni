
import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Semester, formatGPA, calculateGradeClass } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface CGPACalculatorContextType {
  semesters: Semester[];
  studentName: string;
  calculatedCGPA: number | null;
  totalCreditRegisteredAll: number; // Changed from totalCreditUnitsAll
  totalCreditEarnedAll: number; // Changed from totalQualityPointsAll
  setStudentName: (name: string) => void;
  addSemester: () => void;
  removeSemester: (id: string) => void;
  updateSemester: (id: string, field: keyof Semester, value: any) => void;
  calculateCGPA: () => void;
  resetForm: () => void;
  handleGPAChange: (id: string, gpa: string) => void;
  handleCreditRegisteredChange: (id: string, creditUnits: string) => void; // Changed from handleCreditUnitsChange
}

const CGPACalculatorContext = createContext<CGPACalculatorContextType | undefined>(undefined);

export const CGPACalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [semesters, setSemesters] = useState<Semester[]>([
    { 
      id: uuidv4(), 
      name: 'Semester 1', 
      courses: [], 
      totalCreditRegistered: 0, // Changed from totalCreditUnits
      totalCreditEarned: 0, // Changed from totalQualityPoints
      gpa: 0 
    }
  ]);
  
  const [studentName, setStudentName] = useState<string>('');
  const [calculatedCGPA, setCalculatedCGPA] = useState<number | null>(null);
  const [totalCreditRegisteredAll, setTotalCreditRegisteredAll] = useState<number>(0); // Changed from totalCreditUnitsAll
  const [totalCreditEarnedAll, setTotalCreditEarnedAll] = useState<number>(0); // Changed from totalQualityPointsAll
  
  const addSemester = () => {
    setSemesters([
      ...semesters, 
      { 
        id: uuidv4(), 
        name: `Semester ${semesters.length + 1}`, 
        courses: [], 
        totalCreditRegistered: 0, // Changed from totalCreditUnits
        totalCreditEarned: 0, // Changed from totalQualityPoints
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
      semester => !semester.name || semester.totalCreditRegistered <= 0 || isNaN(semester.gpa) || semester.gpa > 5
    );

    if (invalidSemesters.length > 0) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all semester details with valid GPAs (0-5) and credit units",
        variant: "destructive",
      });
      return;
    }

    const totalCreditEarned = semesters.reduce(
      (sum, semester) => sum + semester.totalCreditEarned, 
      0
    );
    
    const totalCreditRegistered = semesters.reduce(
      (sum, semester) => sum + semester.totalCreditRegistered, 
      0
    );

    const cgpa = totalCreditRegistered > 0 ? totalCreditEarned / totalCreditRegistered : 0;

    setCalculatedCGPA(cgpa);
    setTotalCreditRegisteredAll(totalCreditRegistered);
    setTotalCreditEarnedAll(totalCreditEarned);

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
        totalCreditRegistered: 0, // Changed from totalCreditUnits
        totalCreditEarned: 0, // Changed from totalQualityPoints
        gpa: 0 
      }
    ]);
    setStudentName('');
    setCalculatedCGPA(null);
    setTotalCreditRegisteredAll(0);
    setTotalCreditEarnedAll(0);
  };

  const handleGPAChange = (id: string, gpa: string) => {
    if (gpa === '') {
      updateSemester(id, 'gpa', 0);
      updateSemester(id, 'totalCreditEarned', 0); // Changed from totalQualityPoints
      return;
    }
    
    const numGpa = parseFloat(gpa);
    if (isNaN(numGpa) || numGpa < 0 || numGpa > 5) return;

    const semester = semesters.find(s => s.id === id);
    if (!semester) return;

    const totalCreditEarned = numGpa * semester.totalCreditRegistered; // Changed from totalCreditUnits
    
    updateSemester(id, 'gpa', numGpa);
    updateSemester(id, 'totalCreditEarned', totalCreditEarned); // Changed from totalQualityPoints
  };

  const handleCreditRegisteredChange = (id: string, creditUnits: string) => {
    if (creditUnits === '') {
      updateSemester(id, 'totalCreditRegistered', 0); // Changed from totalCreditUnits
      updateSemester(id, 'totalCreditEarned', 0); // Changed from totalQualityPoints
      return;
    }
    
    const value = parseInt(creditUnits);
    if (isNaN(value) || value < 0) return;
    
    const semester = semesters.find(s => s.id === id);
    if (!semester) return;
    
    updateSemester(id, 'totalCreditRegistered', value); // Changed from totalCreditUnits
    const totalCreditEarned = semester.gpa * value; // Changed from totalQualityPoints
    updateSemester(id, 'totalCreditEarned', totalCreditEarned); // Changed from totalQualityPoints
  };

  return (
    <CGPACalculatorContext.Provider value={{
      semesters,
      studentName,
      calculatedCGPA,
      totalCreditRegisteredAll, // Changed from totalCreditUnitsAll
      totalCreditEarnedAll, // Changed from totalQualityPointsAll
      setStudentName,
      addSemester,
      removeSemester,
      updateSemester,
      calculateCGPA,
      resetForm,
      handleGPAChange,
      handleCreditRegisteredChange, // Changed from handleCreditUnitsChange
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
