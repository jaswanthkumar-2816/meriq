"""
1,000 High-Quality Resume & PDF Dataset Generator for MERIQ
Generates 1,000 unique, structured resumes across 12 engineering domains with:
- PDF files in ./resumes_dataset/pdf/
- Consolidated CSV in ./resumes_dataset/resumes_index.csv
- Consolidated JSON in ./resumes_dataset/resumes_index.json
"""
import os
import random
import json
import csv
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

FIRST_NAMES = [
    "Aarav", "Aditi", "Rohan", "Ananya", "Vikram", "Pooja", "Rahul", "Neha", "Siddharth", "Kavya",
    "Alex", "Jordan", "Taylor", "Morgan", "Sam", "Chris", "Pat", "Riley", "Casey", "Avery",
    "Daniel", "Sophia", "Michael", "Emma", "David", "Olivia", "James", "Ava", "William", "Isabella",
    "Liam", "Mia", "Benjamin", "Charlotte", "Ethan", "Amelia", "Alexander", "Harper", "Sebastian", "Evelyn",
    "Arjun", "Deepika", "Karan", "Meera", "Varun", "Shruti", "Akash", "Divya", "Gaurav", "Sneha",
    "Lucas", "Zoe", "Mason", "Chloe", "Logan", "Lily", "Jacob", "Grace", "Oliver", "Hannah",
    "Pranav", "Ishaan", "Riya", "Aditya", "Tanvi", "Nikhil", "Anjali", "Harsh", "Simran", "Yash",
    "Noah", "Ella", "Jackson", "Aria", "Aiden", "Scarlett", "Matthew", "Victoria", "Henry", "Madison"
]

LAST_NAMES = [
    "Sharma", "Verma", "Patel", "Reddy", "Iyer", "Nair", "Gupta", "Malhotra", "Kapoor", "Chopra",
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
    "Rao", "Bose", "Menon", "Joshi", "Deshmukh", "Singhania", "Mukherjee", "Chatterjee", "Kulkarni", "Bhat",
    "Dubois", "Müller", "Schneider", "Fischer", "Weber", "Takahashi", "Watanabe", "Tanaka", "Chen", "Zhang"
]

