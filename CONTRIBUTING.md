# Contributing to Streamora

Thank you for your interest in contributing to Streamora! We welcome contributions of all kinds—bug reports, feature suggestions, documentation improvements, and code.

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally.
3. **Create a feature branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes** and test them thoroughly.
5. **Commit with clear messages** describing what and why.
6. **Push to your fork** and open a pull request.

## Code of Conduct

Be respectful and constructive. We are committed to providing a welcoming environment for all contributors.

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix.
- Include tests for new functionality.
- Update documentation if behavior changes.
- Ensure all checks pass before requesting review.
- Link related issues in the PR description.

## Testing

Before submitting a PR:

```bash
# Run contract tests
cd contracts && cargo test

# Run SDK tests
cd ../sdk && npm test

# Run frontend tests and linting
cd ../apps/web && npm test && npm run lint
```

## Reporting Issues

Please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Environment details (OS, Node version, Stellar network, etc.)

## Questions?

Open a discussion or issue on GitHub. We're happy to help!
