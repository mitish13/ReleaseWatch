# ReleaseWatch

ReleaseWatch is a lightweight deployment visibility and service health dashboard
designed for ECS-based applications. It provides a unified view of deployments,
runtime health, and logs to help teams quickly answer:
"what changed and is it healthy?"

## Problem
In many teams, deployment history lives in CI/CD tools, service health in AWS ECS,
and logs in CloudWatch. This fragmentation makes it harder to correlate deployments
with runtime issues.

## Solution
ReleaseWatch centralizes:
- Deployment history from CI/CD pipelines
- ECS service health and task status
- CloudWatch metrics and logs

into a single, easy-to-use dashboard.

## Core Features (v1)
- Track deployments per service and environment
- Display ECS service health (Healthy / Degraded / Unhealthy)
- View recent CloudWatch metrics and logs
- Simple React-based dashboard

## Architecture (High Level)
- Frontend: React
- Backend: Node.js (Express)
- Runtime: AWS ECS (Fargate)
- Observability: CloudWatch
- CI/CD: GitHub Actions

## Status
 Initial project setup (v0.1)
