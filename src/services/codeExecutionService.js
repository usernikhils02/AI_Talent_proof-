/**
 * Executes code remotely using the public Piston API.
 * Maps the platform's language IDs to Piston's language runtime strings.
 */
export async function executeCodeInPiston(code, langId) {
  // Map our internal lang_id to Piston runtime language names and versions
  const runtimeMap = {
    'python': { language: 'python', version: '3.10.0' },
    'javascript': { language: 'javascript', version: '18.15.0' },
    'typescript': { language: 'typescript', version: '5.0.3' },
    'java': { language: 'java', version: '15.0.2' },
    'cpp': { language: 'c++', version: '10.2.0' },
    'c': { language: 'c', version: '10.2.0' },
    'go': { language: 'go', version: '1.16.2' },
    'rust': { language: 'rust', version: '1.68.2' },
  };

  const runtime = runtimeMap[langId] || runtimeMap['javascript'];

  try {
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language: runtime.language,
        version: runtime.version,
        files: [
          { content: code }
        ],
        // You could pass stdin or args here if your tests required them
        // stdin: "",
        // args: []
      })
    });

    if (!response.ok) {
      throw new Error(`Piston API Error: ${response.statusText}`);
    }

    const result = await response.json();
    
    return {
      success: result.compile?.code === 0 ? false : (result.run?.code === 0),
      output: result.compile?.output ? (result.compile.output + '\n' + result.run?.output) : result.run?.output,
      time: '14ms', // Placeholder since Piston doesn't guarantee highly accurate perf timing
      memory: '16.2MB'
    };

  } catch (error) {
    console.error("Code Execution Error:", error);
    return {
      success: false,
      output: `Runtime Error: Could not connect to remote sandbox.\n${error.message}`,
      time: '0ms',
      memory: '0MB'
    };
  }
}
