"""
Seed data repository for MERIQ.
Provides academic-grade benchmark datasets for core technical competencies.
"""

INITIAL_SKILLS = [
    {
        "id": "python",
        "name": "Python",
        "category": "Programming",
        "description": "Object-oriented scripting, functional programming paradigms, and standard library data structures.",
        "icon": "Terminal",
        "overallMastery": 67,
        "totalConcepts": 16,
        "masteredConcepts": 12,
        "lastDiagnosed": "2 hours ago",
        "hierarchy": {
            "id": "py-root",
            "name": "Python Core Architecture",
            "mastery": 67,
            "children": [
                {
                    "id": "py-fundamentals",
                    "name": "1. Fundamentals & Syntax",
                    "mastery": 92,
                    "difficulty": "Beginner",
                    "description": "Variables, lexical scoping, arithmetic operators, dynamic type coercion, and standard I/O.",
                    "children": [
                        {"id": "py-vars", "name": "Variables & References", "mastery": 95, "difficulty": "Beginner"},
                        {"id": "py-types", "name": "Primitive Data Types (int, float, str, bool)", "mastery": 90, "difficulty": "Beginner"},
                        {"id": "py-ops", "name": "Operators & Expressions", "mastery": 92, "difficulty": "Beginner"}
                    ]
                },
                {
                    "id": "py-control",
                    "name": "2. Control Flow & Iteration",
                    "mastery": 84,
                    "difficulty": "Beginner",
                    "description": "Branching conditionals, while/for iteration protocols, and range generators.",
                    "children": [
                        {"id": "py-conditionals", "name": "Conditional Branching (if/elif/else)", "mastery": 88, "difficulty": "Beginner"},
                        {"id": "py-loops", "name": "Iteration Loops (for, while, break, continue)", "mastery": 82, "difficulty": "Beginner"},
                        {"id": "py-comprehensions", "name": "List & Dict Comprehensions", "mastery": 82, "difficulty": "Intermediate"}
                    ]
                },
                {
                    "id": "py-functions",
                    "name": "3. Functions & Scope",
                    "mastery": 71,
                    "difficulty": "Intermediate",
                    "description": "Parameter packing (*args, **kwargs), closures, higher-order functions, and lambda abstractions.",
                    "children": [
                        {"id": "py-args", "name": "Positional & Keyword Arguments", "mastery": 78, "difficulty": "Intermediate"},
                        {"id": "py-lambdas", "name": "Lambda Expressions & Anonymous Functions", "mastery": 68, "difficulty": "Intermediate"},
                        {"id": "py-decorators", "name": "Decorators & Function Wrappers", "mastery": 65, "difficulty": "Advanced"}
                    ]
                },
                {
                    "id": "py-ds",
                    "name": "4. Data Structures",
                    "mastery": 78,
                    "difficulty": "Intermediate",
                    "description": "Hash map collision mechanics in dicts, sequence slicing, and set mathematical operations.",
                    "children": [
                        {"id": "py-lists", "name": "Lists & Tuples (Mutability & Slicing)", "mastery": 85, "difficulty": "Beginner"},
                        {"id": "py-dicts", "name": "Dictionaries & Key Lookup Hashes", "mastery": 76, "difficulty": "Intermediate"},
                        {"id": "py-sets", "name": "Sets & Uniqueness Collections", "mastery": 72, "difficulty": "Intermediate"}
                    ]
                },
                {
                    "id": "py-oop",
                    "name": "5. Object-Oriented Programming (OOP)",
                    "mastery": 34,
                    "difficulty": "Advanced",
                    "description": "Class declarations, inheritance models, polymorphic dispatch, and super() constructor delegation.",
                    "children": [
                        {"id": "py-classes", "name": "Classes, Instances & self", "mastery": 42, "difficulty": "Intermediate"},
                        {"id": "py-inheritance", "name": "Inheritance & super() Methods", "mastery": 21, "difficulty": "Advanced"},
                        {"id": "py-dunder", "name": "Dunder Magic Methods (__init__, __str__, __repr__)", "mastery": 38, "difficulty": "Advanced"}
                    ]
                }
            ]
        }
    },
    {
        "id": "sql",
        "name": "SQL & Relational Databases",
        "category": "Databases",
        "description": "Relational schema design, ACID transactions, complex joins, window functions, and query index optimization.",
        "icon": "Database",
        "overallMastery": 74,
        "totalConcepts": 14,
        "masteredConcepts": 10,
        "lastDiagnosed": "Yesterday"
    },
    {
        "id": "react",
        "name": "React & Modern Web",
        "category": "Frontend",
        "description": "Component reconciliation, hook closures (useEffect, useCallback), virtual DOM diffing, and state management.",
        "icon": "Atom",
        "overallMastery": 59,
        "totalConcepts": 15,
        "masteredConcepts": 8,
        "lastDiagnosed": "3 days ago"
    },
    {
        "id": "ml",
        "name": "Machine Learning Foundations",
        "category": "AI / ML",
        "description": "Supervised loss functions, gradient descent optimization, overfitting regularization, and cross-validation.",
        "icon": "BrainCircuit",
        "overallMastery": 42,
        "totalConcepts": 18,
        "masteredConcepts": 6,
        "lastDiagnosed": "5 days ago"
    },
    {
        "id": "aws",
        "name": "AWS Cloud Architecture",
        "category": "Cloud / DevOps",
        "description": "Serverless Lambda orchestration, S3 lifecycle policies, VPC CIDR subnets, and IAM role trust relationships.",
        "icon": "Cloud",
        "overallMastery": 62,
        "totalConcepts": 12,
        "masteredConcepts": 7,
        "lastDiagnosed": "Last week"
    },
    {
        "id": "javascript",
        "name": "JavaScript Runtime & Async",
        "category": "Programming",
        "description": "Event loop microtask queues, prototypal inheritance chains, Promises, and V8 engine execution contexts.",
        "icon": "Code2",
        "overallMastery": 81,
        "totalConcepts": 16,
        "masteredConcepts": 13,
        "lastDiagnosed": "4 days ago"
    }
]

