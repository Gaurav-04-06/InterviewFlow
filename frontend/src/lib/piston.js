const JUDGE0_API =
  "https://ce.judge0.com/submissions?base64_encoded=true&wait=true";

const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
  c: 50,
  typescript: 74,
  go: 60,
  rust: 73,
  csharp: 51,
  ruby: 72,
  php: 68,
  kotlin: 78,
};

export async function executeCode(language, code) {
  try {
    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      return { success: false, error: `Unsupported language: ${language}` };
    }

    const response = await fetch(JUDGE0_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language_id: languageId,
        source_code: btoa(unescape(encodeURIComponent(code))),
        stdin: "",
      }),
    });

    const data = await response.json();
    const output = data.stdout ? decodeURIComponent(escape(atob(data.stdout))) : "";
    const stderr = data.stderr 
      ? decodeURIComponent(escape(atob(data.stderr))) 
      : data.compile_output 
      ? decodeURIComponent(escape(atob(data.compile_output))) 
      : "";

    if (stderr) return { success: false, output, error: stderr };
    return { success: true, output: output || "No output" };

  } catch (error) {
    return { success: false, error: `Failed to execute: ${error.message}` };
  }
}

export function getSupportedLanguages() { return Object.keys(LANGUAGE_IDS); }
export function isLanguageSupported(language) { return language in LANGUAGE_IDS; }
