// Demo & Pre-seeded Knowledge Data for MERIQ Intelligent Adaptive Learning Platform

export const INITIAL_SKILLS = [
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    icon: 'Terminal',
    color: 'from-blue-600 to-indigo-600',
    description: 'Core syntax, data structures, functional paradigms, and object-oriented programming in Python 3.',
    level: 'Intermediate',
    totalConcepts: 16,
    masteredConcepts: 12,
    overallMastery: 67,
    lastDiagnosed: '2 days ago',
    status: 'learning_gap',
    hierarchy: {
      id: 'python-root',
      name: 'Python Core Architecture',
      mastery: 67,
      status: 'Developing',
      children: [
        {
          id: 'py-fundamentals',
          name: 'Fundamentals',
          mastery: 92,
          status: 'Mastered',
          difficulty: 'Beginner',
          description: 'Core syntax, variable assignment, primitive data types, and arithmetic/logical operators.',
          children: [
            { id: 'py-vars', name: 'Variables & Scope', mastery: 95, status: 'Mastered', difficulty: 'Beginner' },
            { id: 'py-types', name: 'Data Types & Casting', mastery: 92, status: 'Mastered', difficulty: 'Beginner' },
            { id: 'py-ops', name: 'Operators & Expressions', mastery: 90, status: 'Mastered', difficulty: 'Beginner' }
          ]
        },
        {
          id: 'py-control',
          name: 'Control Flow',
          mastery: 84,
          status: 'Strong',
          difficulty: 'Beginner',
          description: 'Conditional branching, iterative loops, and loop control statements.',
          children: [
            { id: 'py-cond', name: 'If/Elif/Else Conditions', mastery: 90, status: 'Mastered', difficulty: 'Beginner' },
            { id: 'py-for', name: 'For Loops & Iterables', mastery: 85, status: 'Strong', difficulty: 'Beginner' },
            { id: 'py-while', name: 'While Loops & Break/Continue', mastery: 78, status: 'Strong', difficulty: 'Beginner' }
          ]
        },
        {
          id: 'py-functions',
          name: 'Functions & Modules',
          mastery: 71,
          status: 'Strong',
          difficulty: 'Intermediate',
          description: 'Function definitions, argument unpacking, return values, scope, and lambda expressions.',
          children: [
            { id: 'py-func-params', name: 'Positional & Keyword Parameters', mastery: 78, status: 'Strong', difficulty: 'Intermediate' },
            { id: 'py-func-returns', name: 'Return Values & Tuples', mastery: 75, status: 'Strong', difficulty: 'Intermediate' },
            { id: 'py-func-lambda', name: 'Lambda & Higher-Order Functions', mastery: 60, status: 'Developing', difficulty: 'Intermediate' }
          ]
        },
        {
          id: 'py-ds',
          name: 'Data Structures',
          mastery: 78,
          status: 'Strong',
          difficulty: 'Intermediate',
          description: 'Built-in linear and associative data collections with algorithmic complexity awareness.',
          children: [
            { id: 'py-lists', name: 'Lists & Slicing', mastery: 88, status: 'Strong', difficulty: 'Intermediate' },
            { id: 'py-dicts', name: 'Dictionaries & Hash Maps', mastery: 80, status: 'Strong', difficulty: 'Intermediate' },
            { id: 'py-sets', name: 'Sets & Tuples', mastery: 66, status: 'Developing', difficulty: 'Intermediate' }
          ]
        },
        {
          id: 'py-oop',
          name: 'Object-Oriented Programming',
          mastery: 34,
          status: 'Needs Attention',
          difficulty: 'Advanced',
          description: 'Encapsulation, class/instance state, inheritance hierarchies, and runtime polymorphism.',
          children: [
            { id: 'py-classes', name: 'Classes & Attributes', mastery: 42, status: 'Developing', difficulty: 'Intermediate' },
            { id: 'py-objects', name: 'Objects & __init__ Constructors', mastery: 38, status: 'Needs Attention', difficulty: 'Intermediate' },
            { id: 'py-inheritance', name: 'Inheritance & super() Methods', mastery: 21, status: 'Needs Attention', difficulty: 'Advanced' },
            { id: 'py-polymorphism', name: 'Polymorphism & Dunder Methods', mastery: 18, status: 'Needs Attention', difficulty: 'Advanced' }
          ]
        }
      ]
    },
    diagnosticQuestions: [
      {
        id: 'q1',
        conceptId: 'py-vars',
        conceptName: 'Variables & Scope',
        difficulty: 'Beginner',
        question: 'What is the output of the following code snippet?\n\nx = 10\ndef modify():\n    x = 20\nmodify()\nprint(x)',
        options: [
          '20 because functions modify global variables by default',
          '10 because x inside modify() is a local variable',
          'UnboundLocalError runtime exception',
          'None'
        ],
        correctIndex: 1,
        explanation: 'Variables defined inside a function without the `global` keyword reside only within the local namespace, leaving the global `x` unmodified.'
      },
      {
        id: 'q2',
        conceptId: 'py-types',
        conceptName: 'Data Types & Casting',
        difficulty: 'Beginner',
        question: 'Which of the following data types in Python is IMMUTABLE?',
        options: [
          'List [1, 2, 3]',
          'Dictionary {"a": 1}',
          'Tuple (1, 2, 3)',
          'Set {1, 2, 3}'
        ],
        correctIndex: 2,
        explanation: 'Tuples, strings, and integers are immutable in Python; once allocated in memory, their elements cannot be reassigned in-place.'
      },
      {
        id: 'q3',
        conceptId: 'py-for',
        conceptName: 'For Loops & Iterables',
        difficulty: 'Beginner',
        question: 'What will `list(range(2, 10, 3))` evaluate to in Python?',
        options: [
          '[2, 5, 8]',
          '[2, 5, 8, 10]',
          '[3, 6, 9]',
          '[2, 3, 4, 5, 6, 7, 8, 9]'
        ],
        correctIndex: 0,
        explanation: '`range(start, stop, step)` starts at 2, increments by 3 each step (2, 5, 8), and halts strictly before the stop bound of 10.'
      },
      {
        id: 'q4',
        conceptId: 'py-func-lambda',
        conceptName: 'Lambda Functions',
        difficulty: 'Intermediate',
        question: 'What is the value of `result` in:\n\nnums = [1, 2, 3, 4]\nresult = list(map(lambda x: x * 2, filter(lambda x: x % 2 == 0, nums)))',
        options: [
          '[2, 4, 6, 8]',
          '[4, 8]',
          '[2, 6]',
          '[4]'
        ],
        correctIndex: 1,
        explanation: '`filter` extracts the even numbers `[2, 4]`, and `map` subsequently multiplies each by 2 to yield `[4, 8]`.'
      },
      {
        id: 'q5',
        conceptId: 'py-dicts',
        conceptName: 'Dictionaries & Hash Maps',
        difficulty: 'Intermediate',
        question: 'What is the time complexity of searching for a specific key in a standard Python dictionary under average conditions?',
        options: [
          'O(n)',
          'O(log n)',
          'O(1)',
          'O(n log n)'
        ],
        correctIndex: 2,
        explanation: 'Python dictionaries are implemented as highly optimized open-addressing hash tables, providing average O(1) key lookup complexity.'
      },
      {
        id: 'q6',
        conceptId: 'py-lists',
        conceptName: 'Lists & Slicing',
        difficulty: 'Intermediate',
        question: 'What does `nums[::-1]` perform on a list `nums = [10, 20, 30, 40]`?',
        options: [
          'Deletes the last element of the list',
          'Returns a new reversed copy of the list',
          'Sorts the list in ascending order',
          'Throws an IndexError'
        ],
        correctIndex: 1,
        explanation: 'Slice notation `[start:stop:step]` with a negative step `-1` traverses the entire iterable from tail to head, producing `[40, 30, 20, 10]`.'
      },
      {
        id: 'q7',
        conceptId: 'py-classes',
        conceptName: 'Classes & Attributes',
        difficulty: 'Intermediate',
        question: 'What is the purpose of the `self` parameter in a Python class method?',
        options: [
          'It is a reserved keyword that imports parent modules',
          'It references the specific instance of the class upon which the method is called',
          'It denotes a static utility method that cannot access instance fields',
          'It points to the memory address of the global interpreter lock'
        ],
        correctIndex: 1,
        explanation: 'By convention and Python design, `self` explicitly passes the instance reference so methods can bind and mutate instance-specific attributes.'
      },
      {
        id: 'q8',
        conceptId: 'py-inheritance',
        conceptName: 'Inheritance & super() Methods',
        difficulty: 'Advanced',
        question: 'In single inheritance, what does `super().__init__(*args)` accomplish within a child class constructor?',
        options: [
          'It prevents the parent class from executing its initialization logic',
          'It delegates initialization up the Method Resolution Order (MRO) to the parent class constructor',
          'It overwrites all parent class properties with None',
          'It converts the child class into an abstract metaclass'
        ],
        correctIndex: 1,
        explanation: '`super()` returns a proxy object delegating method calls up the inheritance chain (MRO), allowing child classes to initialize parent attributes cleanly.'
      },
      {
        id: 'q9',
        conceptId: 'py-polymorphism',
        conceptName: 'Polymorphism & Dunder Methods',
        difficulty: 'Advanced',
        question: 'Which special dunder method must be implemented to allow an object to support custom string representations for end-users via `print(obj)` or `str(obj)`?',
        options: [
          '__repr__(self)',
          '__str__(self)',
          '__format__(self)',
          '__display__(self)'
        ],
        correctIndex: 1,
        explanation: '`__str__` is designed for readable end-user string representation, whereas `__repr__` is intended for unambiguous debugging representations.'
      },
      {
        id: 'q10',
        conceptId: 'py-inheritance',
        conceptName: 'Inheritance & Method Overriding',
        difficulty: 'Advanced',
        question: 'When a subclass defines a method with the exact same name and signature as its superclass, what occurs when calling that method on a subclass instance?',
        options: [
          'A TypeError is raised due to name collisions',
          'Both parent and child methods execute simultaneously',
          'The subclass method overrides the superclass implementation',
          'Python defaults to calling the superclass method unless forced'
        ],
        correctIndex: 2,
        explanation: 'Method overriding enables the subclass to provide a specialized implementation of a method already defined in its base class.'
      }
    ],
    weakConcepts: [
      {
        id: 'py-inheritance',
        name: 'Inheritance & super() Methods',
        parentTopic: 'Object-Oriented Programming',
        currentMastery: 21,
        targetMastery: 75,
        gapPoints: 54,
        estimatedTime: '45 min',
        criticality: 'High',
        prerequisitesMet: true,
        reason: 'Severe knowledge deficit detected in parent class delegation, method overriding, and MRO traversal.'
      },
      {
        id: 'py-polymorphism',
        name: 'Polymorphism & Dunder Methods',
        parentTopic: 'Object-Oriented Programming',
        currentMastery: 18,
        targetMastery: 70,
        gapPoints: 52,
        estimatedTime: '35 min',
        criticality: 'High',
        prerequisitesMet: false,
        reason: 'Requires solidifying Inheritance fundamentals before advanced operator overloading and dunder dispatch.'
      },
      {
        id: 'py-func-lambda',
        name: 'Lambda & Higher-Order Functions',
        parentTopic: 'Functions & Modules',
        currentMastery: 60,
        targetMastery: 80,
        gapPoints: 20,
        estimatedTime: '20 min',
        criticality: 'Medium',
        prerequisitesMet: true,
        reason: 'Functional expression chaining (map, filter, reduce) requires targeted syntax drill.'
      }
    ],
    recommendations: [
      {
        id: 'rec-1',
        title: 'Python Inheritance & Subclassing Deep Dive',
        source: 'YouTube (Corey Schafer)',
        url: 'https://www.youtube.com/watch?v=RSl87lqOXDE',
        embedId: 'RSl87lqOXDE',
        duration: '22 min',
        difficulty: 'Intermediate',
        matchScore: 96,
        badge: 'High Priority Gap',
        coveredConcepts: ['Classes', 'Inheritance', 'Method Overriding', 'super() call'],
        learningObjective: 'Understand how subclasses inherit attributes, override parent behavior, and utilize super() for clean class hierarchies.',
        whyRecommended: 'Your diagnostic shows a critical 21% gap in inheritance while your basic Python fundamentals are 92% strong. This video targets the exact missing syntax without wasting time on basics.',
        timestamps: [
          { time: '0:00', label: 'Inheritance Problem Statement' },
          { time: '5:12', label: 'Creating Subclasses & Pass' },
          { time: '11:40', label: 'super().__init__() Explained' },
          { time: '17:25', label: 'isinstance() and issubclass()' }
        ]
      },
      {
        id: 'rec-2',
        title: 'Python Object-Oriented Programming: Polymorphism & Dunder Methods',
        source: 'YouTube (ArjanCodes)',
        url: 'https://www.youtube.com/watch?v=ziWstbm_N2k',
        embedId: 'ziWstbm_N2k',
        duration: '18 min',
        difficulty: 'Advanced',
        matchScore: 91,
        badge: 'Bridge Concept',
        coveredConcepts: ['Polymorphism', '__repr__ vs __str__', 'Operator Overloading'],
        learningObjective: 'Master runtime polymorphic dispatch and Pythonic dunder magic methods for clean domain modeling.',
        whyRecommended: 'Addresses your 18% polymorphism deficiency. Explains duck typing and custom protocol implementations cleanly.',
        timestamps: [
          { time: '0:00', label: 'What is Polymorphism?' },
          { time: '4:30', label: 'Duck Typing in Practice' },
          { time: '10:15', label: 'Magic Dunder Protocols' },
          { time: '15:50', label: 'Practical Architecture Pattern' }
        ]
      },
      {
        id: 'rec-3',
        title: 'Targeted Lab: Refactoring Procedural Code to OOP Hierarchies',
        source: 'MERIQ Interactive Sandbox',
        url: '#practice-lab',
        duration: '25 min',
        difficulty: 'Intermediate',
        matchScore: 88,
        badge: 'Hands-on Practice',
        coveredConcepts: ['Class Design', 'Encapsulation', 'Refactoring'],
        learningObjective: 'Refactor 4 procedural functions into an extensible Animal/Employee inheritance hierarchy with verified unit tests.',
        whyRecommended: 'Active coding reinforces class structuring 3x faster than passive watching. Perfect post-video synthesis.'
      }
    ],
    retestQuestions: [
      {
        id: 'rt-1',
        conceptId: 'py-inheritance',
        conceptName: 'Inheritance & Method Overriding',
        difficulty: 'Intermediate',
        question: 'What happens when a child class overrides a method inherited from its parent class?',
        options: [
          'The parent method is executed first, followed automatically by the child method',
          'The child class implementation takes precedence whenever called on a child instance',
          'Python throws an OverwriteWarning during module compilation',
          'The method can no longer access instance variables'
        ],
        correctIndex: 1,
        explanation: 'Method overriding allows the child class to substitute its own specialized logic in place of the base class implementation.'
      },
      {
        id: 'rt-2',
        conceptId: 'py-inheritance',
        conceptName: 'super() Delegation',
        difficulty: 'Intermediate',
        question: 'Consider the code:\n\nclass Parent:\n    def __init__(self, name):\n        self.name = name\n\nclass Child(Parent):\n    def __init__(self, name, age):\n        super().__init__(name)\n        self.age = age\n\nWhat does `super().__init__(name)` do?',
        options: [
          'Initializes `self.name` on the child instance using the Parent class constructor',
          'Creates a separate detached Parent instance in memory',
          'Destroys previous instances of Child',
          'Calls the global garbage collector'
        ],
        correctIndex: 0,
        explanation: '`super().__init__(name)` invokes the parent initialization logic, binding the `name` attribute onto the active child instance cleanly.'
      },
      {
        id: 'rt-3',
        conceptId: 'py-inheritance',
        conceptName: 'isinstance and Inheritance Relationships',
        difficulty: 'Intermediate',
        question: 'If `class Dog(Animal): pass` and `my_dog = Dog()`, what will `isinstance(my_dog, Animal)` return?',
        options: [
          'False because my_dog is explicitly an instance of Dog, not Animal',
          'True because Dog inherits from Animal, satisfying the is-a relationship',
          'None',
          'Raises a TypeError'
        ],
        correctIndex: 1,
        explanation: 'Inheritance establishes an "is-a" relationship; every Dog instance is inherently also an Animal instance.'
      }
    ],
    retestImprovement: {
      conceptId: 'py-inheritance',
      conceptName: 'Inheritance & super() Methods',
      beforeScore: 21,
      afterScore: 74,
      delta: 53,
      newOverallMastery: 76,
      masteryStatus: 'Strong'
    }
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'Web Development',
    icon: 'Atom',
    color: 'from-cyan-500 to-blue-600',
    description: 'Component architecture, reactive hooks (useState, useEffect, useMemo), Context API, and state reconciliation.',
    level: 'Intermediate',
    totalConcepts: 14,
    masteredConcepts: 9,
    overallMastery: 62,
    lastDiagnosed: '4 days ago',
    status: 'learning_gap',
    hierarchy: {
      id: 'react-root',
      name: 'React 18 Component & State Architecture',
      mastery: 62,
      status: 'Developing',
      children: [
        {
          id: 'react-comp',
          name: 'Component Model & JSX',
          mastery: 88,
          status: 'Strong',
          difficulty: 'Beginner',
          children: [
            { id: 'react-jsx', name: 'JSX Syntax & Expressions', mastery: 95, status: 'Mastered', difficulty: 'Beginner' },
            { id: 'react-props', name: 'Props & Unidirectional Data Flow', mastery: 85, status: 'Strong', difficulty: 'Beginner' }
          ]
        },
        {
          id: 'react-hooks',
          name: 'Hooks & State Lifecycle',
          mastery: 48,
          status: 'Developing',
          difficulty: 'Intermediate',
          children: [
            { id: 'react-state', name: 'useState & Immutability', mastery: 82, status: 'Strong', difficulty: 'Beginner' },
            { id: 'react-effect', name: 'useEffect & Dependency Arrays', mastery: 35, status: 'Needs Attention', difficulty: 'Intermediate' },
            { id: 'react-memo', name: 'useMemo & useCallback Memoization', mastery: 28, status: 'Needs Attention', difficulty: 'Advanced' }
          ]
        },
        {
          id: 'react-ctx',
          name: 'State Management & Context',
          mastery: 50,
          status: 'Developing',
          difficulty: 'Intermediate',
          children: [
            { id: 'react-context', name: 'Context API & Providers', mastery: 50, status: 'Developing', difficulty: 'Intermediate' }
          ]
        }
      ]
    },
    weakConcepts: [
      {
        id: 'react-effect',
        name: 'useEffect & Dependency Arrays',
        parentTopic: 'Hooks & State Lifecycle',
        currentMastery: 35,
        targetMastery: 75,
        gapPoints: 40,
        estimatedTime: '30 min',
        criticality: 'High',
        reason: 'Frequent stale closure and dependency array misunderstanding causing infinite render loops.'
      },
      {
        id: 'react-memo',
        name: 'useMemo & useCallback Memoization',
        parentTopic: 'Hooks & State Lifecycle',
        currentMastery: 28,
        targetMastery: 70,
        gapPoints: 42,
        estimatedTime: '40 min',
        criticality: 'High',
        reason: 'Referential equality and expensive re-computation optimization knowledge missing.'
      }
    ],
    recommendations: [
      {
        id: 'rec-react-1',
        title: 'Mastering useEffect and the Dependency Array in React 18',
        source: 'YouTube (Web Dev Simplified)',
        duration: '19 min',
        difficulty: 'Intermediate',
        matchScore: 94,
        badge: 'High Priority Gap',
        coveredConcepts: ['useEffect', 'Cleanup Functions', 'Stale Closures'],
        learningObjective: 'Understand how React synchronization works and eliminate infinite re-renders.',
        whyRecommended: 'Targets your 35% gap in side-effect lifecycle management.'
      }
    ]
  },
  {
    id: 'sql',
    name: 'SQL & Relational Databases',
    category: 'Databases',
    icon: 'Database',
    color: 'from-emerald-500 to-teal-700',
    description: 'Relational queries, complex multi-table joins, subqueries, indexing, and analytical window functions.',
    level: 'Intermediate',
    totalConcepts: 15,
    masteredConcepts: 11,
    overallMastery: 74,
    lastDiagnosed: '1 week ago',
    status: 'good',
    hierarchy: {
      id: 'sql-root',
      name: 'Relational Database Querying & Optimization',
      mastery: 74,
      status: 'Strong',
      children: [
        {
          id: 'sql-basics',
          name: 'Queries & Filtering',
          mastery: 95,
          status: 'Mastered',
          difficulty: 'Beginner',
          children: [
            { id: 'sql-select', name: 'SELECT, WHERE, ORDER BY', mastery: 98, status: 'Mastered', difficulty: 'Beginner' }
          ]
        },
        {
          id: 'sql-joins',
          name: 'Relational Joins',
          mastery: 86,
          status: 'Strong',
          difficulty: 'Intermediate',
          children: [
            { id: 'sql-inner', name: 'INNER & LEFT JOIN', mastery: 90, status: 'Mastered', difficulty: 'Intermediate' },
            { id: 'sql-outer', name: 'CROSS & FULL OUTER JOIN', mastery: 82, status: 'Strong', difficulty: 'Intermediate' }
          ]
        },
        {
          id: 'sql-advanced',
          name: 'Analytical Window Functions',
          mastery: 32,
          status: 'Needs Attention',
          difficulty: 'Advanced',
          children: [
            { id: 'sql-window', name: 'ROW_NUMBER, RANK, DENSE_RANK', mastery: 30, status: 'Needs Attention', difficulty: 'Advanced' },
            { id: 'sql-partition', name: 'PARTITION BY & OVER clauses', mastery: 34, status: 'Needs Attention', difficulty: 'Advanced' }
          ]
        }
      ]
    },
    weakConcepts: [
      {
        id: 'sql-advanced',
        name: 'Analytical Window Functions (PARTITION BY & RANK)',
        parentTopic: 'Advanced SQL',
        currentMastery: 32,
        targetMastery: 80,
        gapPoints: 48,
        estimatedTime: '40 min',
        criticality: 'High',
        reason: 'Struggling with analytical partitions and rolling cumulative aggregations.'
      }
    ],
    recommendations: [
      {
        id: 'rec-sql-1',
        title: 'SQL Window Functions in 20 Minutes',
        source: 'YouTube (Luke Barousse)',
        duration: '21 min',
        difficulty: 'Advanced',
        matchScore: 97,
        badge: 'High Priority Gap',
        coveredConcepts: ['OVER()', 'PARTITION BY', 'DENSE_RANK()'],
        learningObjective: 'Master sliding window aggregations and competitive rankings without subquery nesting.',
        whyRecommended: 'You already know Joins (86%); this video bridges directly into your missing 32% window function mastery.'
      }
    ]
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    category: 'AI & Machine Learning',
    icon: 'BrainCircuit',
    color: 'from-purple-600 to-indigo-700',
    description: 'Feature engineering, supervised/unsupervised algorithms, cost functions, gradient descent, and validation metrics.',
    level: 'Advanced',
    totalConcepts: 18,
    masteredConcepts: 8,
    overallMastery: 52,
    lastDiagnosed: '3 days ago',
    status: 'learning_gap',
    hierarchy: {
      id: 'ml-root',
      name: 'Applied Machine Learning Foundations',
      mastery: 52,
      status: 'Developing',
      children: [
        {
          id: 'ml-prep',
          name: 'Data Preprocessing',
          mastery: 82,
          status: 'Strong',
          difficulty: 'Beginner',
          children: [
            { id: 'ml-scaling', name: 'Normalization & Standardization', mastery: 85, status: 'Strong', difficulty: 'Beginner' }
          ]
        },
        {
          id: 'ml-supervised',
          name: 'Supervised Learning',
          mastery: 65,
          status: 'Developing',
          difficulty: 'Intermediate',
          children: [
            { id: 'ml-linreg', name: 'Linear & Logistic Regression', mastery: 78, status: 'Strong', difficulty: 'Intermediate' },
            { id: 'ml-trees', name: 'Decision Trees & Random Forests', mastery: 52, status: 'Developing', difficulty: 'Intermediate' }
          ]
        },
        {
          id: 'ml-eval',
          name: 'Model Evaluation Metrics',
          mastery: 28,
          status: 'Needs Attention',
          difficulty: 'Advanced',
          children: [
            { id: 'ml-roc', name: 'Precision, Recall, F1 & ROC-AUC', mastery: 28, status: 'Needs Attention', difficulty: 'Advanced' }
          ]
        }
      ]
    },
    weakConcepts: [
      {
        id: 'ml-eval',
        name: 'Precision, Recall, F1 & ROC-AUC Curves',
        parentTopic: 'Model Evaluation',
        currentMastery: 28,
        targetMastery: 75,
        gapPoints: 47,
        estimatedTime: '35 min',
        criticality: 'High',
        reason: 'Confusion between Type I / Type II errors and class imbalance evaluation strategies.'
      }
    ],
    recommendations: [
      {
        id: 'rec-ml-1',
        title: 'StatQuest: ROC and AUC, Clearly Explained!!!',
        source: 'YouTube (StatQuest with Josh Starmer)',
        duration: '16 min',
        difficulty: 'Intermediate',
        matchScore: 98,
        badge: 'High Priority Gap',
        coveredConcepts: ['ROC Curves', 'Sensitivity & Specificity', 'AUC Interpretation'],
        learningObjective: 'Master threshold-independent model classification benchmarking.',
        whyRecommended: 'Eliminates confusion between precision-recall tradeoffs for skewed datasets.'
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript (Modern ES6+)',
    category: 'Programming',
    icon: 'Code2',
    color: 'from-amber-500 to-yellow-600',
    description: 'Event loop, asynchronous promises, prototypes, scoping closures, and functional methods.',
    level: 'Intermediate',
    totalConcepts: 16,
    masteredConcepts: 13,
    overallMastery: 81,
    lastDiagnosed: '5 days ago',
    status: 'good'
  },
  {
    id: 'aws',
    name: 'AWS Cloud Architecture',
    category: 'Cloud',
    icon: 'Cloud',
    color: 'from-orange-500 to-amber-700',
    description: 'IAM security, EC2 compute, S3 storage, VPC network design, and serverless Lambda patterns.',
    level: 'Intermediate',
    totalConcepts: 20,
    masteredConcepts: 10,
    overallMastery: 55,
    lastDiagnosed: '1 week ago',
    status: 'learning_gap'
  },
  {
    id: 'data-science',
    name: 'Data Science & Pandas',
    category: 'Data Science',
    icon: 'LineChart',
    color: 'from-teal-600 to-emerald-700',
    description: 'Pandas dataframes, NumPy vectorized matrix operations, exploratory data analysis, and Matplotlib visualizations.',
    level: 'Intermediate',
    totalConcepts: 15,
    masteredConcepts: 11,
    overallMastery: 72,
    lastDiagnosed: '2 weeks ago',
    status: 'good'
  },
  {
    id: 'docker',
    name: 'Docker & Containerization',
    category: 'DevOps',
    icon: 'Container',
    color: 'from-sky-600 to-blue-700',
    description: 'Dockerfiles, multi-stage builds, volume mounts, bridge networks, and docker-compose microservices.',
    level: 'Intermediate',
    totalConcepts: 12,
    masteredConcepts: 7,
    overallMastery: 58,
    lastDiagnosed: '3 weeks ago',
    status: 'learning_gap'
  }
];

export const CATEGORIES = [
  'All',
  'Programming',
  'Data Science',
  'AI & Machine Learning',
  'Web Development',
  'Cloud',
  'Databases',
  'DevOps'
];

// Helper to generate dynamic skill hierarchy for ANY custom skill entered by user
export function generateDynamicSkillGraph(skillName, category = 'General') {
  const cleanId = skillName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return {
    id: cleanId,
    name: skillName,
    category: category,
    icon: 'Cpu',
    color: 'from-indigo-600 to-meriq-600',
    description: `Structured concept hierarchy, diagnostic metrics, and targeted micro-curricula for ${skillName}.`,
    level: 'Intermediate',
    totalConcepts: 12,
    masteredConcepts: 6,
    overallMastery: 50,
    lastDiagnosed: 'Just now',
    status: 'learning_gap',
    hierarchy: {
      id: `${cleanId}-root`,
      name: `${skillName} Knowledge Graph`,
      mastery: 50,
      status: 'Developing',
      children: [
        {
          id: `${cleanId}-fundamentals`,
          name: `${skillName} Foundations`,
          mastery: 85,
          status: 'Strong',
          difficulty: 'Beginner',
          description: `Core primitives, initialization, and fundamental syntax of ${skillName}.`,
          children: [
            { id: `${cleanId}-f1`, name: 'Core Syntax & Primitives', mastery: 90, status: 'Mastered', difficulty: 'Beginner' },
            { id: `${cleanId}-f2`, name: 'Configuration & Setup', mastery: 80, status: 'Strong', difficulty: 'Beginner' }
          ]
        },
        {
          id: `${cleanId}-core-mechanics`,
          name: 'Core Mechanics & Workflows',
          mastery: 58,
          status: 'Developing',
          difficulty: 'Intermediate',
          description: `Key operating principles and pipeline construction in ${skillName}.`,
          children: [
            { id: `${cleanId}-m1`, name: 'Standard Implementation Patterns', mastery: 65, status: 'Developing', difficulty: 'Intermediate' },
            { id: `${cleanId}-m2`, name: 'Lifecycle & State Management', mastery: 50, status: 'Developing', difficulty: 'Intermediate' }
          ]
        },
        {
          id: `${cleanId}-advanced`,
          name: 'Advanced Paradigms & Optimization',
          mastery: 28,
          status: 'Needs Attention',
          difficulty: 'Advanced',
          description: `Performance optimization, security invariants, and scaling ${skillName}.`,
          children: [
            { id: `${cleanId}-a1`, name: 'Concurrency & Resource Efficiency', mastery: 30, status: 'Needs Attention', difficulty: 'Advanced' },
            { id: `${cleanId}-a2`, name: 'Architectural Edge Cases & Scaling', mastery: 25, status: 'Needs Attention', difficulty: 'Advanced' }
          ]
        }
      ]
    },
    diagnosticQuestions: [
      {
        id: `${cleanId}-q1`,
        conceptId: `${cleanId}-f1`,
        conceptName: 'Core Syntax & Primitives',
        difficulty: 'Beginner',
        question: `Which fundamental principle is central to correct execution in ${skillName}?`,
        options: [
          'Explicit declarative configuration and deterministic state handling',
          'Arbitrary unconstrained memory mutation without tracking',
          'Disabling all runtime validation checks',
          'Relying solely on unstructured global variables'
        ],
        correctIndex: 0,
        explanation: `${skillName} relies on clean, deterministic architecture to prevent state corruption.`
      },
      {
        id: `${cleanId}-q2`,
        conceptId: `${cleanId}-a1`,
        conceptName: 'Concurrency & Resource Efficiency',
        difficulty: 'Advanced',
        question: `When scaling ${skillName} under heavy production workload, what is the optimal strategy for resource containment?`,
        options: [
          'Implement asynchronous non-blocking worker pools with backpressure throttling',
          'Spawn unbounded synchronous blocking threads per request',
          'Increase buffer size indefinitely without evictions',
          'Disable garbage collection completely'
        ],
        correctIndex: 0,
        explanation: 'Backpressure and bounded asynchronous worker pools preserve system stability.'
      }
    ],
    weakConcepts: [
      {
        id: `${cleanId}-a1`,
        name: 'Concurrency & Resource Efficiency',
        parentTopic: 'Advanced Paradigms & Optimization',
        currentMastery: 30,
        targetMastery: 75,
        gapPoints: 45,
        estimatedTime: '35 min',
        criticality: 'High',
        reason: 'Detected weak understanding of resource throttling and async scaling.'
      }
    ],
    recommendations: [
      {
        id: `rec-${cleanId}-1`,
        title: `${skillName} Production Best Practices & Architectural Scaling`,
        source: 'MERIQ Curated Knowledge Stream',
        duration: '24 min',
        difficulty: 'Advanced',
        matchScore: 95,
        badge: 'Critical Gap',
        coveredConcepts: ['Concurrency', 'Resource Management', 'Optimization'],
        learningObjective: `Understand throughput optimization and state resilience in ${skillName}.`,
        whyRecommended: `Your diagnostic revealed that while you grasp ${skillName} fundamentals, concurrency and advanced scaling need reinforcement.`
      }
    ],
    retestQuestions: [
      {
        id: `rt-${cleanId}-1`,
        conceptId: `${cleanId}-a1`,
        conceptName: 'Concurrency & Resource Efficiency',
        difficulty: 'Intermediate',
        question: `What primary mechanism prevents memory exhaustion in high-throughput ${skillName} pipelines?`,
        options: [
          'Bounded queues with proactive backpressure signaling',
          'Unlimited thread allocation without monitors',
          'Ignoring network timeouts',
          'Hardcoded sleep intervals in request handlers'
        ],
        correctIndex: 0,
        explanation: 'Bounded queues regulate intake rates to match consumer processing velocity.'
      }
    ],
    retestImprovement: {
      conceptId: `${cleanId}-a1`,
      conceptName: 'Concurrency & Resource Efficiency',
      beforeScore: 30,
      afterScore: 78,
      delta: 48,
      newOverallMastery: 70,
      masteryStatus: 'Strong'
    }
  };
}
