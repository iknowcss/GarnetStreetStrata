# Garnet Street Strata Notification System

## Development

**Setup and dependencies**

```bash
# Create a virtual env (do only once)
python -m venv .venv

# Use the virtual env
source .venv/bin/activate

# Install the dev dependencies
pip install -r dev_requirements.txt
```

**Run tests**

Simply run

```bash
pytest
```

## Deployment

```bash
./cicd/cd-deploy.sh 
```