PYTHON_DIAGNOSTIC_QUESTIONS = [
    {
        "id": "q1",
        "conceptId": "py-types",
        "conceptName": "Primitive Data Types",
        "difficulty": "Beginner",
        "question": "What is the output of the following Python expression?\n\ntype(3 / 2)",
        "options": ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'number'>"],
        "correctOption": 1,
        "explanation": "In Python 3, the '/' operator performs true floating-point division, returning float (1.5)."
    },
    {
        "id": "q2",
        "conceptId": "py-loops",
        "conceptName": "Iteration Loops",
        "difficulty": "Beginner",
        "question": "What will be printed when executing this loop?\n\nfor i in range(1, 6, 2):\n    print(i, end=' ')",
        "options": ["1 2 3 4 5", "1 3 5", "2 4 6", "1 3 5 7"],
        "correctOption": 1,
        "explanation": "range(start=1, stop=6, step=2) generates values 1, 3, and 5."
    },
    {
        "id": "q3",
        "conceptId": "py-comprehensions",
        "conceptName": "List Comprehensions",
        "difficulty": "Intermediate",
        "question": "What is the evaluated result of the following list comprehension?\n\n[x**2 for x in range(5) if x % 2 != 0]",
        "options": ["[0, 4, 16]", "[1, 9]", "[1, 4, 9, 16]", "[0, 1, 4, 9, 16]"],
        "correctOption": 1,
        "explanation": "The filter condition 'x % 2 != 0' selects odd numbers (1, 3), and squares them into [1, 9]."
    },
    {
        "id": "q4",
        "conceptId": "py-args",
        "conceptName": "Functions (*args / **kwargs)",
        "difficulty": "Intermediate",
        "question": "Inside a function definition, what Python data structure does '*args' unpack into?\n\ndef calculate(*args):\n    return type(args)",
        "options": ["<class 'list'>", "<class 'tuple'>", "<class 'dict'>", "<class 'set'>"],
        "correctOption": 1,
        "explanation": "Positional arguments gathered by '*args' are packaged into an immutable tuple."
    },
    {
        "id": "q5",
        "conceptId": "py-lambdas",
        "conceptName": "Lambda Expressions",
        "difficulty": "Intermediate",
        "question": "What will be printed by the following code snippet?\n\nfn = lambda x, y=2: x * y\nprint(fn(5))",
        "options": ["5", "10", "25", "TypeError: missing required argument 'y'"],
        "correctOption": 1,
        "explanation": "The lambda assigns default argument y=2. Calling fn(5) evaluates 5 * 2 = 10."
    },
    {
        "id": "q6",
        "conceptId": "py-dicts",
        "conceptName": "Dictionaries & Hashes",
        "difficulty": "Intermediate",
        "question": "What is the time complexity for key lookup in a standard Python dictionary in average conditions?",
        "options": ["O(1) Constant Time", "O(log n) Logarithmic Time", "O(n) Linear Time", "O(n log n)"],
        "correctOption": 0,
        "explanation": "Python dictionaries are implemented with dynamic hash tables providing O(1) average lookup."
    },
    {
        "id": "q7",
        "conceptId": "py-classes",
        "conceptName": "Classes & Instances",
        "difficulty": "Intermediate",
        "question": "What is the explicit purpose of the 'self' parameter as the first argument in a Python class method?",
        "options": [
            "It is a reserved Python keyword that allocates heap memory",
            "It explicitly passes the reference to the specific instance invoking the method",
            "It converts the class method into a static utility function",
            "It binds the method to the global namespace"
        ],
        "correctOption": 1,
        "explanation": "'self' explicitly passes the reference to the current class instance on which the method is called."
    },
    {
        "id": "q8",
        "conceptId": "py-inheritance",
        "conceptName": "Inheritance & super()",
        "difficulty": "Advanced",
        "question": "Consider this inheritance hierarchy. What is the output of Child().action()?\n\nclass Parent:\n    def action(self):\n        return 'Parent'\n\nclass Child(Parent):\n    def action(self):\n        return super().action() + ' -> Child'\n\nprint(Child().action())",
        "options": [
            "Child",
            "Parent",
            "Parent -> Child",
            "AttributeError: 'super' object has no attribute 'action'"
        ],
        "correctOption": 2,
        "explanation": "super().action() calls Parent.action() returning 'Parent', then concatenates ' -> Child' to output 'Parent -> Child'."
    },
    {
        "id": "q9",
        "conceptId": "py-inheritance",
        "conceptName": "Inheritance & MRO",
        "difficulty": "Advanced",
        "question": "In Python multiple inheritance, what algorithm does Python use to determine Method Resolution Order (MRO)?",
        "options": [
            "Depth-First Search (DFS) with left-to-right backtracking",
            "C3 Linearization algorithm",
            "Breadth-First Search (BFS) layer scan",
            "Dijkstra Shortest Path"
        ],
        "correctOption": 1,
        "explanation": "Python uses the C3 Linearization algorithm to compute a deterministic, monotonic Method Resolution Order."
    },
    {
        "id": "q10",
        "conceptId": "py-dunder",
        "conceptName": "Dunder Magic Methods",
        "difficulty": "Advanced",
        "question": "What is the primary architectural difference between __str__ and __repr__ dunder methods in Python?",
        "options": [
            "__str__ is for human-readable display; __repr__ is for unambiguous official representation (often valid Python code for developers)",
            "__repr__ cannot return string objects, while __str__ can",
            "__str__ is called by debugger consoles, while __repr__ is called by print()",
            "There is no difference; they are direct aliases in Python 3"
        ],
        "correctOption": 0,
        "explanation": "__str__ aims to be readable to end-users, whereas __repr__ aims to be unambiguous for developers and debugging."
    }
]

