# Trust Guard AI - API Testing Suite 🧪

This directory contains the Postman collection and environment files required to test the Trust Guard AI backend API.

## 📂 Files

- **`Trust_Guard_AI_API_Tests.postman_collection.json`**: The main test suite containing requests for Core Analysis, Edge Cases, Security, and Performance.
- **`Trust_Guard_AI_Environment.postman_environment.json`**: Configuration file defining the `{{base_url}}` variable.

## 🚀 How to Run Tests

1.  **Install Postman**: Download and install [Postman](https://www.postman.com/downloads/).
2.  **Import Files**:
    *   Open Postman.
    *   Click **Import** in the top left.
    *   Drag and drop both JSON files from this directory.
3.  **Select Environment**:
    *   In the top right dropdown, select **Trust_Guard_AI_Environment**.
    *   Ensure the `base_url` variable is set to your running backend (default: `http://localhost:8081`).
4.  **Run Collection**:
    *   Select the **Trust_Guard_AI_API_Tests** collection in the sidebar.
    *   Click **Run** (or "Run Collection").
    *   Click **Run Trust_Guard_AI_API_Tests**.

## 🧪 Test Coverage

| Folder | Purpose | Key Tests |
| :--- | :--- | :--- |
| **Core Analysis** | Validates main functionality. | Safe jobs get high scores; scams get low scores; company analysis structure. |
| **Edge Cases** | Checks input validation. | Short text (<50 chars); Missing fields. |
| **Security / Abuse** | Tests robustness against attacks. | Prompt injection robustness (no crash). |
| **Performance** | Ensures latency SLA. | Response time < 5000ms. |

## ⚠️ Notes
- **AI Variability**: Tests checking for specific text responses might fail occasionally due to LLM non-determinism. We test for logical ranges (e.g., `trust_score < 50`) to mitigate this.
- **Quotas**: Running these tests consumes Gemini API and FireCrawl quotas.