DOMAINS = [
    {
        "role": "Python Backend Engineer",
        "category": "Backend",
        "skills": ["Python", "FastAPI", "Django", "PostgreSQL", "Redis", "Docker", "Celery", "REST APIs", "AWS"],
        "certifications": ["AWS Certified Developer - Associate", "PCEP – Certified Entry-Level Python Programmer", "Docker Certified Associate"],
        "companies": ["Stripe", "Datadog", "Razorpay", "Swiggy", "Zomato", "Twilio", "Revolut", "FinTech Labs"],
        "projects": [
            "High-Throughput Microservice Gateway in FastAPI & Redis",
            "Distributed Task Pipeline for Real-Time Financial Ledger Processing",
            "Event-Driven Telemetry Aggregation Service with Celery & RabbitMQ"
        ]
    },
    {
        "role": "Full Stack React & Node Developer",
        "category": "Full Stack",
        "skills": ["React 18", "TypeScript", "Node.js", "Express", "Next.js", "Tailwind CSS", "MongoDB", "GraphQL"],
        "certifications": ["Meta Certified Front-End Developer", "OpenJS Node.js Application Developer (JAD)"],
        "companies": ["Shopify", "Airbnb", "Vercel", "Coinbase", "Notion", "Postman", "Freshworks"],
        "projects": [
            "Real-Time Collaborative Document Canvas with WebSockets & React",
            "Serverless E-Commerce Headless Storefront using Next.js & Stripe",
            "Dynamic Analytics Dashboard with Recharts & Tailwind Design System"
        ]
    },
    {
        "role": "Data Scientist & AI/ML Engineer",
        "category": "AI / ML",
        "skills": ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "NLP", "Pandas", "Computer Vision", "MLOps", "LLMs"],
        "certifications": ["TensorFlow Developer Certificate", "AWS Certified Machine Learning - Specialty", "DeepLearning.AI ML Specialization"],
        "companies": ["DeepMind", "OpenAI Ecosystem", "Fractal Analytics", "Mu Sigma", "NVIDIA", "Meta AI"],
        "projects": [
            "Adaptive Retrieval-Augmented Generation (RAG) System using LangChain & Milvus",
            "Multi-Modal Vision Transformer for Medical Imaging Anomaly Detection",
            "Customer Churn Forecasting Engine using XGBoost & SHAP Explainability"
        ]
    },
    {
        "role": "Cloud & DevOps Solutions Architect",
        "category": "Cloud / DevOps",
        "skills": ["AWS", "Kubernetes", "Terraform", "Docker", "CI/CD", "Prometheus", "Grafana", "Ansible", "Linux"],
        "certifications": ["AWS Certified Solutions Architect - Professional", "Certified Kubernetes Administrator (CKA)", "HashiCorp Certified: Terraform Associate"],
        "companies": ["Amazon Web Services", "Cloudflare", "HashiCorp", "Cisco", "Red Hat", "GitLab"],
        "projects": [
            "Zero-Downtime Multi-Region Kubernetes Cluster Deployment with ArgoCD",
            "Infrastructure-as-Code Enterprise Baseline across 50+ AWS Accounts via Terraform",
            "Automated GitOps Observability Pipeline using Prometheus, Loki & Grafana"
        ]
    },
    {
        "role": "SQL & Data Platform Engineer",
        "category": "Data Engineering",
        "skills": ["PostgreSQL", "Apache Spark", "Snowflake", "dbt", "Airflow", "Kafka", "Data Warehousing", "Python", "SQL"],
        "certifications": ["Snowflake SnowPro Core Certification", "Databricks Certified Data Engineer Associate"],
        "companies": ["Uber Data", "Grab", "JPMorgan Chase", "Palantir", "Snowflake", "Intuit"],
        "projects": [
            "Near-Real-Time Lakehouse Ingestion Engine handling 50M Events/Day with Spark",
            "Automated dbt Data Modeling & Data Quality Verification Suite in Snowflake",
            "Event-Driven CDC Pipeline with Debezium, Kafka & ClickHouse"
        ]
    },
    {
        "role": "Cybersecurity & Security Operations Engineer",
        "category": "Cybersecurity",
        "skills": ["SIEM", "Splunk", "Penetration Testing", "Network Security", "Wireshark", "Python", "OWASP Top 10", "SOC"],
        "certifications": ["CompTIA Security+", "Certified Ethical Hacker (CEH)", "Offensive Security Certified Professional (OSCP)"],
        "companies": ["Palo Alto Networks", "CrowdStrike", "Mandiant", "Deloitte Cyber", "Kroll", "Cisco Talos"],
        "projects": [
            "Automated Threat Intelligence Hunting & Incident Response Playbook in Splunk",
            "Cloud Security Posture Management & Identity Governance Engine for AWS IAM",
            "Web Application Penetration Testing Framework for API Vulnerability Discovery"
        ]
    },
    {
        "role": "Frontend Performance Specialist",
        "category": "Frontend",
        "skills": ["TypeScript", "React", "Vue.js", "WebGL", "Three.js", "Web Workers", "Performance Optimization", "CSS3"],
        "certifications": ["Google Mobile Web Specialist", "Meta Front-End Professional"],
        "companies": ["Canva", "Figma", "Spotify", "Epic Games", "Linear", "Framer"],
        "projects": [
            "Interactive 3D Data Visualization Studio powered by Three.js and WebGL",
            "Sub-second Core Web Vitals Performance Re-architecture for 10M MAU Portal",
            "Custom Micro-Frontend Architecture with Module Federation & Shared State"
        ]
    },
    {
        "role": "Mobile Applications Engineer",
        "category": "Mobile",
        "skills": ["Flutter", "Dart", "React Native", "Swift", "Kotlin", "Firebase", "Mobile CI/CD", "State Management"],
        "certifications": ["Google Associate Android Developer", "iOS App Development Certificate"],
        "companies": ["Uber", "DoorDash", "Duolingo", "Revolut", "Robinhood", "CRED"],
        "projects": [
            "Cross-Platform FinTech Banking App with Biometric Auth & Offline Sync in Flutter",
            "High-Cadence Ride Hailing Driver Companion App in Swift & Kotlin Native",
            "Social Audio Streaming App with WebRTC and Background Audio Engine"
        ]
    },
    {
        "role": "Java Enterprise & Distributed Systems Architect",
        "category": "Enterprise Systems",
        "skills": ["Java 21", "Spring Boot", "Microservices", "Kafka", "Hibernate", "PostgreSQL", "Docker", "gRPC"],
        "certifications": ["Oracle Certified Professional: Java SE Developer", "Spring Certified Professional"],
        "companies": ["Goldman Sachs", "Oracle", "Morgan Stanley", "Visa", "Mastercard", "Salesforce"],
        "projects": [
            "Ultra-Low Latency Payment Settlement Engine with Spring Cloud and Kafka",
            "Multi-Tenant SaaS Authorization & Tenancy Engine using Spring Security and OAuth2",
            "High-Throughput Order Matching Gateway with Java Virtual Threads (Project Loom)"
        ]
    },
    {
        "role": "Embedded Systems & IoT Firmware Engineer",
        "category": "Hardware / IoT",
        "skills": ["C/C++", "Embedded Linux", "FreeRTOS", "ARM Cortex", "MQTT", "I2C/SPI/UART", "PCB Debugging", "Python"],
        "certifications": ["Arm Accredited Engineer (AAE)", "Embedded Linux Developer Certificate"],
        "companies": ["Qualcomm", "Texas Instruments", "Bosch", "Tesla", "STMicroelectronics", "Intel"],
        "projects": [
            "Low-Power BLE Sensor Node Firmware for Industrial Telemetry in FreeRTOS",
            "Automotive CAN-Bus Telemetry Gateway with Embedded Linux and Secure Boot",
            "Smart Grid Power Monitoring Device with MQTT & Hardware Cryptographic Accelerator"
        ]
    },
    {
        "role": "Blockchain & Smart Contract Engineer",
        "category": "Web3 / Blockchain",
        "skills": ["Solidity", "Rust", "Ethereum", "Hardhat", "Ethers.js", "Web3.js", "IPFS", "Smart Contract Security"],
        "certifications": ["Certified Ethereum Developer", "Blockchain Council Certified Smart Contract Developer"],
        "companies": ["ConsenSys", "Polygon", "Chainlink", "Uniswap Labs", "OpenSea", "Solana Labs"],
        "projects": [
            "Automated Market Maker (AMM) Liquidity Protocol with Subgraph Indexing",
            "Decentralized Oracle Aggregation System for Real-World Asset Verification",
            "Non-Custodial Multi-Signature Governance Vault with Gas Optimization"
        ]
    },
    {
        "role": "Site Reliability Engineer (SRE)",
        "category": "DevOps / Reliability",
        "skills": ["Go", "Python", "Kubernetes", "OpenTelemetry", "Chaos Engineering", "Incident Management", "Terraform", "Linux Kernel"],
        "certifications": ["Certified Kubernetes Security Specialist (CKS)", "Google Cloud Professional DevOps Engineer"],
        "companies": ["Netflix", "Google SRE", "Meta Infra", "Apple", "Microsoft Azure", "HubSpot"],
        "projects": [
            "Chaos Mesh Automated Resiliency Testing Pipeline across 200+ Microservices",
            "Distributed Tracing & Service Level Objective (SLO) Monitoring via OpenTelemetry",
            "Automated Self-Healing Pod Auto-Scaler with Custom Prometheus Metrics"
        ]
    }
]