PYTHON_RETEST_QUESTIONS = [
    {
        "id": "rt1",
        "conceptId": "py-inheritance",
        "conceptName": "Inheritance & super() Methods",
        "difficulty": "Advanced",
        "question": "In the following snippet, how should the child constructor invoke the parent initializer?\n\nclass Vehicle:\n    def __init__(self, make):\n        self.make = make\n\nclass Car(Vehicle):\n    def __init__(self, make, model):\n        # Which line belongs here?\n        self.model = model",
        "options": [
            "super().__init__(make)",
            "Vehicle.init(self, make)",
            "super(self).__init__(make)",
            "this.super(make)"
        ],
        "correctOption": 0,
        "explanation": "super().__init__(make) is the standard, idiomatic syntax in Python 3 to invoke parent constructors."
    },
    {
        "id": "rt2",
        "conceptId": "py-inheritance",
        "conceptName": "Method Overriding",
        "difficulty": "Advanced",
        "question": "What will be the output of running this code?\n\nclass Base:\n    def value(self):\n        return 10\n\nclass Derived(Base):\n    def value(self):\n        return super().value() * 3\n\nobj = Derived()\nprint(obj.value())",
        "options": ["10", "30", "40", "TypeError"],
        "correctOption": 1,
        "explanation": "Derived overrides value(), calls super().value() returning 10, multiplies by 3 = 30."
    },
    {
        "id": "rt3",
        "conceptId": "py-inheritance",
        "conceptName": "isinstance & Polymorphism",
        "difficulty": "Intermediate",
        "question": "If Dog inherits from Animal, what does isinstance(Dog(), Animal) return?",
        "options": ["True", "False", "None", "TypeError"],
        "correctOption": 0,
        "explanation": "isinstance() checks inheritance chains, correctly evaluating subclasses as instances of parent classes."
    }
]

