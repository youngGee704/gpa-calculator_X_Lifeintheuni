
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, Send, Github, Linkedin } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const mailtoLink = `mailto:gridvem704@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions or feedback about the GPA/CGPA calculator? Get in touch with us!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Our team is here to help with any questions you might have about our GPA/CGPA calculator.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-app-green" />
                <div>
                  <h3 className="font-semibold">GRIDVEM Email</h3>
                  <a href="mailto:gridvem704@gmail.com" className="text-blue-600 hover:underline">
                    gridvem704@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-app-green" />
                <div>
                  <h3 className="font-semibold">Life In the University Email</h3>
                  <a href="mailto:lifeintheuniversity.ng@gmail.com" className="text-blue-600 hover:underline">
                    lifeintheuniversity.ng@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-app-green" />
                <div>
                  <h3 className="font-semibold">GRIDVEM WhatsApp</h3>
                  <a 
                    href="https://api.whatsapp.com/send?phone=2347084072822&text=Hello%20,%20i%20am%20from%20Life%20in%20the%20University%20collab%20with%20your%20software%20..." 
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Message
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-app-green" />
                <div>
                  <h3 className="font-semibold">Life In the University Phone</h3>
                  <a 
                    href="tel:+2347032300590" 
                    className="text-blue-600 hover:underline"
                  >
                    +234 703 230 0590
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About the Developer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-6">
                <img 
                  src="/lovable-uploads/8199b3c3-e53e-45a0-a600-cc29fc0d7453.png" 
                  alt="Innocent Goodness" 
                  className="h-24 w-24 rounded-full object-cover border-2 border-black mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold">Innocent Goodness</h3>
                  <p className="text-gray-700">Web2/Web3 Developer</p>
                  <p className="text-gray-700">GRIDVEM</p>
                </div>
              </div>

              <p className="mb-4">
                A passionate developer specializing in web2 and web3 technologies, creating solutions to help students 
                and educational institutions achieve their goals.
              </p>

              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="icon" asChild>
                  <a href="https://github.com/youngGee704" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://www.linkedin.com/in/innocent-goodness-3257b824b/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help you?" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Type your message here..." 
                  className="min-h-[120px]"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Organizations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Our Organizations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="text-center p-6">
            <div className="flex justify-center mb-4">
              <img src="/lovable-uploads/c5ef713b-88e0-4f41-9479-fc49556e5dfc.png" alt="GRIDVEM Logo" className="h-20" />
            </div>
            <h3 className="font-bold text-xl mb-2">GRIDVEM</h3>
            <p className="text-gray-600">
              A software company that builds innovative softwares and web applications.
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <div className="flex justify-center mb-4">
              <img src="/lovable-uploads/998b8c4d-175b-40c7-a061-24b4761da881.png" alt="Life In the University Logo" className="h-20" />
            </div>
            <h3 className="font-bold text-xl mb-2">Life In the University</h3>
            <p className="text-gray-600">
              A non-governmental educational organization dedicated to helping students unlock their academic potential.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