UNIVERSITIES = [
    "Stanford University", "Massachusetts Institute of Technology (MIT)", "UC Berkeley",
    "Carnegie Mellon University", "IIT Bombay", "IIT Delhi", "IIT Madras", "BITS Pilani",
    "National University of Singapore", "University of Cambridge", "University of Oxford",
    "Georgia Institute of Technology", "University of Illinois Urbana-Champaign", "ETH Zurich",
    "University of Toronto", "University of Waterloo", "Purdue University", "University of Washington",
    "IIIT Hyderabad", "NIT Trichy", "Delhi Technological University (DTU)", "Vellore Institute of Technology (VIT)",
    "Harvard University", "Princeton University", "UCLA", "Imperial College London", "TUM Munich"
]

DEGREES = [
    "B.Tech in Computer Science and Engineering",
    "B.S. in Computer Science",
    "M.S. in Software Engineering",
    "M.Tech in Data Science & Artificial Intelligence",
    "B.E. in Information Technology",
    "M.S. in Electrical and Computer Engineering",
    "B.S. in Cybersecurity and Information Assurance",
    "M.S. in Robotics and Autonomous Systems"
]

LOCATIONS = [
    "San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX", "Boston, MA",
    "Bengaluru, India", "Hyderabad, India", "Pune, India", "London, UK", "Berlin, Germany",
    "Toronto, Canada", "Singapore", "Zurich, Switzerland", "Sydney, Australia", "Tokyo, Japan",
    "Chicago, IL", "Denver, CO", "Amsterdam, Netherlands", "Dublin, Ireland", "Stockholm, Sweden"
]

