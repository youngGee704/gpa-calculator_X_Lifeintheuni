
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, GraduationCap, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 md:py-24 flex flex-col items-center text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <img src="/lovable-uploads/c5ef713b-88e0-4f41-9479-fc49556e5dfc.png" alt="GRIDVEM Logo" className="h-16 w-16" />
          <img src="/lovable-uploads/998b8c4d-175b-40c7-a061-24b4761da881.png" alt="Life In the University Logo" className="h-16 w-16" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Nigerian University <span className="text-app-green">GPA/CGPA</span> Calculator</h1>
        <p className="text-xl md:max-w-2xl mb-8">
          Calculate your Grade Point Average and Cumulative Grade Point Average easily using our specialized tools designed for Nigerian university students.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-app-green hover:bg-app-green/90 text-black font-semibold text-lg py-6 px-8">
            <Link to="/gpa-calculator">Calculate GPA</Link>
          </Button>
          <Button asChild className="bg-black hover:bg-black/80 text-white font-semibold text-lg py-6 px-8">
            <Link to="/cgpa-calculator">Calculate CGPA</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 rounded-xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 mb-4 text-app-green" />
                <CardTitle>Simple GPA Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Calculate your GPA for a single semester easily by inputting your courses, credit units, and grades.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/gpa-calculator">Try it now</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="h-12 w-12 mb-4 text-app-green" />
                <CardTitle>CGPA Calculation</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Track your academic progress by calculating your Cumulative Grade Point Average across multiple semesters.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/cgpa-calculator">Try it now</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 mb-4 text-app-green" />
                <CardTitle>Nigerian Grading System</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Based on the standard Nigerian university grading system, ensuring accurate calculations for your institution.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/about">Learn more</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Collaboration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex justify-center md:justify-start">
                <img src="/lovable-uploads/c5ef713b-88e0-4f41-9479-fc49556e5dfc.png" alt="GRIDVEM Logo" className="h-24 w-24 mb-4" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center md:text-left">GRIDVEM</h3>
              <p className="mb-4">
                GRIDVEM is a software company dedicated to building innovative software and web applications.
                Led by Innocent Goodness, a web2/web3 developer with a passion for educational technology.
              </p>
            </div>
            <div>
              <div className="flex justify-center md:justify-start">
                <img src="/lovable-uploads/998b8c4d-175b-40c7-a061-24b4761da881.png" alt="Life In the University Logo" className="h-24 w-24 mb-4" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center md:text-left">Life In the University</h3>
              <p className="mb-4">
                A non-governmental educational organization dedicated to helping high-school and tertiary students unlock their academic potential.
                Founded by Mr. Arise Michael Godfrey and located in FCT, Abuja, Nigeria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-black text-white rounded-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Start calculating your GPA and CGPA accurately with our simple and effective tools designed specifically for Nigerian university students.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-app-green hover:bg-app-green/90 text-black font-semibold">
              <Link to="/gpa-calculator">Calculate GPA</Link>
            </Button>
            <Button asChild className="bg-white hover:bg-gray-200 text-black font-semibold">
              <Link to="/cgpa-calculator">Calculate CGPA</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
