
import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Semester, formatGPA, calculateGradeClass } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface CGPACalculatorContextType {
  semesters: Semester[];
  studentName: string;
  calculatedCGPA: number | null;
  totalCreditRegisteredAll: number;
  totalCreditEarnedAll: number;
  setStudentName: (name: string) => void;
  addSemester: () => void;
  removeSemester: (id: string) => void;
  updateSemester: (id: string, field: keyof Semester, value: any) => void;
  calculateCGPA: () => void;
  resetForm: () => void;
}

const CGPACalculatorContext = createContext<CGPACalculatorContextType | undefined>(undefined);

export const CGPACalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [semesters, setSemesters] = useState<Semester[]>([
    { 
      id: uuidv4(), 
      name: 'Semester 1', 
      courses: [], 
      totalCreditRegistered: 0,
      totalCreditEarned: 0,
      gpa: 0 
    }
  ]);
  
  const [studentName, setStudentName] = useState<string>('');
  const [calculatedCGPA, setCalculatedCGPA] = useState<number | null>(null);
  const [totalCreditRegisteredAll, setTotalCreditRegisteredAll] = useState<number>(0);
  const [totalCreditEarnedAll, setTotalCreditEarnedAll] = useState<number>(0);
  
  const addSemester = () => {
    setSemesters([
      ...semesters, 
      { 
        id: uuidv4(), 
        name: `Semester ${semesters.length + 1}`, 
        courses: [], 
        totalCreditRegistered: 0,
        totalCreditEarned: 0,
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
        // If updating totalCreditRegistered or totalCreditEarned,
        // also update the gpa if possible
        if ((field === 'totalCreditRegistered' || field === 'totalCreditEarned') && semester.totalCreditRegistered > 0) {
          const updatedSemester = { ...semester, [field]: value };
          const gpa = updatedSemester.totalCreditRegistered > 0 
            ? updatedSemester.totalCreditEarned / updatedSemester.totalCreditRegistered 
            : 0;
          return { ...updatedSemester, gpa };
        }
        return { ...semester, [field]: value };
      }
      return semester;
    }));
  };

  const calculateCGPA = () => {
    const invalidSemesters = semesters.filter(
      semester => !semester.name || semester.totalCreditRegistered <= 0 || semester.totalCreditEarned <= 0
    );

    if (invalidSemesters.length > 0) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all semester details with valid Total Credit Registered (TCR) and Total Credit Earned (TCE)",
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
        totalCreditRegistered: 0,
        totalCreditEarned: 0,
        gpa: 0 
      }
    ]);
    setStudentName('');
    setCalculatedCGPA(null);
    setTotalCreditRegisteredAll(0);
    setTotalCreditEarnedAll(0);
  };

  return (
    <CGPACalculatorContext.Provider value={{
      semesters,
      studentName,
      calculatedCGPA,
      totalCreditRegisteredAll,
      totalCreditEarnedAll,
      setStudentName,
      addSemester,
      removeSemester,
      updateSemester,
      calculateCGPA,
      resetForm,
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
