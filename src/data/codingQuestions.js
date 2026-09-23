export const CODING_QUESTIONS = {
  javascript: {
    level1: [
      {
        id: 'js-l1-p1',
        title: 'Array Chunking & Deduplication',
        difficulty: 'Level 1 - Basic',
        description: 'Given an array `arr` and a chunk size `size`, return a chunked array where each subarray has a maximum length of `size`. Duplicate adjacent numbers within the input should be coalesced into single occurrences.',
        constraints: '1 <= arr.length <= 10^4, 1 <= size <= 100',
        sampleInput: 'arr = [1, 1, 2, 3, 3, 4], size = 2',
        sampleOutput: '[[1, 2], [3, 4]]',
        starterCode: `function chunkAndDedupe(arr, size) {
  const deduped = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === 0 || arr[i] !== arr[i - 1]) {
      deduped.push(arr[i]);
    }
  }
  const result = [];
  for (let i = 0; i < deduped.length; i += size) {
    result.push(deduped.slice(i, i + size));
  }
  return result;
}`,
        testCases: [
          { input: [[1, 1, 2, 3, 3, 4], 2], expected: [[1, 2], [3, 4]] },
          { input: [[5, 5, 5, 5], 1], expected: [[5]] }
        ]
      },
      {
        id: 'js-l1-p2',
        title: 'Two Sum Target Pairs',
        difficulty: 'Level 1 - Basic',
        description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
        constraints: '2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9',
        sampleInput: 'nums = [2, 7, 11, 15], target = 9',
        sampleOutput: '[0, 1]',
        starterCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
        testCases: [
          { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
          { input: [[3, 2, 4], 6], expected: [1, 2] }
        ]
      },
      {
        id: 'js-l1-p3',
        title: 'Valid Palindrome Filter',
        difficulty: 'Level 1 - Basic',
        description: 'Given a string `s`, return `true` if it is a palindrome after converting all uppercase letters to lowercase and removing all non-alphanumeric characters.',
        constraints: '1 <= s.length <= 2 * 10^5',
        sampleInput: 's = "A man, a plan, a canal: Panama"',
        sampleOutput: 'true',
        starterCode: `function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}`,
        testCases: [
          { input: ["A man, a plan, a canal: Panama"], expected: true },
          { input: ["race a car"], expected: false }
        ]
      }
    ],
    level2: [
      {
        id: 'js-l2-p1',
        title: 'Balanced Bracket Stack Validator',
        difficulty: 'Level 2 - Intermediate',
        description: 'Determine if a string with brackets `()[]{}` is strictly balanced and closed in proper order.',
        constraints: '1 <= s.length <= 10^4',
        sampleInput: 's = "{[()]}()"',
        sampleOutput: 'true',
        starterCode: `function isValidBrackets(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if (map[ch]) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
        testCases: [
          { input: ["{[()]}()"], expected: true },
          { input: ["(]"], expected: false }
        ]
      },
      {
        id: 'js-l2-p2',
        title: 'Longest Consecutive Elements Sequence',
        difficulty: 'Level 2 - Intermediate',
        description: 'Find the length of the longest consecutive elements sequence in an unsorted array in O(n) runtime.',
        constraints: '0 <= nums.length <= 10^5',
        sampleInput: 'nums = [100, 4, 200, 1, 3, 2]',
        sampleOutput: '4',
        starterCode: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let maxStreak = 0;
  for (const num of set) {
    if (!set.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;
      while (set.has(currentNum + 1)) {
        currentNum += 1;
        currentStreak += 1;
      }
      maxStreak = Math.max(maxStreak, currentStreak);
    }
  }
  return maxStreak;
}`,
        testCases: [
          { input: [[100, 4, 200, 1, 3, 2]], expected: 4 },
          { input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9 }
        ]
      },
      {
        id: 'js-l2-p3',
        title: 'Debounce Async Pipeline Runner',
        difficulty: 'Level 2 - Intermediate',
        description: 'Implement a function `createDebouncer(fn, delay)` returning a debounced execution handler.',
        constraints: '0 <= delay <= 1000',
        sampleInput: 'delay = 200',
        sampleOutput: 'function',
        starterCode: `function createDebouncer(fn, delay) {
  let timerId;
  return function(...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}`,
        testCases: [
          { input: [null, 100], expected: "function" }
        ]
      }
    ],
    level3: [
      {
        id: 'js-l3-p1',
        title: 'Sliding Window Maximum In-Window',
        difficulty: 'Level 3 - Advanced',
        description: 'Given an array `nums` and sliding window size `k`, return max element in every window position.',
        constraints: '1 <= nums.length <= 10^5, 1 <= k <= nums.length',
        sampleInput: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
        sampleOutput: '[3, 3, 5, 5, 6, 7]',
        starterCode: `function maxSlidingWindow(nums, k) {
  const deque = [];
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] < i - k + 1) {
      deque.shift();
    }
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    deque.push(i);
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  return result;
}`,
        testCases: [
          { input: [[1,3,-1,-3,5,3,6,7], 3], expected: [3, 3, 5, 5, 6, 7] }
        ]
      },
      {
        id: 'js-l3-p2',
        title: 'LRU Cache (Least Recently Used)',
        difficulty: 'Level 3 - Advanced',
        description: 'Implement an LRU Cache with `get(key)` and `put(key, value)` with O(1) average time complexity.',
        constraints: 'capacity <= 3000',
        sampleInput: 'capacity = 2, put(1,1), put(2,2), get(1)',
        sampleOutput: '1',
        starterCode: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}`,
        testCases: [
          { input: [2], expected: "LRUCache" }
        ]
      },
      {
        id: 'js-l3-p3',
        title: 'Merge K Sorted Lists',
        difficulty: 'Level 3 - Advanced',
        description: 'Merge `k` sorted integer arrays into one sorted array in O(N log k) time.',
        constraints: 'k <= 10^4',
        sampleInput: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        sampleOutput: '[1,1,2,3,4,4,5,6]',
        starterCode: `function mergeKSorted(lists) {
  const merged = [];
  for (const arr of lists) {
    for (const n of arr) merged.push(n);
  }
  return merged.sort((a, b) => a - b);
}`,
        testCases: [
          { input: [[[1,4,5],[1,3,4],[2,6]]], expected: [1,1,2,3,4,4,5,6] }
        ]
      }
    ]
  },
  python: {
    level1: [
      {
        id: 'py-l1-p1',
        title: 'Prime Number Checker & Range Finder',
        difficulty: 'Level 1 - Basic',
        description: 'Write `is_prime(n)` returning `True` if `n` is prime, and `find_primes(start, end)` returning all primes in the range.',
        constraints: '1 <= start <= end <= 10^4',
        sampleInput: 'start = 10, end = 20',
        sampleOutput: '[11, 13, 17, 19]',
        starterCode: `def is_prime(n: int) -> bool:
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def find_primes(start: int, end: int) -> list:
    return [num for num in range(start, end + 1) if is_prime(num)]
`,
        testCases: [
          { input: [10, 20], expected: [11, 13, 17, 19] },
          { input: [1, 5], expected: [2, 3, 5] }
        ]
      },
      {
        id: 'py-l1-p2',
        title: 'Bubble & Selection Array Sorting',
        difficulty: 'Level 1 - Basic',
        description: 'Sort an integer array in ascending order and return the sorted array.',
        constraints: '1 <= len(nums) <= 1000',
        sampleInput: 'nums = [5, 2, 9, 1, 5, 6]',
        sampleOutput: '[1, 2, 5, 5, 6, 9]',
        starterCode: `def sort_array(nums: list) -> list:
    arr = list(nums)
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
`,
        testCases: [
          { input: [[5, 2, 9, 1, 5, 6]], expected: [1, 2, 5, 5, 6, 9] }
        ]
      },
      {
        id: 'py-l1-p3',
        title: 'Palindrome String & Character Inversion',
        difficulty: 'Level 1 - Basic',
        description: 'Determine if a string is a palindrome considering only alphanumeric characters and ignoring case.',
        constraints: '1 <= len(s) <= 10^5',
        sampleInput: 's = "race a car"',
        sampleOutput: 'False',
        starterCode: `def is_palindrome(s: str) -> bool:
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]
`,
        testCases: [
          { input: ["race a car"], expected: false },
          { input: ["A man, a plan, a canal: Panama"], expected: true }
        ]
      }
    ],
    level2: [
      {
        id: 'py-l2-p1',
        title: 'Two Sum Target Index Finder',
        difficulty: 'Level 2 - Intermediate',
        description: 'Find two numbers that add up to `target` in O(n) time and return their zero-indexed positions.',
        constraints: '2 <= len(nums) <= 10^4',
        sampleInput: 'nums = [2, 7, 11, 15], target = 9',
        sampleOutput: '[0, 1]',
        starterCode: `def two_sum(nums: list, target: int) -> list:
    lookup = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in lookup:
            return [lookup[diff], i]
        lookup[num] = i
    return []
`,
        testCases: [
          { input: [[2, 7, 11, 15], 9], expected: [0, 1] }
        ]
      },
      {
        id: 'py-l2-p2',
        title: 'Valid Parentheses Stack Validator',
        difficulty: 'Level 2 - Intermediate',
        description: 'Validate brackets string matching with proper LIFO order.',
        constraints: '1 <= len(s) <= 10^4',
        sampleInput: 's = "()[]{}"',
        sampleOutput: 'True',
        starterCode: `def is_valid_parentheses(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack
`,
        testCases: [
          { input: ["()[]{}"], expected: true },
          { input: ["(]"], expected: false }
        ]
      },
      {
        id: 'py-l2-p3',
        title: 'Group Anagrams Hash Map',
        difficulty: 'Level 2 - Intermediate',
        description: 'Group all words that are anagrams of one another.',
        constraints: '1 <= len(strs) <= 10^4',
        sampleInput: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        sampleOutput: '3 groups',
        starterCode: `def group_anagrams(strs: list) -> list:
    from collections import defaultdict
    ans = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))
        ans[key].append(s)
    return list(ans.values())
`,
        testCases: [
          { input: [["eat","tea","tan","ate","nat","bat"]], expected: [["eat","tea","ate"],["tan","nat"],["bat"]] }
        ]
      }
    ],
    level3: [
      {
        id: 'py-l3-p1',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Level 3 - Advanced',
        description: 'Find length of the longest substring with unique characters in O(n) sliding window time.',
        constraints: '0 <= len(s) <= 5 * 10^4',
        sampleInput: 's = "abcabcbb"',
        sampleOutput: '3',
        starterCode: `def length_of_longest_substring(s: str) -> int:
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
          { input: ["abcabcbb"], expected: 3 }
        ]
      },
      {
        id: 'py-l3-p2',
        title: 'Binary Tree Level Order Traversal (BFS)',
        difficulty: 'Level 3 - Advanced',
        description: 'Return level-by-level array traversal of a binary tree given in array layout.',
        constraints: '0 <= nodes <= 2000',
        sampleInput: 'tree = [3, 9, 20]',
        sampleOutput: '[[3], [9, 20]]',
        starterCode: `def level_order_traversal(nodes: list) -> list:
    if not nodes or nodes[0] is None:
        return []
    result = []
    level = [0]
    while level:
        vals = []
        next_level = []
        for i in level:
            if i < len(nodes) and nodes[i] is not None:
                vals.append(nodes[i])
                l, r = 2 * i + 1, 2 * i + 2
                if l < len(nodes) and nodes[l] is not None: next_level.append(l)
                if r < len(nodes) and nodes[r] is not None: next_level.append(r)
        if vals: result.append(vals)
        level = next_level
    return result
`,
        testCases: [
          { input: [[3, 9, 20]], expected: [[3], [9, 20]] }
        ]
      },
      {
        id: 'py-l3-p3',
        title: 'Merge K Sorted Lists via Heap',
        difficulty: 'Level 3 - Advanced',
        description: 'Merge all sorted arrays using a min-heap in O(N log k) time.',
        constraints: 'k <= 10^4',
        sampleInput: 'lists = [[1, 4, 5], [1, 3, 4], [2, 6]]',
        sampleOutput: '[1, 1, 2, 3, 4, 4, 5, 6]',
        starterCode: `def merge_k_sorted(lists: list) -> list:
    import heapq
    heap = []
    for arr in lists:
        for val in arr:
            heapq.heappush(heap, val)
    res = []
    while heap:
        res.append(heapq.heappop(heap))
    return res
`,
        testCases: [
          { input: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] }
        ]
      }
    ]
  }
};

// Fallback generator for other languages (Java, C++, Go, etc.)
export function getCodingQuestionsForLanguage(languageId, levelNum) {
  const langKey = languageId.toLowerCase();
  const levelKey = `level${levelNum}`;
  if (CODING_QUESTIONS[langKey] && CODING_QUESTIONS[langKey][levelKey]) {
    return CODING_QUESTIONS[langKey][levelKey];
  }
  // Default to JavaScript or Python problem suite adapted
  return CODING_QUESTIONS.javascript[levelKey] || CODING_QUESTIONS.javascript.level1;
}
