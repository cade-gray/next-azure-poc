# Dockerized NextJS POC For Azure

## Why

This is for learning and practice and will address the following areas:

- NextJS / Meta Frameworks
- Docker
- CI/CD / GitHub Actions
- Azure
  - Azure Container Registry (ACR)
  - Azure Web Apps

## Notes

- Utilizes Next JS App Router
- Pulls from text file to mimic DB because lazy.
- Goal is to push to main branch which will trigger GH action to:
  - Build docker image
  - Push to ACR
- Azure Web App will be tied to that container so it should update when container is updated.
