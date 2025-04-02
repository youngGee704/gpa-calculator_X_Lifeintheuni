
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SCORE_RANGES } from '@/types';
import { BookOpen, Users, Award, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">About Nigerian GPA Calculator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn about our GPA calculator, the Nigerian university grading system, and the organizations behind this project.
        </p>
      </div>

      {/* Grading System Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-app-green" />
          <h2 className="text-2xl font-bold">Nigerian University Grading System</h2>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              The Nigerian university grading system is standardized across most institutions. Performance in various courses is classified into letter grades ranging from A to F, each representing a specific score range and grade point.
            </p>
            
            <Table>
              <TableCaption>Nigerian University Grading System</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Score Range (%)</TableHead>
                  <TableHead>Letter Grade</TableHead>
                  <TableHead>Grade Points</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SCORE_RANGES.map((range) => (
                  <TableRow key={range.grade}>
                    <TableCell>{range.range}</TableCell>
                    <TableCell>{range.grade}</TableCell>
                    <TableCell>{range.points}</TableCell>
                    <TableCell>{range.remark}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Degree Classification</h3>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableCaption>Nigerian University Degree Classification</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>CGPA Range</TableHead>
                    <TableHead>Class of Degree</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>4.50 - 5.00</TableCell>
                    <TableCell>First Class Honours</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3.50 - 4.49</TableCell>
                    <TableCell>Second Class Honours (Upper Division)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2.40 - 3.49</TableCell>
                    <TableCell>Second Class Honours (Lower Division)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>1.50 - 2.39</TableCell>
                    <TableCell>Third Class Honours</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>1.00 - 1.49</TableCell>
                    <TableCell>Pass</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>0.00 - 0.99</TableCell>
                    <TableCell>Fail</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Award className="h-6 w-6 text-app-green" />
          <h2 className="text-2xl font-bold">How GPA/CGPA Calculation Works</h2>
        </div>
        
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">GPA Calculation</h3>
              <p>The Grade Point Average (GPA) is calculated at the end of each semester using the following formula:</p>
              <div className="bg-gray-50 p-4 rounded-md my-2">
                <p className="font-semibold">GPA = Total Quality Points ÷ Total Credit Units</p>
              </div>
              <p>Where:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Quality Points for a course = Grade Point × Credit Units</li>
                <li>Total Quality Points = Sum of Quality Points for all courses</li>
                <li>Total Credit Units = Sum of Credit Units for all courses</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">CGPA Calculation</h3>
              <p>The Cumulative Grade Point Average (CGPA) combines all semester results using the formula:</p>
              <div className="bg-gray-50 p-4 rounded-md my-2">
                <p className="font-semibold">CGPA = Sum of (GPA × Total Credit Units for each semester) ÷ Sum of all Credit Units</p>
              </div>
              <p>This provides your overall academic performance throughout your program.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Example Calculation</h3>
              <p>For a semester with these courses:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>MTH101: 5 units, Grade A (5 points) = 25 quality points</li>
                <li>PHY101: 4 units, Grade B (4 points) = 16 quality points</li>
                <li>CHM101: 4 units, Grade A (5 points) = 20 quality points</li>
              </ul>
              <p className="mt-2">Total Quality Points = 61</p>
              <p>Total Credit Units = 13</p>
              <p>GPA = 61 ÷ 13 = 4.69</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* About Organizations */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-app-green" />
          <h2 className="text-2xl font-bold">About Our Organizations</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <div className="bg-black p-6 flex justify-center">
              <img src="/lovable-uploads/c5ef713b-88e0-4f41-9479-fc49556e5dfc.png" alt="GRIDVEM Logo" className="h-24" />
            </div>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-3">GRIDVEM</h3>
              <p className="mb-4">
                GRIDVEM is a software company dedicated to building innovative software and web applications. 
                Led by Innocent Goodness, a web2/web3 developer with a passion for educational technology.
              </p>
              <div className="mt-4">
                <div className="flex items-center mt-4">
                  <img 
                    src="/lovable-uploads/8199b3c3-e53e-45a0-a600-cc29fc0d7453.png" 
                    alt="Innocent Goodness" 
                    className="h-20 w-20 rounded-full object-cover border-2 border-black mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Innocent Goodness</h4>
                    <p className="text-sm text-gray-600">Web2/Web3 Developer</p>
                    <p className="text-sm text-gray-600">innocentgoodness009@gmail.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="bg-white p-6 flex justify-center">
              <img src="/lovable-uploads/998b8c4d-175b-40c7-a061-24b4761da881.png" alt="Life In the University Logo" className="h-24" />
            </div>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-3">Life In the University</h3>
              <p>
                Life In the University is a non-governmental educational organization dedicated to helping high-school 
                and tertiary students unlock their academic potential by identifying and applying the keys 
                and laws of academic excellence.
              </p>
              <p className="mt-2">
                The organization has two core objectives: re-introducing a new belief system about academic excellence, 
                and helping students develop relevant skills for financial independence.
              </p>
              <p className="mt-4 font-semibold">Founded by Mr. Arise Michael Godfrey</p>
              <p>Located in FCT, Abuja, Nigeria</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
