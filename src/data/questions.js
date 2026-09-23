export const QUESTIONS_DB = {
  javascript: {
    level1: [
      {
        id: 'js-l1-1',
        title: 'Variable Declarations and Scoping',
        question: 'What is the primary difference between `var`, `let`, and `const` regarding variable scoping?',
        codeSnippet: `function testScope() {
  if (true) {
    var x = 10;
    let y = 20;
    const z = 30;
  }
  console.log(x); // ?
  console.log(y); // ?
}`,
        options: [
          '`var` is function-scoped, while `let` and `const` are block-scoped.',
          '`var`, `let`, and `const` all possess identical block scope semantics.',
          '`let` is function-scoped, while `var` is block-scoped.',
          '`const` can be reassigned anywhere in the function body.'
        ],
        correctIndex: 0,
        explanation: '`var` attaches to the nearest enclosing function scope (or global), whereas `let` and `const` are confined strictly to the `{ ... }` block where they are declared.'
      },
      {
        id: 'js-l1-2',
        title: 'Equality Operators',
        question: 'What is the result of evaluating `0 == "0"` versus `0 === "0"` in modern JavaScript?',
        codeSnippet: `console.log(0 == "0");
console.log(0 === "0");`,
        options: [
          '`true` and `false` because `==` performs type coercion while `===` checks both value and type.',
          '`false` and `true` because strict equality allows numeric conversion.',
          '`true` and `true` because both evaluate to falsy zero.',
          '`false` and `false` because strings and numbers cannot be compared.'
        ],
        correctIndex: 0,
        explanation: 'The abstract equality comparison (`==`) coerces string `"0"` to number `0`, yielding `true`. Strict equality (`===`) checks both value and datatype without coercion, yielding `false`.'
      },
      {
        id: 'js-l1-3',
        title: 'Array Mutation vs Immutability',
        question: 'Which method returns a newly created array containing transformed elements without mutating the source array?',
        codeSnippet: `const numbers = [1, 2, 3, 4];
const squared = numbers.???(n => n * n);`,
        options: [
          '.map()',
          '.forEach()',
          '.push()',
          '.splice()'
        ],
        correctIndex: 0,
        explanation: '`Array.prototype.map()` creates and returns a brand-new array containing results of calling the provided function on every element, leaving the source array untouched.'
      }
    ],
    level2: [
      {
        id: 'js-l2-1',
        title: 'Event Loop & Microtasks vs Macrotasks',
        question: 'What is the exact execution output printed to the console?',
        codeSnippet: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');`,
        options: [
          '1, 4, 3, 2',
          '1, 2, 3, 4',
          '1, 3, 4, 2',
          '1, 4, 2, 3'
        ],
        correctIndex: 0,
        explanation: 'Synchronous execution runs first (`1`, `4`). Microtasks (`Promise.then`) run next in the microtask queue (`3`). Finally, timer macrotasks execute from the callback queue (`2`).'
      },
      {
        id: 'js-l2-2',
        title: 'Closures & Lexical State',
        question: 'What will be output when `counterA()` and `counterB()` are invoked?',
        codeSnippet: `function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counterA = makeCounter();
const counterB = makeCounter();
counterA();
console.log(counterA(), counterB());`,
        options: [
          '2 1',
          '2 2',
          '1 1',
          '3 1'
        ],
        correctIndex: 0,
        explanation: 'Each invocation of `makeCounter()` instantiates an independent lexical closure environment with its own private `count` state. `counterA` increments twice (1, then 2), while `counterB` increments once (1).'
      },
      {
        id: 'js-l2-3',
        title: 'Asynchronous Error Handling with async/await',
        question: 'How should an unhandled rejection in an async function be safely caught and handled?',
        codeSnippet: `async function fetchUserData(userId) {
  // how to catch network exceptions?
  const res = await fetch(\`/api/user/\${userId}\`);
  return await res.json();
}`,
        options: [
          'Wrap the await calls in a `try...catch` block or chain `.catch()` on the returned promise.',
          'Define `window.onerror` directly inside the async function body.',
          'Async functions automatically discard network errors without throwing.',
          'Add a synchronous `if (res.error)` check before awaiting `fetch`.'
        ],
        correctIndex: 0,
        explanation: 'In `async/await` syntax, rejected promises translate directly into throwable JavaScript exceptions, which can be cleanly caught using a standard `try { ... } catch (err) { ... }` construct.'
      }
    ],
    level3: [
      {
        id: 'js-l3-1',
        title: 'Debounce Function Implementation & Memory Leaks',
        question: 'In a production debounce function, why is clearing `timerId` essential before scheduling a new timeout?',
        codeSnippet: `function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
        options: [
          'To cancel the pending invocation from previous bursts so only the final call executes after inactivity.',
          'Because JavaScript cannot store more than one timeout identifier in memory.',
          'To force garbage collection of the inner function arguments.',
          'To transform the asynchronous callback into synchronous thread execution.'
        ],
        correctIndex: 0,
        explanation: 'Debouncing coalesces rapid successive triggers (e.g. search input keystrokes) by canceling the pending timer each time an event occurs, ensuring the callback only fires once the caller stops triggering for `delay` ms.'
      },
      {
        id: 'js-l3-2',
        title: 'WeakMap and WeakSet for Private State / Garbage Collection',
        question: 'What distinctive garbage-collection property does `WeakMap` provide when storing metadata for DOM nodes or objects?',
        codeSnippet: `const metadataStore = new WeakMap();
let userElement = document.querySelector('#avatar');
metadataStore.set(userElement, { renderCount: 42 });
userElement.remove();
userElement = null;`,
        options: [
          'References in WeakMap are weakly held; once `userElement` is dereferenced, its entry is eligible for garbage collection automatically.',
          'WeakMap keys persist permanently in browser memory until `metadataStore.clear()` is called.',
          'WeakMap converts all stored objects to string representations in LocalStorage.',
          'WeakMap executes deep cloning on stored objects to prevent cross-tab contamination.'
        ],
        correctIndex: 0,
        explanation: '`WeakMap` keys must be objects and are held weakly. When no other references to the key object exist, the key-value pair can be collected by the JS engine without requiring manual teardown.'
      },
      {
        id: 'js-l3-3',
        title: 'Prototype Inheritance & Performance Optimization',
        question: 'Why is defining methods on a Constructor’s `.prototype` (or ES6 Class body) superior to defining methods inside the constructor function itself?',
        codeSnippet: `class InternEngineer {
  constructor(name) { this.name = name; }
  compileCode() { return \`\${this.name} compiled successfully\`; }
}`,
        options: [
          'The method is stored once in memory and shared across all instances via prototype chain rather than re-instantiated on every object.',
          'Methods on prototype bypass V8 JIT compilation and execute natively.',
          'Constructor-defined methods cannot access `this` context.',
          'Prototype methods execute synchronously in a dedicated Web Worker thread.'
        ],
        correctIndex: 0,
        explanation: 'Defining methods on the prototype delegates behavior: all instances share the exact same function reference in memory, saving significant RAM and optimizing hidden-class lookups in modern JS engines.'
      }
    ]
  },
  python: {
    level1: [
      {
        id: 'py-l1-1',
        title: 'List Comprehensions & Immutability',
        question: 'What is the resulting value of the list comprehension expression?',
        codeSnippet: `numbers = [1, 2, 3, 4, 5]
evens_squared = [x**2 for x in numbers if x % 2 == 0]
print(evens_squared)`,
        options: [
          '[4, 16]',
          '[1, 4, 9, 16, 25]',
          '[2, 4]',
          '[4, 8]'
        ],
        correctIndex: 0,
        explanation: 'The filter `if x % 2 == 0` filters the numbers to `2` and `4`. Squaring each yields `[4, 16]`.'
      },
      {
        id: 'py-l1-2',
        title: 'Mutable vs Immutable Data Types',
        question: 'Which of the following built-in Python data types is immutable (cannot be altered in place)?',
        codeSnippet: `a = (1, 2, 3) # tuple
b = [1, 2, 3] # list
c = {"key": 1} # dict
d = {1, 2, 3} # set`,
        options: [
          '`tuple` and `str`',
          '`list` and `dict`',
          '`set` and `bytearray`',
          'All Python data structures are mutable by default.'
        ],
        correctIndex: 0,
        explanation: 'Tuples, strings, integers, and floats are immutable. Lists, dictionaries, and sets can have their elements mutated in place.'
      },
      {
        id: 'py-l1-3',
        title: 'Dictionary Access with Fallbacks',
        question: 'What is the best practice method to look up a key in a dictionary without risking a `KeyError` exception?',
        codeSnippet: `user_info = {"name": "Alex", "role": "Intern"}
# Safely access "salary" with default None:`,
        options: [
          '`user_info.get("salary", None)`',
          '`user_info["salary"]`',
          '`user_info.find("salary")`',
          '`user_info.fetch("salary", default=0)`'
        ],
        correctIndex: 0,
        explanation: '`dict.get(key, default)` returns the default value (or None) if the key is not present, avoiding `KeyError`.'
      }
    ],
    level2: [
      {
        id: 'py-l2-1',
        title: 'Decorators and Higher-Order Functions',
        question: 'What is the fundamental mechanism of a Python decorator defined with `@my_decorator` syntax?',
        codeSnippet: `@timing_decorator
def calculate_metrics():
    pass`,
        options: [
          'It passes `calculate_metrics` as an argument to `timing_decorator`, binding the returned wrapper function to the name `calculate_metrics`.',
          'It compiles the function into C extension bytecode at runtime.',
          'It forks a separate OS thread to execute the function concurrently.',
          'It automatically serializes function inputs and outputs into JSON.'
        ],
        correctIndex: 0,
        explanation: 'Decorators are syntactic sugar: `@decorator` on `def func():` translates to `func = decorator(func)`.'
      },
      {
        id: 'py-l2-2',
        title: 'Generators and Memory Optimization',
        question: 'Why should a developer prefer a generator expression or `yield` over a large list when processing massive datasets?',
        codeSnippet: `def stream_large_log(file_path):
    with open(file_path) as f:
        for line in f:
            if "ERROR" in line:
                yield line.strip()`,
        options: [
          'Generators produce items lazily on demand (O(1) memory footprint) instead of buffering all items in RAM at once.',
          'Generators automatically parallelize iteration across all available CPU cores.',
          'Yielding values caches entire files in GPU VRAM for instant access.',
          'Generators convert text lines into SQL queries under the hood.'
        ],
        correctIndex: 0,
        explanation: 'A generator maintains internal iterator state and yields one item per request (`next()`), maintaining constant O(1) memory overhead regardless of data volume.'
      },
      {
        id: 'py-l2-3',
        title: '*args and **kwargs Unpacking',
        question: 'What does `*args` and `**kwargs` unpack into within a function definition?',
        codeSnippet: `def process_records(*args, **kwargs):
    print(type(args), type(kwargs))`,
        options: [
          '`args` is a `tuple`, while `kwargs` is a `dict`.',
          '`args` is a `list`, while `kwargs` is a `set`.',
          '`args` is a `generator`, while `kwargs` is a `list`.',
          '`args` and `kwargs` are both raw string buffers.'
        ],
        correctIndex: 0,
        explanation: '`*args` collects positional arguments into a `tuple`, and `**kwargs` collects arbitrary keyword arguments into a `dict`.'
      }
    ],
    level3: [
      {
        id: 'py-l3-1',
        title: 'Global Interpreter Lock (GIL) and Concurrency Model',
        question: 'When optimizing a CPU-bound Python task (e.g. matrix multiplication or heavy hashing), which approach bypasses the GIL for true multi-core parallel execution?',
        codeSnippet: `import multiprocessing
import threading
import asyncio`,
        options: [
          'Use the `multiprocessing` module (or C-extensions) to spawn separate OS processes with independent Python interpreters and memory spaces.',
          '`threading.Thread` automatically distributes Python bytecode across distinct CPU cores for CPU-heavy tasks.',
          '`asyncio.gather()` unlocks multi-core parallelism natively for CPU operations.',
          'Setting `sys.setcheckinterval(0)` disables the GIL entirely.'
        ],
        correctIndex: 0,
        explanation: 'The GIL allows only one native thread to execute Python bytecode at a time. For CPU-bound tasks, `multiprocessing` circumvents this limitation by spawning isolated processes.'
      },
      {
        id: 'py-l3-2',
        title: 'Context Managers and the Protocol (`__enter__` & `__exit__`)',
        question: 'In custom context managers, what must `__exit__(self, exc_type, exc_val, exc_tb)` return to suppress an exception raised within the `with` block?',
        codeSnippet: `class TransactionScope:
    def __enter__(self):
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        # Suppress exception if handled:
        return True`,
        options: [
          '`True` (or a truthy value)',
          '`None` or `False`',
          '`raise exc_val`',
          '`0`'
        ],
        correctIndex: 0,
        explanation: 'If `__exit__` returns `True`, Python will suppress the exception that was raised inside the `with` block. Returning `False` or `None` lets the exception propagate upward.'
      },
      {
        id: 'py-l3-3',
        title: 'Metaclasses & Class Creation Pipeline',
        question: 'What is the role of a metaclass in Python’s object-oriented architecture?',
        codeSnippet: `class ModelMeta(type):
    def __new__(cls, name, bases, dct):
        # Intercept and validate class attributes
        return super().__new__(cls, name, bases, dct)`,
        options: [
          'A metaclass is the class of a class; it governs how classes are constructed, validated, and registered at declaration time.',
          'A metaclass is a runtime decorator applied strictly to individual instance methods.',
          'Metaclasses are used solely to deserialize JSON files into database records.',
          'Metaclasses convert Python source code into compiled Assembly at execution.'
        ],
        correctIndex: 0,
        explanation: 'Just as instances are created by classes, classes themselves are instances of metaclasses (defaulting to `type`). Metaclasses allow programmatic customization of class creation.'
      }
    ]
  },
  java: {
    level1: [
      {
        id: 'java-l1-1',
        title: 'Data Types and Memory Allocation',
        question: 'Where are primitive variables (`int`, `boolean`, `double`) allocated when declared inside a local method in Java?',
        codeSnippet: `public void calculate() {
    int count = 10; // Where is count stored?
    String label = new String("Intern"); // Where is the object stored?
}`,
        options: [
          'The primitive `count` is stored on the Thread Stack, while `new String(...)` object resides on the Heap.',
          'Both are stored strictly in the JVM Metaspace.',
          'All local variables reside exclusively on the Heap.',
          'Primitives reside on the Heap, while objects reside on the Stack.'
        ],
        correctIndex: 0,
        explanation: 'Method parameters and local primitive variables reside on that thread’s Stack frame. Objects created with `new` reside in the JVM Garbage-Collected Heap.'
      },
      {
        id: 'java-l1-2',
        title: 'Interface vs Abstract Class',
        question: 'Since Java 8, what allowed interfaces to include method implementations?',
        codeSnippet: `public interface NotificationService {
    default void logAlert(String msg) {
        System.out.println("ALERT: " + msg);
    }
}`,
        options: [
          '`default` and `static` methods',
          '`final` and `protected` methods',
          '`synchronized` blocks',
          'Interfaces cannot contain any method implementation.'
        ],
        correctIndex: 0,
        explanation: 'Java 8 introduced `default` methods (and static methods) in interfaces to enable backwards-compatible API evolutions without breaking existing implementers.'
      },
      {
        id: 'java-l1-3',
        title: 'Strings and Immutability',
        question: 'What occurs when you repeatedly concatenate strings with the `+` operator inside a loop in Java?',
        codeSnippet: `String result = "";
for (int i = 0; i < 1000; i++) {
    result += i;
}`,
        options: [
          'New String instances and intermediate builder buffers are created on every iteration; using `StringBuilder` is heavily recommended.',
          'The existing String object is mutated directly in the JVM String Constant Pool.',
          'The JVM compiles it to an O(1) in-place memory expansion automatically.',
          'It throws an `ImmutableStringException` at runtime.'
        ],
        correctIndex: 0,
        explanation: 'Because `String` is immutable, naive repeated concatenation creates lots of temporary objects. `StringBuilder` provides mutable, amortized O(1) buffer expansion.'
      }
    ],
    level2: [
      {
        id: 'java-l2-1',
        title: 'Java Collections: HashMap Internals',
        question: 'How does `HashMap` in Java 8+ handle frequent hash collisions within a single bucket when the bucket threshold exceeds 8 items?',
        codeSnippet: `Map<String, Candidate> candidateMap = new HashMap<>();`,
        options: [
          'It converts the LinkedList bucket into a Balanced Red-Black Tree, improving lookup from O(n) to O(log n).',
          'It immediately doubles the capacity and throws away duplicate keys.',
          'It invokes `System.gc()` to free hash collision nodes.',
          'It degrades to linear array search without any structural reorganization.'
        ],
        correctIndex: 0,
        explanation: 'When entries in a single bucket exceed TREEIFY_THRESHOLD (8) and the table capacity is at least 64, HashMap transforms the bucket chain into a Red-Black tree (`TreeNode`), guaranteeing O(log n) worst-case lookups.'
      },
      {
        id: 'java-l2-2',
        title: 'Generics and Type Erasure',
        question: 'What is Type Erasure in the Java compiler?',
        codeSnippet: `List<String> listA = new ArrayList<>();
List<Integer> listB = new ArrayList<>();
// listA.getClass() == listB.getClass()?`,
        options: [
          'Generic type information is verified at compile-time and stripped (erased) from bytecode, resulting in raw `List` at runtime.',
          'Generic types are permanently cast to dynamic C pointers in JVM bytecode.',
          'Each parameterized type creates a distinct compiled `.class` binary.',
          'Type erasure causes runtime reflection to fail on all object fields.'
        ],
        correctIndex: 0,
        explanation: 'Type erasure guarantees backward compatibility with older pre-generic Java versions. At runtime, generic parameters are replaced with their bound (or `Object`).'
      },
      {
        id: 'java-l2-3',
        title: 'Thread Safety & Concurrent Collections',
        question: 'Why is `ConcurrentHashMap` significantly faster under multi-threaded contention than `Collections.synchronizedMap`?',
        codeSnippet: `ConcurrentHashMap<String, Object> map = new ConcurrentHashMap<>();`,
        options: [
          'It uses bucket/segment-level locking and CAS (Compare-And-Swap) operations rather than synchronizing the entire map on every read/write.',
          'It turns off synchronization completely and allows dirty reads.',
          'It delegates all concurrent operations to disk caching.',
          'It forces all calling threads into single-queue sequential ordering.'
        ],
        correctIndex: 0,
        explanation: '`ConcurrentHashMap` utilizes lock striping and lock-free CAS reads/writes on bucket heads, avoiding coarse-grained table-wide synchronization bottlenecks.'
      }
    ],
    level3: [
      {
        id: 'java-l3-1',
        title: 'JVM Garbage Collection & Memory Model',
        question: 'What is the significance of the `volatile` keyword in Java multi-threading?',
        codeSnippet: `private volatile boolean isRunning = true;`,
        options: [
          'Guarantees visibility of changes across threads (reads/writes bypass CPU registers directly to main memory) and prevents instruction reordering.',
          'Ensures atomicity for compound operations such as `i++`.',
          'Locks the entire class definition until the variable is reset.',
          'Prevents the object from ever being collected by the GC.'
        ],
        correctIndex: 0,
        explanation: '`volatile` guarantees happens-before ordering and memory visibility across threads, ensuring changes written by one thread are immediately visible to others, though it does not guarantee atomic compound increments.'
      },
      {
        id: 'java-l3-2',
        title: 'Virtual Threads (Project Loom)',
        question: 'What advantage do Virtual Threads (Java 21+) provide over platform threads for high-throughput I/O bound microservices?',
        codeSnippet: `try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i -> executor.submit(() -> fetchApi(i)));
}`,
        options: [
          'They are lightweight user-mode threads managed by the JVM with minimal memory footprint, allowing millions of concurrent tasks without 1:1 OS thread mapping.',
          'They run directly inside GPU shaders to bypass CPU OS scheduling.',
          'They replace the need for database transactions in enterprise applications.',
          'They automatically vectorize Java code into SIMD instructions.'
        ],
        correctIndex: 0,
        explanation: 'Virtual threads decouple Java tasks from heavy OS carrier threads. When a virtual thread blocks on socket/disk I/O, the JVM unmounts it from the carrier thread so other virtual threads continue running.'
      },
      {
        id: 'java-l3-3',
        title: 'Custom ClassLoaders & Bytecode Instrumentation',
        question: 'In Java class loading hierarchy, how does the Parent Delegation Model maintain system security?',
        codeSnippet: `// CustomClassLoader -> AppClassLoader -> PlatformClassLoader -> BootstrapClassLoader`,
        options: [
          'A classloader delegates requests to its parent before searching locally, preventing malicious or duplicate overriding of core classes like `java.lang.Object`.',
          'It forces every `.class` file to be cryptographically signed by Oracle before execution.',
          'It requires classes to be compiled with debugging symbols present.',
          'It isolates each package into a sandboxed WebAssembly container.'
        ],
        correctIndex: 0,
        explanation: 'Parent delegation ensures core runtime classes are always loaded by the trusted Bootstrap/Platform loaders first, ensuring foundational JVM classes cannot be subverted by user code.'
      }
    ]
  },
  cpp: {
    level1: [
      {
        id: 'cpp-l1-1',
        title: 'Pointers and References',
        question: 'What is a fundamental distinction between a pointer and a reference in C++?',
        codeSnippet: `int val = 42;
int* ptr = &val;
int& ref = val;`,
        options: [
          'A pointer can be null and reassigned to point elsewhere; a reference must bind to an existing object and cannot be reseated.',
          'References consume double the stack memory of pointers.',
          'Pointers cannot be passed into functions.',
          'A reference requires explicit dereferencing using the `*` operator on each access.'
        ],
        correctIndex: 0,
        explanation: 'References are syntactic aliases that must be bound upon creation and cannot be rebound or point to null. Pointers are distinct variables storing memory addresses.'
      },
      {
        id: 'cpp-l1-2',
        title: 'Memory Management with new and delete',
        question: 'What is the required deallocation call for an array allocated using `new int[100]`?',
        codeSnippet: `int* arr = new int[100];
// Proper cleanup:`,
        options: [
          '`delete[] arr;`',
          '`delete arr;`',
          '`free(arr);`',
          '`arr.destroy();`'
        ],
        correctIndex: 0,
        explanation: 'Arrays allocated with `new[]` must be freed with `delete[]` so the runtime properly invokes destructors on all array elements and frees the metadata block.'
      },
      {
        id: 'cpp-l1-3',
        title: 'Standard Library Vector Operations',
        question: 'What is the amortized time complexity of `std::vector::push_back`?',
        codeSnippet: `std::vector<int> numbers;
for(int i = 0; i < n; ++i) {
    numbers.push_back(i);
}`,
        options: [
          'Amortized O(1)',
          'Strict O(n) always',
          'O(log n)',
          'O(n^2)'
        ],
        correctIndex: 0,
        explanation: 'Vectors double their capacity when full. While reallocation takes O(k), the cost averaged across all insertions is amortized O(1).'
      }
    ],
    level2: [
      {
        id: 'cpp-l2-1',
        title: 'RAII (Resource Acquisition Is Initialization)',
        question: 'What is the core principle of RAII in modern C++?',
        codeSnippet: `void processFile() {
    std::ifstream file("candidates.csv");
    // read file...
} // file closed automatically here`,
        options: [
          'Resource lifecycles (memory, file handles, mutexes) are tied to object lifetimes; acquisition occurs in constructor, release occurs in destructor.',
          'All resources are garbage-collected at arbitrary intervals by a runtime daemon.',
          'Objects must be explicitly freed with manual calls at the end of `main()`.',
          'All variables must be declared global to avoid allocation overhead.'
        ],
        correctIndex: 0,
        explanation: 'RAII guarantees that destructors are called automatically when objects leave scope (including on early returns or exceptions), preventing leaks.'
      },
      {
        id: 'cpp-l2-2',
        title: 'Smart Pointers: unique_ptr vs shared_ptr',
        question: 'When should a developer choose `std::unique_ptr` over `std::shared_ptr`?',
        codeSnippet: `auto candidate = std::make_unique<Candidate>("Jordan");`,
        options: [
          'When exclusive, single-owner semantics are desired with zero reference-counting runtime overhead.',
          'When multiple independent components must share ownership of the same object concurrently.',
          'When the object needs to be stored on the GPU.',
          'When the class does not have a virtual destructor.'
        ],
        correctIndex: 0,
        explanation: '`std::unique_ptr` enforces strict sole ownership via move semantics with zero reference-counting overhead. `shared_ptr` adds atomic ref-counts for shared ownership.'
      },
      {
        id: 'cpp-l2-3',
        title: 'Move Semantics and Rvalue References (`&&`)',
        question: 'What problem did Move Semantics (`std::move`) solve in C++11?',
        codeSnippet: `std::vector<std::string> namesA = {"A", "B", "C"};
std::vector<std::string> namesB = std::move(namesA);`,
        options: [
          'Eliminated unnecessary deep copies of heap resources by transferring internal buffer pointers from temporary/rvalue objects.',
          'Allowed multi-threaded locks to transfer across networked servers.',
          'Enabled runtime type reflection in template metaprogramming.',
          'Provided automatic bound-checking on raw C arrays.'
        ],
        correctIndex: 0,
        explanation: 'Move semantics allow stealing resources (such as dynamic memory pointers) from objects about to expire or explicitly moved, avoiding expensive deep copies.'
      }
    ],
    level3: [
      {
        id: 'cpp-l3-1',
        title: 'Virtual Method Tables (vtable) and Polymorphism',
        question: 'Why MUST a base class designed for polymorphic deletion have a `virtual` destructor?',
        codeSnippet: `class Base {
public:
    virtual ~Base() = default; // Why virtual?
};
class Derived : public Base {
    int* buffer = new int[500];
    ~Derived() { delete[] buffer; }
};`,
        options: [
          'To ensure that calling `delete basePtr;` invokes the derived destructor first, preventing undefined behavior and memory leaks.',
          'To allow the class to be serialized over network sockets.',
          'To force the compiler to inline all member methods.',
          'Because C++ will refuse to compile any derived class without it.'
        ],
        correctIndex: 0,
        explanation: 'If the base destructor is non-virtual, calling `delete` on a `Base*` pointing to a `Derived` object results in undefined behavior—typically only `Base::~Base` executes, leaking derived resources.'
      },
      {
        id: 'cpp-l3-2',
        title: 'Template Metaprogramming and SFINAE / Concepts',
        question: 'In modern C++20, what do `Concepts` replace or streamline compared to old SFINAE techniques?',
        codeSnippet: `template<typename T>
requires std::integral<T>
T add(T a, T b) { return a + b; }`,
        options: [
          'They provide clean, readable compile-time constraints on template arguments with clear diagnostic compiler error messages.',
          'They provide dynamic runtime type introspection similar to Python `isinstance`.',
          'They allow templates to execute concurrently across GPU compute units.',
          'They automatically compile template code to WebAssembly binaries.'
        ],
        correctIndex: 0,
        explanation: 'C++20 Concepts constrain template parameters declaratively at compile time, eliminating verbose `std::enable_if` SFINAE hacks and producing concise error messages.'
      },
      {
        id: 'cpp-l3-3',
        title: 'Cache Locality and Data-Oriented Design',
        question: 'Why does iterating through a contiguous `std::vector<struct>` vastly outperform iterating through a pointer-linked `std::list` in high-performance computing?',
        codeSnippet: `// Sequential memory vs fragmented heap nodes`,
        options: [
          'Contiguous memory layouts optimize CPU L1/L2/L3 cache prefetching and minimize cache misses.',
          'Linked lists use twice as much CPU voltage per read operation.',
          'Vectors are processed directly by hardware floating-point registers.',
          'C++ compilers disable optimizations for linked lists.'
        ],
        correctIndex: 0,
        explanation: 'CPU hardware prefetchers load contiguous memory cache lines ahead of time. Linked lists distribute nodes across random heap locations, triggering frequent expensive CPU cache misses.'
      }
    ]
  },
  golang: {
    level1: [
      {
        id: 'go-l1-1',
        title: 'Error Handling Idiom in Go',
        question: 'What is the standard Go idiom for handling potential function failures?',
        codeSnippet: `f, err := os.Open("config.json")
if err != nil {
    log.Fatal(err)
}`,
        options: [
          'Functions return the error as the final return value, explicitly inspected with `if err != nil`.',
          'All errors must be caught using `try { ... } catch (err) { ... }` blocks.',
          'Go functions panic by default on any error condition.',
          'Errors are automatically written to a global `sys.err` channel.'
        ],
        correctIndex: 0,
        explanation: 'Go deliberately rejects exception handling constructs in favor of explicit multi-value returns where the error is returned and checked as a normal value.'
      },
      {
        id: 'go-l1-2',
        title: 'Slices vs Arrays in Go',
        question: 'What is a Go slice beneath the syntactic abstraction?',
        codeSnippet: `s := make([]int, 5, 10)`,
        options: [
          'A lightweight three-word descriptor containing a pointer to an underlying array, length (`len`), and capacity (`cap`).',
          'A doubly-linked list allocated across isolated heap segments.',
          'An immutable copy-on-write string buffer.',
          'A pure fixed-size OS memory register.'
        ],
        correctIndex: 0,
        explanation: 'A Go slice is a header consisting of a pointer to backing array memory, the current length (`len`), and the maximum capacity (`cap`).'
      },
      {
        id: 'go-l1-3',
        title: 'Defer Statement Execution',
        question: 'When does a `defer` statement execute in Go, and in what order if multiple are deferred?',
        codeSnippet: `func trace() {
    defer fmt.Print("1")
    defer fmt.Print("2")
    fmt.Print("3")
}`,
        options: [
          'Defers execute immediately before the surrounding function returns, in LIFO (Last-In, First-Out) reverse order (Prints: 321).',
          'Defers execute immediately on declaration (Prints: 123).',
          'Defers execute in FIFO order after garbage collection passes.',
          'Defers execute in parallel background goroutines.'
        ],
        correctIndex: 0,
        explanation: 'Deferred function calls are pushed onto a stack and executed in LIFO (Last-In-First-Out) order right when the surrounding function returns.'
      }
    ],
    level2: [
      {
        id: 'go-l2-1',
        title: 'Goroutines and Channel Synchronization',
        question: 'What is the difference between an unbuffered channel and a buffered channel in Go?',
        codeSnippet: `ch1 := make(chan int)    // Unbuffered
ch2 := make(chan int, 3) // Buffered`,
        options: [
          'An unbuffered channel blocks until both sender and receiver are ready (synchronous rendezvous); a buffered channel only blocks when full on send or empty on receive.',
          'Unbuffered channels store messages in a Redis cache automatically.',
          'Buffered channels can only transmit primitive types.',
          'Unbuffered channels run on the GPU.'
        ],
        correctIndex: 0,
        explanation: 'Unbuffered channels require sender and receiver to synchronize at the exact same instant. Buffered channels allow asynchronous queueing up to buffer capacity.'
      },
      {
        id: 'go-l2-2',
        title: 'Implicit Interface Implementation',
        question: 'How does a Go `struct` implement an `interface`?',
        codeSnippet: `type Speaker interface { Speak() string }
type Intern struct { Name string }
func (i Intern) Speak() string { return "Ready to code!" }`,
        options: [
          'Implicitly by implementing all methods defined on the interface—no `implements` keyword required.',
          'Explicitly via the `class Intern implements Speaker` declaration.',
          'By registering the struct with `reflect.RegisterInterface()`.',
          'Interfaces in Go are purely documentation annotations.'
        ],
        correctIndex: 0,
        explanation: 'Go employs structural typing (duck typing). If a concrete type implements all methods required by an interface, it automatically implements that interface.'
      },
      {
        id: 'go-l2-3',
        title: 'Context Package for Cancellation and Timeouts',
        question: 'What is the primary purpose of passing `ctx context.Context` through HTTP handlers and database queries?',
        codeSnippet: `func queryCandidate(ctx context.Context, id string) (*Candidate, error)`,
        options: [
          'To propagate cancellation signals, deadlines, and request-scoped metadata across API boundaries and abort orphaned work.',
          'To format SQL queries into HTML templates.',
          'To bypass the Go garbage collector.',
          'To encrypt payload data using AES-256.'
        ],
        correctIndex: 0,
        explanation: '`context.Context` enables coordinated cancellation and timeouts across goroutines and downstream requests when a client disconnects or request times out.'
      }
    ],
    level3: [
      {
        id: 'go-l3-1',
        title: 'Go Runtime Scheduler (GMP Model)',
        question: 'In the Go runtime scheduler, what do `G`, `M`, and `P` stand for?',
        codeSnippet: `// runtime/proc.go: GMP Scheduler Architecture`,
        options: [
          'G = Goroutine, M = OS Machine Thread, P = Logical Processor (resource context managing runqueues).',
          'G = Garbage collector, M = Mutex lock, P = Pointer buffer.',
          'G = Global heap, M = Microservice, P = Packet socket.',
          'G = Generator, M = Memory arena, P = Preemption timer.'
        ],
        correctIndex: 0,
        explanation: '`G` represents the Goroutine (stack and instruction pointer), `M` represents an OS thread created by the OS kernel, and `P` represents logical execution resources / processor context (`GOMAXPROCS`).'
      },
      {
        id: 'go-l3-2',
        title: 'Escape Analysis and Stack vs Heap Allocation',
        question: 'What determines whether a variable in Go is allocated on the Stack or escapes to the Heap?',
        codeSnippet: `func createRecord() *Candidate {
    c := Candidate{Name: "Dev"}
    return &c // Escape analysis decision
}`,
        options: [
          'The compiler performs escape analysis: if a reference outlives the function stack frame, it is allocated on the Heap; otherwise, on the stack.',
          'All variables created with `var` go to stack, while variables created with `:=` go to heap.',
          'Only types larger than 64KB escape to the heap.',
          'Heap allocation is chosen randomly by runtime memory pressure.'
        ],
        correctIndex: 0,
        explanation: 'Go compiler’s escape analysis determines if the pointer or reference to `c` escapes beyond the lifetime of the stack frame. If it does, the compiler automatically moves it to the heap.'
      },
      {
        id: 'go-l3-3',
        title: 'Select and Deadlock Prevention in Concurrent Pipelines',
        question: 'How does a `select` block choose between multiple channels that are simultaneously ready to communicate?',
        codeSnippet: `select {
case msg1 := <-ch1:
    handle(msg1)
case msg2 := <-ch2:
    handle(msg2)
default:
    // optional non-blocking path
}`,
        options: [
          'It selects one pseudorandomly with uniform distribution to prevent starvation and deadlocks.',
          'It always prioritizes the top case sequentially.',
          'It executes all matching cases simultaneously on separate threads.',
          'It throws a runtime deadlock panic.'
        ],
        correctIndex: 0,
        explanation: 'If multiple channel cases are ready, `select` chooses one at random with uniform distribution, preventing starvation or bias in concurrent pipelines.'
      }
    ]
  }
};
