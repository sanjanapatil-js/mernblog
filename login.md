# 📊 Sample Mermaid Diagram

This is a basic flowchart created using Mermaid.

```mermaid
flowchart TD
    A[Start] --> B[Login Page]
    B -->|Valid Credentials| C[Dashboard]
    B -->|Invalid Credentials| D[Error Message]
    D --> B
    C --> E[View Data]
    C --> F[Edit Profile]
    E --> G[Logout]
    F --> G
    G --> A
