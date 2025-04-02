
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SCORE_RANGES } from '@/types';

const GradePointTable: React.FC = () => {
  return (
    <Table>
      <TableCaption className="text-xs">Nigerian University Grading System</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Score Range</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Grade Point</TableHead>
          <TableHead>Remark</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {SCORE_RANGES.map((range) => (
          <TableRow key={range.grade}>
            <TableCell>{range.range}%</TableCell>
            <TableCell>{range.grade}</TableCell>
            <TableCell>{range.points}</TableCell>
            <TableCell>{range.remark}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GradePointTable;
