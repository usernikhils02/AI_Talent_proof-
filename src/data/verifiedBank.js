export const VERIFIED_LANGUAGES = [
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    summary: 'Comprehensive skill assessment track with 3 levels covering data structures, algorithmic efficiency, and syntax mastery.',
    levels: ['Basic', 'Intermediate', 'Advanced'],
    problems: {
      level1: [
        {
          id: 'py-b1',
          title: 'Prime Number Checker & Range Finder',
          difficulty: 'Basic',
          description: 'Implement a function `is_prime(n)` that returns `True` if `n` is prime and `False` otherwise. Then write `find_primes_in_range(start, end)` returning all prime numbers between `start` and `end` (inclusive).',
          constraints: '1 <= start <= end <= 10^4',
          sampleInput: 'start = 10, end = 25',
          sampleOutput: '[11, 13, 17, 19, 23]',
          initialCode: `def is_prime(n: int) -> bool:
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def find_primes_in_range(start: int, end: int) -> list:
    # Write your logic here
    primes = []
    for num in range(start, end + 1):
        if is_prime(num):
            primes.append(num)
    return primes
`,
          testCases: [
            { input: [10, 25], expected: [11, 13, 17, 19, 23] },
            { input: [1, 10], expected: [2, 3, 5, 7] },
            { input: [14, 16], expected: [] }
          ],
          authenticityQuestions: [
            {
              question: "Why did you use `int(n**0.5) + 1` as the upper bound in `is_prime()`?",
              options: [
                "A factor larger than the square root must pair with a factor smaller than the square root, optimizing from O(n) to O(√n).",
                "Python does not support checking integers greater than their square root.",
                "To prevent integer overflow in the range generator.",
                "It is a required Python standard library syntax rule."
              ],
              correctIndex: 0
            },
            {
              question: "What is the time complexity of `find_primes_in_range(start, end)` with range size N and maximum value M?",
              options: [
                "O(N * √M)",
                "O(N^2)",
                "O(log N)",
                "O(1) constant time"
              ],
              correctIndex: 0
            },
            {
              question: "If line 2 `if n <= 1:` were removed, what would `is_prime(1)` return incorrectly?",
              options: [
                "It would return `True` because the for-loop range(2, 2) is empty and finishes immediately.",
                "It would raise a ZeroDivisionError.",
                "It would enter an infinite loop.",
                "It would throw a ValueError exception."
              ],
              correctIndex: 0
            }
          ]
        },
        {
          id: 'py-b2',
          title: 'Bubble & Selection Array Sorting',
          difficulty: 'Basic',
          description: 'Given an unsorted list of integers, implement in-place sorting and return the sorted array along with the number of swaps performed.',
          constraints: '1 <= len(nums) <= 1000',
          sampleInput: 'nums = [5, 1, 4, 2, 8]',
          sampleOutput: '[1, 2, 4, 5, 8]',
          initialCode: `def sort_array(nums: list) -> list:
    arr = list(nums)
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
`,
          testCases: [
            { input: [[5, 1, 4, 2, 8]], expected: [1, 2, 4, 5, 8] },
            { input: [[3, 2, 1]], expected: [1, 2, 3] },
            { input: [[10]], expected: [10] }
          ],
          authenticityQuestions: [
            {
              question: "What is the worst-case and average-case time complexity of the bubble sort implemented in your code?",
              options: [
                "O(n^2)",
                "O(n log n)",
                "O(n)",
                "O(log n)"
              ],
              correctIndex: 0
            },
            {
              question: "Why does the inner loop limit evaluate to `n - i - 1` rather than `n - 1`?",
              options: [
                "After i iterations, the last i elements are already in their correct sorted positions.",
                "To prevent list index out of range on negative indexing.",
                "Because Python lists require index padding.",
                "To execute the sorting in reverse descending order."
              ],
              correctIndex: 0
            }
          ]
        },
        {
          id: 'py-b3',
          title: 'Palindrome String & Reverse Check',
          difficulty: 'Basic',
          description: 'Determine whether a given string is a palindrome, considering only alphanumeric characters and ignoring cases.',
          constraints: '1 <= s.length <= 2 * 10^5',
          sampleInput: 's = "A man, a plan, a canal: Panama"',
          sampleOutput: 'True',
          initialCode: `def is_palindrome(s: str) -> bool:
    cleaned = [c.lower() for c in s if c.isalnum()]
    left, right = 0, len(cleaned) - 1
    while left < right:
        if cleaned[left] != cleaned[right]:
            return False
        left += 1
        right -= 1
    return True
`,
          testCases: [
            { input: ["A man, a plan, a canal: Panama"], expected: true },
            { input: ["race a car"], expected: false },
            { input: [" "], expected: true }
          ],
          authenticityQuestions: [
            {
              question: "What space complexity does your two-pointer solution use relative to the filtered string length?",
              options: [
                "O(n) auxiliary memory to store the cleaned character list",
                "O(n^2) space overhead",
                "O(log n) stack memory",
                "O(1) strictly with zero memory allocation"
              ],
              correctIndex: 0
            }
          ]
        }
      ],
      level2: [
        {
          id: 'py-i1',
          title: 'Two Sum Target Index Finder',
          difficulty: 'Intermediate',
          description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may not use the same element twice.',
          constraints: '2 <= len(nums) <= 10^4, -10^9 <= nums[i] <= 10^9',
          sampleInput: 'nums = [2, 7, 11, 15], target = 9',
          sampleOutput: '[0, 1]',
          initialCode: `def two_sum(nums: list, target: int) -> list:
    lookup = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in lookup:
            return [lookup[diff], i]
        lookup[num] = i
    return []
`,
          testCases: [
            { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
            { input: [[3, 2, 4], 6], expected: [1, 2] },
            { input: [[3, 3], 6], expected: [0, 1] }
          ],
          authenticityQuestions: [
            {
              question: "Why does the hash map approach provide O(n) runtime compared to brute force O(n^2)?",
              options: [
                "Dictionary lookups in Python have amortized O(1) average time complexity.",
                "It sorts the list under the hood in O(log n).",
                "Hash maps run on GPU memory registers.",
                "Because Python caches all two-element combinations."
              ],
              correctIndex: 0
            }
          ]
        },
        {
          id: 'py-i2',
          title: 'Valid Parentheses Stack Validator',
          difficulty: 'Intermediate',
          description: 'Given a string containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.',
          constraints: '1 <= len(s) <= 10^4',
          sampleInput: 's = "()[]{}"',
          sampleOutput: 'True',
          initialCode: `def is_valid_parentheses(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top_elem = stack.pop() if stack else '#'
            if mapping[char] != top_elem:
                return False
        else:
            stack.append(char)
    return not stack
`,
          testCases: [
            { input: ["()[]{}"], expected: true },
            { input: ["(]"], expected: false },
            { input: ["([)]"], expected: false }
          ],
          authenticityQuestions: [
            {
              question: "What is the role of `return not stack` at the end of `is_valid_parentheses`?",
              options: [
                "It ensures that all opened brackets were successfully closed and matched (stack is empty).",
                "It inverts a boolean to handle zero index edge cases.",
                "It forces garbage collection of stack memory.",
                "It checks if the string contained only numbers."
              ],
              correctIndex: 0
            }
          ]
        },
        {
          id: 'py-i3',
          title: 'Group Anagrams Hash Map',
          difficulty: 'Intermediate',
          description: 'Given an array of strings, group the anagrams together. You can return the answer in any order.',
          constraints: '1 <= len(strs) <= 10^4',
          sampleInput: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]',
          sampleOutput: '[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]',
          initialCode: `def group_anagrams(strs: list) -> list:
    from collections import defaultdict
    ans = defaultdict(list)
    for s in strs:
        key = "".join(sorted(s))
        ans[key].append(s)
    return list(ans.values())
`,
          testCases: [
            { input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]] },
            { input: [[""]], expected: [[""]] },
            { input: [["a"]], expected: [["a"]] }
          ],
          authenticityQuestions: [
            {
              question: "What is the key transformation used to identify anagrams as equivalent buckets?",
              options: [
                "Sorting each word alphabetically produces an identical key for all anagrams.",
                "Hashing the string memory address.",
                "Converting each word into an integer binary mask.",
                "Reversing the characters in the word."
              ],
              correctIndex: 0
            }
          ]
        }
      ],
      level3: [
        {
          id: 'py-a1',
          title: 'Longest Substring Without Repeating Characters',
          difficulty: 'Advanced',
          description: 'Given a string `s`, find the length of the longest substring without duplicate characters using an optimized sliding window algorithm.',
          constraints: '0 <= len(s) <= 5 * 10^4',
          sampleInput: 's = "abcabcbb"',
          sampleOutput: '3',
          initialCode: `def length_of_longest_substring(s: str) -> int:
    char_index = {}
    max_len = 0
    left = 0
    for right, char in enumerate(s):
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1
        char_index[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len
`,
          testCases: [
            { input: ["abcabcbb"], expected: 3 },
            { input: ["bbbbb"], expected: 1 },
            { input: ["pwwkew"], expected: 3 }
          ],
          authenticityQuestions: [
            {
              question: "Why is the condition `char_index[char] >= left` necessary when sliding the left pointer?",
              options: [
                "To ensure the duplicate character is within the current active sliding window and not from an earlier discarded window.",
                "To prevent index out-of-range errors on empty strings.",
                "Because Python dictionary lookups return negative integers for unseen keys.",
                "To enforce that the string is strictly ASCII."
              ],
              correctIndex: 0
            }
          ]
        },
        {
          id: 'py-a2',
          title: 'Binary Tree Level Order Traversal',
          difficulty: 'Advanced',
          description: 'Given the root representation of a binary tree, return the level order traversal of its nodes values (i.e., from left to right, level by level) using BFS queue traversal.',
          constraints: 'The number of nodes in the tree is in the range [0, 2000].',
          sampleInput: 'tree = [3, 9, 20, None, None, 15, 7]',
          sampleOutput: '[[3], [9, 20], [15, 7]]',
          initialCode: `def level_order_traversal(nodes: list) -> list:
    if not nodes or nodes[0] is None:
        return []
    result = []
    current_level = [0] # index of root
    while current_level:
        level_values = []
        next_level = []
        for idx in current_level:
            if idx < len(nodes) and nodes[idx] is not None:
                level_values.append(nodes[idx])
                left_idx = 2 * idx + 1
                right_idx = 2 * idx + 2
                if left_idx < len(nodes) and nodes[left_idx] is not None:
                    next_level.append(left_idx)
                if right_idx < len(nodes) and nodes[right_idx] is not None:
                    next_level.append(right_idx)
        if level_values:
            result.append(level_values)
        current_level = next_level
    return result
`,
          testCases: [
            { input: [[3, 9, 20, null, null, 15, 7]], expected: [[3], [9, 20], [15, 7]] },
            { input: [[1]], expected: [[1]] },
            { input: [[]], expected: [] }
          ],
          authenticityQuestions: [
            {
              question: "In array-based binary trees, what arithmetic expressions determine the left and right children of node index `i`?",
              options: [
                "`2 * i + 1` for left child, `2 * i + 2` for right child (0-indexed).",
                "`i + 1` for left child, `i + 2` for right child.",
                "`i / 2` for left child, `i / 2 + 1` for right child.",
                "`i ** 2` for both children."
              ],
              correctIndex: 0
            }
          ]
        },
        {
          id: 'py-a3',
          title: 'Merge K Sorted Lists',
          difficulty: 'Advanced',
          description: 'You are given an array of k linked-lists or sorted arrays, each linked-list is sorted in ascending order. Merge all into one sorted list and return it in O(N log k) time using a min-heap.',
          constraints: 'k == lists.length, 0 <= k <= 10^4',
          sampleInput: 'lists = [[1, 4, 5], [1, 3, 4], [2, 6]]',
          sampleOutput: '[1, 1, 2, 3, 4, 4, 5, 6]',
          initialCode: `def merge_k_sorted(lists: list) -> list:
    import heapq
    heap = []
    for arr in lists:
        for val in arr:
            heapq.heappush(heap, val)
    result = []
    while heap:
        result.append(heapq.heappop(heap))
    return result
`,
          testCases: [
            { input: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
            { input: [[]], expected: [] },
            { input: [[[]]], expected: [] }
          ],
          authenticityQuestions: [
            {
              question: "What is the time complexity of pushing and popping elements from a binary min-heap with size M?",
              options: [
                "O(log M) per push/pop operation",
                "O(M^2) per operation",
                "O(1) strict worst-case time",
                "O(M log M) per individual pop"
              ],
              correctIndex: 0
            }
          ]
        }
      ]
    }
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '⚡',
    summary: 'Comprehensive skill assessment track with 3 levels covering asynchronous loops, closures, DOM architecture, and data pipelines.',
    levels: ['Basic', 'Intermediate', 'Advanced']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '🔷',
    summary: 'Comprehensive skill assessment track with 3 levels covering generics, utility types, structural typing, and compilation options.',
    levels: ['Basic', 'Intermediate', 'Advanced']
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    summary: 'Comprehensive skill assessment track with 3 levels covering JVM memory model, collections framework, and concurrency.',
    levels: ['Basic', 'Intermediate', 'Advanced']
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: '⚙️',
    summary: 'Comprehensive skill assessment track with 3 levels covering memory management, RAII, STL, and algorithmic optimization.',
    levels: ['Basic', 'Intermediate', 'Advanced']
  },
  {
    id: 'c',
    name: 'C',
    icon: '💻',
    summary: 'Comprehensive skill assessment track with 3 levels covering pointers, memory buffers, structs, and bitwise manipulation.',
    levels: ['Basic', 'Intermediate', 'Advanced']
  },
  {
    id: 'golang',
    name: 'Go (Golang)',
    icon: '🚀',
    summary: 'Comprehensive skill assessment track with 3 levels covering goroutines, channels, interfaces, and microservice patterns.',
    levels: ['Basic', 'Intermediate', 'Advanced']
  },
  {
    id: 'rust',
    name: 'Rust',
    icon: '🦀',
    summary: 'Comprehensive skill assessment track with 3 levels covering ownership, lifetimes, borrowing, traits, and zero-cost abstractions.',
    levels: ['Basic', 'Intermediate', 'Advanced']
  }
];
