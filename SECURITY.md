# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.x.x   | Yes       |

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not** open a public issue.

Instead, email **contact@fyniti.co.uk** with:

1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested fix (if any)

We will acknowledge receipt within **48 hours** and provide an initial assessment within **5 business days**.

## Security Measures

- **Secret scanning** — enabled (GitHub)
- **Push protection** — enabled (blocks commits containing secrets)
- **Dependabot** — weekly dependency vulnerability scanning
- **Branch protection** — required CI checks + PR reviews before merge
- **No hardcoded secrets** — all keys via environment variables
