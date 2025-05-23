# Contributing to AniList GraphQL API Wrapper

Thank you for considering contributing to this project! Here are some guidelines to help you get started.

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in the Issues section
- Use the bug report template when creating a new issue
- Include as much detail as possible:
  - Steps to reproduce
  - Expected behavior
  - Actual behavior
  - Environment details (Node.js version, etc.)
  - Code samples or test cases that demonstrate the issue

### Suggesting Enhancements

- Check if the enhancement has already been suggested in the Issues section
- Use the feature request template when creating a new issue
- Clearly describe the problem and solution
- Explain why this enhancement would be useful to most users

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Write tests for your changes
4. Ensure all tests pass
5. Update documentation if necessary
6. Submit a pull request

## Development Setup

1. Clone your fork of the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Build the project: `npm run build`

## Coding Guidelines

- Follow the existing code style
- Write clear, descriptive commit messages
- Add or update tests for all changes
- Update documentation for all public APIs
- Keep pull requests focused on a single topic

## TypeScript Guidelines

- Use proper TypeScript types
- Avoid using `any` when possible
- Document public APIs with JSDoc comments
- Follow the existing project structure

## Testing Guidelines

- Write unit tests for all new functionality
- Ensure all tests pass before submitting a pull request
- Mock external dependencies in tests

## Documentation Guidelines

- Update the README.md if your changes affect usage
- Document all public APIs with JSDoc comments
- Provide examples for new features

## Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for changes to tests
- `refactor:` for refactoring code without changing functionality
- `chore:` for changes to the build process, tooling, etc.

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the documentation with details of changes if applicable
3. The PR should work on the latest Node.js LTS version
4. PRs will be merged after review and approval

## Release Process

1. Update the version in package.json according to [Semantic Versioning](https://semver.org/)
2. Update the CHANGELOG.md
3. Create a new GitHub release with the version number
4. The CI/CD pipeline will automatically publish to npm

Thank you for contributing!