def generate_candidate_data(index):
    first = random.choice(FIRST_NAMES)
    last = random.choice(LAST_NAMES)
    name = f"{first} {last}"
    email = f"{first.lower()}.{last.lower()}{random.randint(10, 999)}@example.com"
    phone = f"+1 ({random.randint(200, 999)}) {random.randint(200, 999)}-{random.randint(1000, 9999)}"
    location = random.choice(LOCATIONS)
    
    domain_spec = DOMAINS[index % len(DOMAINS)]
    yoe = random.randint(1, 12)
    grad_year = 2026 - yoe
    
    degree_name = random.choice(DEGREES)
    education = {
        "degree": degree_name,
        "university": random.choice(UNIVERSITIES),
        "year": f"{grad_year - 4} - {grad_year}",
        "gpa": f"{round(random.uniform(3.4, 4.0), 2)} / 4.0" if "B.S." in degree_name or "M.S." in degree_name else f"{round(random.uniform(7.8, 9.8), 2)} / 10.0"
    }

    selected_skills = random.sample(domain_spec["skills"], min(len(domain_spec["skills"]), random.randint(6, 8)))
    selected_cert = random.choice(domain_spec["certifications"])
    
    # Work Experience
    company1 = random.choice(domain_spec["companies"])
    company2 = random.choice([c for c in domain_spec["companies"] if c != company1])
    
    experiences = [
        {
            "title": f"Senior {domain_spec['role']}" if yoe >= 5 else domain_spec['role'],
            "company": company1,
            "duration": f"2023 - Present ({2026 - 2023} yrs)",
            "bullets": [
                f"Spearheaded architectural redesign of core {selected_skills[0]} service, reducing latency by {random.randint(25, 60)}%.",
                f"Led a squad of {random.randint(3, 8)} engineers delivering scalable microservices processing {random.randint(5, 50)}M requests/day.",
                f"Implemented automated testing & CI/CD pipelines increasing deployment frequency by {random.randint(30, 75)}%."
            ]
        }
    ]
    
    if yoe >= 3:
        experiences.append({
            "title": f"Associate {domain_spec['role']}",
            "company": company2,
            "duration": f"{grad_year} - 2023",
            "bullets": [
                f"Designed and maintained {selected_skills[1]} data endpoints with {random.randint(95, 99)}% SLA uptime.",
                f"Optimized database indexing and caching layers using {selected_skills[2]} saving ${random.randint(10, 45)}k/yr cloud costs."
            ]
        })

    # Projects
    proj1 = random.choice(domain_spec["projects"])
    proj2 = random.choice([p for p in domain_spec["projects"] if p != proj1])
    projects = [
        {
            "name": proj1,
            "tech": ", ".join(selected_skills[:4]),
            "description": f"Engineered end-to-end production solution leveraging {selected_skills[0]} and {selected_skills[1]} with full test automation."
        },
        {
            "name": proj2,
            "tech": ", ".join(selected_skills[2:6]),
            "description": f"Architected high-resilience system integrating {selected_skills[2]} with 99.9% uptime."
        }
    ]

    meriq_score = random.randint(68, 98)
    meriq_status = "Mastered" if meriq_score >= 88 else "Strong Candidate" if meriq_score >= 75 else "Developing"

    return {
        "candidateId": f"RES-{index+1:04d}",
        "name": name,
        "email": email,
        "phone": phone,
        "location": location,
        "role": domain_spec["role"],
        "category": domain_spec["category"],
        "yearsOfExperience": yoe,
        "education": education,
        "skills": selected_skills,
        "certification": selected_cert,
        "experiences": experiences,
        "projects": projects,
        "meriqScore": meriq_score,
        "meriqStatus": meriq_status
    }

