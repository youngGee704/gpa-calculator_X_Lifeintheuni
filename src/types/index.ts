
export interface Course {
  id: string;
  code: string;
  creditUnits: number;
  grade: string;
  gradePoint?: number;
  gradePoints?: number; // Changed from creditUnitsEarned to gradePoints
}

export interface Semester {
  id: string;
  name: string;
  courses: Course[];
  totalCreditRegistered: number; // TCR
  totalGradePoints: number; // Changed from totalCreditEarned to totalGradePoints (TGP)
  gpa: number;
}

export const GRADES = [
  { name: 'A', value: 'A', points: 5 },
  { name: 'B', value: 'B', points: 4 },
  { name: 'C', value: 'C', points: 3 },
  { name: 'D', value: 'D', points: 2 },
  { name: 'E', value: 'E', points: 1 },
  { name: 'F', value: 'F', points: 0 },
];

export const GRADE_POINTS: Record<string, number> = {
  'A': 5,
  'B': 4,
  'C': 3,
  'D': 2,
  'E': 1,
  'F': 0
};

export const SCORE_RANGES = [
  { grade: 'A', range: '70-100', points: 5, remark: 'Excellent' },
  { grade: 'B', range: '60-69', points: 4, remark: 'Very Good' },
  { grade: 'C', range: '50-59', points: 3, remark: 'Good' },
  { grade: 'D', range: '45-49', points: 2, remark: 'Fair' },
  { grade: 'E', range: '40-44', points: 1, remark: 'Pass' },
  { grade: 'F', range: '0-39', points: 0, remark: 'Fail' },
];

export const formatGPA = (gpa: number): string => {
  return gpa.toFixed(2);
};

export const calculateGradeClass = (cgpa: number): string => {
  if (cgpa >= 4.5) return 'First Class Honours';
  if (cgpa >= 3.5) return 'Second Class Honours (Upper Division)';
  if (cgpa >= 2.4) return 'Second Class Honours (Lower Division)';
  if (cgpa >= 1.5) return 'Third Class Honours';
  if (cgpa >= 1.0) return 'Pass';
  return 'Fail';
};
