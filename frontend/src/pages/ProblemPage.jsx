import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import { executeCode } from "../lib/piston";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    PROBLEMS[currentProblemId].starterCode.javascript
  );
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  // update problem when URL param changes
  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) =>
    navigate(`/problem/${newProblemId}`);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);

    return normalizedActual == normalizedExpected;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    // check if code executed successfully and matches expected output
    if (result.success) {
      // Check if expectedOutput exists
      if (!currentProblem.expectedOutput) {
        console.error(
          "❌ expectedOutput missing for problem:",
          currentProblemId
        );
        toast.error("Expected output not configured!");
        return;
      }

      const expectedOutput = currentProblem.expectedOutput[selectedLanguage];

      // Debug log
      console.log("Expected:", expectedOutput);
      console.log("Actual:", result.output);

      if (!expectedOutput) {
        console.error(
          "❌ expectedOutput missing for language:",
          selectedLanguage
        );
        toast.error("Expected output not configured for this language!");
        return;
      }

      const testsPassed = checkIfTestsPassed(result.output, expectedOutput);

      if (testsPassed) {
        triggerConfetti();
        toast.success("All tests passed! Great job! 🎉");
      } else {
        toast.error("Tests failed. Check your output!");
      }
    } else {
      toast.error("Code execution failed!");
    }
  };

  return (
    <div className='problem-page-container h-screen bg-base-100 flex flex-col'>
      <Navbar />

      <div className='flex-1 overflow-hidden'>
        <PanelGroup direction='horizontal'>
          {/* Left panel - Problem description */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>

          {/* Horizontal resize handle */}
          <PanelResizeHandle className='w-2 bg-base-300/50 hover:bg-primary/30 transition-all duration-200 cursor-col-resize relative group'>
            <div className='absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-primary/20 group-hover:bg-primary/50 transition-colors' />
          </PanelResizeHandle>

          {/* Right panel - Code editor & output */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction='vertical'>
              {/* Top panel - Code editor */}
              <Panel defaultSize={75} minSize={50}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              {/* Vertical resize handle */}
              <PanelResizeHandle className='h-2 bg-base-300/80 hover:bg-primary/30 transition-all duration-200 cursor-row-resize relative group border-t border-b border-primary/20'>
                <div className='absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-12 h-1 bg-primary/30 group-hover:bg-primary/60 rounded-full transition-colors' />
              </PanelResizeHandle>

              {/* Bottom panel - Output */}
              <Panel defaultSize={25} minSize={15} maxSize={50}>
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        /* Ensure panels fill height properly */
        :global(.h-screen) {
          height: 100vh;
        }

        /* Custom scrollbar for panels */
        :global(*) {
          scrollbar-width: thin;
          scrollbar-color: rgba(52, 211, 153, 0.3) rgba(0, 0, 0, 0.1);
        }

        :global(*::-webkit-scrollbar) {
          width: 10px;
          height: 10px;
        }

        :global(*::-webkit-scrollbar-track) {
          background: rgba(0, 0, 0, 0.1);
        }

        :global(*::-webkit-scrollbar-thumb) {
          background: rgba(52, 211, 153, 0.3);
          border-radius: 5px;
        }

        :global(*::-webkit-scrollbar-thumb:hover) {
          background: rgba(52, 211, 153, 0.5);
        }
      `}</style>
    </div>
  );
}

export default ProblemPage;
