
import React from 'react';
import { FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from '@/components/ui/use-toast';

interface PdfDownloadButtonProps {
  contentRef: React.RefObject<HTMLDivElement>;
  fileName?: string;
}

const PdfDownloadButton: React.FC<PdfDownloadButtonProps> = ({ 
  contentRef, 
  fileName = 'GPA-Result' 
}) => {
  const handleDownload = async () => {
    if (!contentRef.current) {
      toast({
        title: "Error",
        description: "Could not find content to download",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Generating PDF",
        description: "Please wait while we prepare your PDF...",
      });

      // Create a clone of the reference element to ensure all styles are applied
      const element = contentRef.current;
      let width = element.offsetWidth;
      let height = element.offsetHeight;

      // If element has no dimensions (could happen if it's hidden), use default values
      if (width === 0 || height === 0) {
        width = 800;  // Default width
        height = 1200; // Default height
        
        // Find the closest PrintableResult component
        const printable = document.querySelector('.hidden > [data-component="PrintableResult"]');
        if (printable) {
          // Temporarily make it visible for capturing
          const originalDisplay = printable.style.display;
          printable.style.display = 'block';
          
          // Capture the content
          const canvas = await html2canvas(printable as HTMLElement, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
          });
          
          // Restore original display
          printable.style.display = originalDisplay;
          
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
          });
          
          // Calculate dimensions to fit the image properly
          const imgWidth = 210; // A4 width in mm (portrait)
          const imgHeight = canvas.height * imgWidth / canvas.width;
          
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save(`${fileName}.pdf`);
          
          toast({
            title: "Success!",
            description: "Your PDF has been downloaded successfully",
          });
          return;
        }
      }
      
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
      });
      
      // Calculate dimensions to fit the image properly
      const imgWidth = 210; // A4 width in mm (portrait)
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${fileName}.pdf`);
      
      toast({
        title: "Success!",
        description: "Your PDF has been downloaded successfully",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "There was a problem generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 font-sans"
    >
      <FileDown className="h-4 w-4" /> Download PDF
    </Button>
  );
};

export default PdfDownloadButton;