PYTHON_RECOMMENDATIONS = [
    {
        "id": "rec-py-1",
        "title": "Python OOP: Inheritance and Subclasses (Explained Visually)",
        "source": "YouTube • Corey Schafer",
        "duration": "22 min",
        "difficulty": "Intermediate",
        "badge": "Highest Impact",
        "embedId": "RSl87LqOXDE",
        "matchScore": 98,
        "whyRecommended": "Targeted directly at your single biggest gap (OOP 34%). Covers class hierarchy, method overriding, and super().",
        "learningObjective": "After this resource, you will understand how subclasses inherit attributes and methods from base classes using super().",
        "coveredConcepts": ["Class Inheritance", "super() Constructor", "Method Resolution Order (MRO)", "isinstance / issubclass"]
    },
    {
        "id": "rec-py-2",
        "title": "Inheritance vs Composition in Python — When to Use Each",
        "source": "YouTube • ArjanCodes",
        "duration": "18 min",
        "difficulty": "Intermediate",
        "badge": "Best Practice",
        "embedId": "0mcP8ZpUR38",
        "matchScore": 94,
        "whyRecommended": "Reinforces design patterns so you avoid brittle deep inheritance trees.",
        "learningObjective": "Learn clean software engineering practices and when to prefer composition over inheritance.",
        "coveredConcepts": ["Multiple Inheritance", "Composition Patterns", "Interface Design"]
    },
    {
        "id": "rec-py-3",
        "title": "Interactive OOP Coding Sandbox & Code Challenges",
        "source": "MERIQ Interactive Engine",
        "duration": "25 min",
        "difficulty": "Hands-on Practice",
        "badge": "Active Coding",
        "embedId": None,
        "matchScore": 91,
        "whyRecommended": "Apply inheritance and dunder methods immediately in simulated code editor challenges.",
        "learningObjective": "Implement parent-child classes and verify test cases pass with 100% accuracy.",
        "coveredConcepts": ["Inheritance Implementation", "Dunder Magic Methods", "Polymorphism"]
    }
]