def create_resume_pdf(candidate, output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom Luxury Gold Palette
    gold_color = colors.HexColor("#b08422")
    dark_color = colors.HexColor("#1a1a20")
    charcoal = colors.HexColor("#2d3748")

    name_style = ParagraphStyle(
        'CandidateName',
        parent=styles['Heading1'],
        fontSize=20,
        leading=24,
        textColor=dark_color,
        fontName="Helvetica-Bold",
        spaceAfter=2
    )

    role_style = ParagraphStyle(
        'CandidateRole',
        parent=styles['Normal'],
        fontSize=11,
        leading=14,
        textColor=gold_color,
        fontName="Helvetica-Bold",
        spaceAfter=6
    )

    contact_style = ParagraphStyle(
        'ContactInfo',
        parent=styles['Normal'],
        fontSize=8.5,
        leading=11,
        textColor=charcoal,
        fontName="Helvetica"
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontSize=11,
        leading=14,
        textColor=dark_color,
        fontName="Helvetica-Bold",
        spaceBefore=8,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'BodyText',
        parent=styles['Normal'],
        fontSize=8.5,
        leading=12,
        textColor=charcoal,
        fontName="Helvetica"
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontSize=8.5,
        leading=11.5,
        textColor=charcoal,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2
    )

    story = []

    # Header: Name & Target Role
    story.append(Paragraph(candidate["name"], name_style))
    story.append(Paragraph(f"{candidate['role']} • {candidate['yearsOfExperience']} Years Experience • MERIQ Index: {candidate['meriqScore']}% ({candidate['meriqStatus']})", role_style))
    
    # Contact Row
    contact_line = f"📧 {candidate['email']}  |  📱 {candidate['phone']}  |  📍 {candidate['location']}"
    story.append(Paragraph(contact_line, contact_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=gold_color, spaceAfter=8))

    # Technical Skills
    story.append(Paragraph("TECHNICAL PROFICIENCIES & CERTIFICATIONS", section_heading))
    skills_line = f"<b>Core Technologies:</b> {', '.join(candidate['skills'])}<br/><b>Verified Certification:</b> {candidate['certification']}"
    story.append(Paragraph(skills_line, body_style))
    story.append(Spacer(1, 6))

    # Professional Experience
    story.append(Paragraph("PROFESSIONAL WORK EXPERIENCE", section_heading))
    for exp in candidate["experiences"]:
        exp_header = f"<b>{exp['title']}</b> — <i>{exp['company']}</i> <font color='#718096'>({exp['duration']})</font>"
        story.append(Paragraph(exp_header, body_style))
        for bullet in exp["bullets"]:
            story.append(Paragraph(f"• {bullet}", bullet_style))
        story.append(Spacer(1, 4))

    # Key Engineering Projects
    story.append(Paragraph("NOTABLE TECHNICAL PROJECTS", section_heading))
    for proj in candidate["projects"]:
        proj_line = f"<b>{proj['name']}</b> [{proj['tech']}]<br/><font color='#4a5568'>{proj['description']}</font>"
        story.append(Paragraph(proj_line, body_style))
        story.append(Spacer(1, 4))

    # Education
    story.append(Paragraph("EDUCATION & CREDENTIALS", section_heading))
    edu = candidate["education"]
    edu_line = f"<b>{edu['degree']}</b><br/>{edu['university']} — {edu['year']} (Score: {edu['gpa']})"
    story.append(Paragraph(edu_line, body_style))
    story.append(Spacer(1, 6))

    # Footer note
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#e2e8f0"), spaceBefore=6, spaceAfter=4))
    footer_text = f"<font size='7' color='#a0aec0'>MERIQ Adaptive Candidate Profile • Candidate ID: {candidate['candidateId']} • Academic Dataset</font>"
    story.append(Paragraph(footer_text, body_style))

    doc.build(story)

def generate_all_1000_resumes():
    random.seed(42)
    output_dir = os.path.join(os.path.dirname(__file__), "resumes_dataset")
    pdf_dir = os.path.join(output_dir, "pdf")
    os.makedirs(pdf_dir, exist_ok=True)
    
    # Clean previous PDFs
    for f in os.listdir(pdf_dir):
        if f.endswith(".pdf"):
            try:
                os.remove(os.path.join(pdf_dir, f))
            except Exception:
                pass

    candidates = []
    TOTAL_COUNT = 1000
    print(f"Generating {TOTAL_COUNT} candidate resumes into {output_dir}...")

    for i in range(TOTAL_COUNT):
        c = generate_candidate_data(i)
        candidates.append(c)
        pdf_path = os.path.join(pdf_dir, f"{c['candidateId']}_{c['name'].replace(' ', '_')}.pdf")
        create_resume_pdf(c, pdf_path)
        if (i + 1) % 200 == 0:
            print(f"Generated {i + 1} / {TOTAL_COUNT} PDF resumes...")

    # Save JSON index
    json_path = os.path.join(output_dir, "resumes_index.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(candidates, f, indent=2)

    # Save CSV index
    csv_path = os.path.join(output_dir, "resumes_index.csv")
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["CandidateID", "Name", "Role", "Category", "YearsOfExperience", "Email", "Phone", "Location", "University", "Degree", "Skills", "Certification", "MERIQ_Score", "MERIQ_Status", "PDF_File"])
        for c in candidates:
            pdf_filename = f"{c['candidateId']}_{c['name'].replace(' ', '_')}.pdf"
            writer.writerow([
                c["candidateId"],
                c["name"],
                c["role"],
                c["category"],
                c["yearsOfExperience"],
                c["email"],
                c["phone"],
                c["location"],
                c["education"]["university"],
                c["education"]["degree"],
                ", ".join(c["skills"]),
                c["certification"],
                c["meriqScore"],
                c["meriqStatus"],
                pdf_filename
            ])

    print(f"[SUCCESS] Successfully generated {TOTAL_COUNT} PDF resumes and structured index files!")
    print(f"[DIR] PDF Directory: {pdf_dir}")
    print(f"[CSV] CSV Index: {csv_path}")
    print(f"[JSON] JSON Index: {json_path}")

if __name__ == "__main__":
    generate_all_1000_resumes()
