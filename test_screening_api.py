import httpx
import glob
import os
import json

def test_api():
    pdf_files = glob.glob(r"C:\Users\HP\.gemini\antigravity-ide\scratch\meriq-backend\resumes_dataset\pdf\*.pdf")[:5]
    print(f"Testing with {len(pdf_files)} PDF resumes:")
    for p in pdf_files:
        print("  -", os.path.basename(p))

    jd_text = """
    Job Title: Senior Python Backend Engineer
    Requirements:
    - 3+ years of experience with Python, FastAPI, Django
    - Hands-on expertise in PostgreSQL, Redis, and Docker
    - Microservices architecture and REST APIs
    - Bachelor's degree in Computer Science or related STEM field
    """

    files = []
    for p in pdf_files:
        files.append(('resumes', (os.path.basename(p), open(p, 'rb'), 'application/pdf')))

    data = {
        'jd_text': jd_text,
        'threshold': 70
    }

    url = "http://127.0.0.1:8000/api/resume/screen"
    response = httpx.post(url, data=data, files=files, timeout=30.0)
    print("API HTTP Status:", response.status_code)
    
    if response.status_code == 200:
        result = response.json()
        print("\n--- SUMMARY ---")
        print("Total Resumes:", result['summary']['totalResumes'])
        print("Shortlisted:", result['summary']['shortlistedCount'])
        print("Average Score:", result['summary']['averageMatchScore'], "%")
        print("Top Candidate:", result['summary']['topCandidate'])

        print("\n--- CANDIDATE RANKINGS ---")
        for cand in result['candidates']:
            print(f"Rank #{cand['rank']}: {cand['name']} ({cand['candidateId']}) — {cand['matchScore']}% [{cand['status']}]")
            print(f"  Skills: {', '.join(cand['skills'][:6])}")
            print(f"  Projects: {cand['numberOfProjects']} | Experience: {cand['yearsOfExperience']} yrs | Education: {cand['education']['degree']}")
            if cand['isShortlisted']:
                print("  Why Selected:")
                for w in cand.get('whySelected', []):
                    print(f"    • {w}")
            else:
                print(f"  Reason: {cand.get('rejectionReason')}")
            print("-" * 50)
    else:
        print("Error response:", response.text)

if __name__ == "__main__":
    test_api()
