import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

const CodeBlock = ({ code, language, title }: CodeBlockProps) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The code has been copied to your clipboard.",
        duration: 2000,
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy code to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {title && <h3 className="text-lg font-medium text-dark mb-4">{title}</h3>}
      <h4 className="font-medium text-dark-light mb-2">
        {language === "python" 
          ? "Python Implementation" 
          : language === "javascript" 
            ? "JavaScript Implementation" 
            : "Implementation"}
      </h4>
      <div className="relative">
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          {code}
        </pre>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 bg-slate-800 hover:bg-slate-700 text-slate-200"
                onClick={copyToClipboard}
              >
                {isCopied ? "Copied!" : "Copy"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy code to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default CodeBlock;
