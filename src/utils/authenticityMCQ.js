export function generateAuthenticityMCQs(languageName, problemTitle, studentCode) {
  const codeLines = studentCode.split('\n');
  const codeLength = codeLines.length;

  return [
    {
      id: 'auth-q1',
      question: `In your implementation of "${problemTitle}", what is the overall asymptotic Time Complexity of your algorithm?`,
      options: [
        "O(n) linear time — each element is traversed at most a constant number of times",
        "O(n^2) quadratic time — due to nested loops over the collection",
        "O(1) constant time — direct indexed array memory access only",
        "O(2^n) exponential time — recursive branches exploring all power sets"
      ],
      correctIndex: 0,
      rationale: "Candidate must understand the time efficiency of their submitted algorithm."
    },
    {
      id: 'auth-q2',
      question: `Looking at your loop and condition logic around lines 3–${Math.min(codeLength, 8)}, why is this specific control flow chosen instead of an alternative loop construct?`,
      options: [
        "To process items iteratively while preserving termination bounds and avoiding off-by-one errors",
        "Because this programming language prohibits while loops in functions",
        "To force synchronous threading on multiple background cores",
        "To prevent garbage collection from triggering during execution"
      ],
      correctIndex: 0,
      rationale: "Verifies whether candidate actually structured the iterative control flow."
    },
    {
      id: 'auth-q3',
      question: `If a boundary condition such as an empty input array (or single element) is passed to your code, how does your code handle it?`,
      options: [
        "It naturally returns the default early base case or terminates the loop with 0 iterations",
        "It causes an unhandled index out-of-bounds runtime exception",
        "It enters an infinite recursion deadlock",
        "It triggers a heap memory allocation failure"
      ],
      correctIndex: 0,
      rationale: "Tests candidate's understanding of edge cases in their own code."
    },
    {
      id: 'auth-q4',
      question: `What auxiliary Space Complexity (RAM overhead) does your solution require relative to the input size N?`,
      options: [
        "O(n) auxiliary space to maintain intermediate state or hash buckets",
        "O(1) in-place auxiliary space with zero additional data structures",
        "O(n!) factorial auxiliary space",
        "O(n^3) volumetric memory blocks"
      ],
      correctIndex: 0,
      rationale: "Validates candidate knowledge of data structure allocation."
    }
  ];
}
