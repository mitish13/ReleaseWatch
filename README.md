# ReleaseWatch

ReleaseWatch is a lightweight ECS service health and deployment visibility dashboard that provides a fast, decision-ready view of containerized workloads running on AWS ECS.

Instead of navigating multiple AWS Console pages, ReleaseWatch aggregates ECS service state and deployment status into a single, auto-refreshing dashboard.

---

## 🚀 Problem Statement

After deploying a service to AWS ECS, engineers typically need to answer questions like:
- Is my service running as expected?
- Is a deployment currently in progress?
- Did a deployment fail or stabilize?
- Are any services degraded right now?

Answering these questions in the AWS Console requires multiple clicks and manual interpretation of raw metrics.

**ReleaseWatch reduces time-to-confidence after deployments by translating ECS control-plane data into clear health and deployment signals.**

---

## 🧠 Core Features (v1)

### ECS Service Health
- Aggregates all ECS services in a cluster
- Computes service health states:
  - `HEALTHY`
  - `DEGRADED`
  - `UNHEALTHY`
- Based on desired vs running task counts and deployment state

### Deployment Awareness
- Detects ECS deployment lifecycle:
  - `STABLE`
  - `DEPLOYING`
  - `FAILED`
- Reads ECS-native rollout metadata (not CI/CD-specific)

### Unified Dashboard
- React-based frontend
- Auto-refresh polling (no manual reloads)
- Single-page view of all services
- Clear, opinionated status indicators

---

## 🏗 Architecture Overview

### Backend
- Node.js + Express
- Layered architecture:
  - **Providers**: AWS SDK integration (ECS)
  - **Services**: Business logic & interpretation
  - **Controllers**: Request orchestration
  - **Routes**: API surface
- AWS SDK v3 (read-only ECS APIs)
- IAM-based authentication via AWS credential provider chain

### Frontend
- React (Vite)
- Auto-refresh polling
- Stateless UI consuming backend APIs
- Designed for S3 + CloudFront hosting

---

## 🔐 Authentication & Security

- No AWS credentials are hardcoded
- AWS SDK uses the credential provider chain:
  - Local development: AWS CLI credentials
  - Production: IAM Task Role (planned)
- Read-only ECS permissions (least privilege)

---

## 📡 API Endpoints

### Health Check
GET /health
Returns a basic liveness response for infrastructure checks.

### Services Overview
GET /ecsServices

Example response:
```json
[
  {
    "serviceName": "codebook-backend-service",
    "desiredCount": 2,
    "runningCount": 1,
    "pendingCount": 0,
    "healthStatus": "DEGRADED",
    "deploymentStatus": "DEPLOYING"
  }
]
```
## Local Development
### Prerequisites
- Node.js 18+
- Already has a ECS Cluster
- AWS CLI configured with ECS read permissions
- Access to an AWS ECS cluster
- .env folder inside `/backend` dir with below variables:
  - AWS_REGION
  - PORT
  - AWS_ECS_CLUSTER_NAME

### Backend
```
cd backend
npm install
npm run start
``` 
### Frontend
```
cd frontend
npm install
npm run dev
```

## Design decisions
- ECS control-plane data first: v1 intentionally avoids CloudWatch to reduce cost and complexity
- Backend abstraction: Frontend never calls AWS APIs directly
- Opinionated health logic: Converts raw infrastructure data into actionable signals
- CI/CD agnostic: Works regardless of whether deployments are triggered by GitHub Actions, CLI, or Console

## Roadmap
- Planned future enhancements:
- CI/CD deployment correlation (GitHub Actions metadata)
- CloudWatch metrics integration (CPU / memory)
- Multi-cluster and multi-account support
- Alerting and notifications
- Authentication & role-based access