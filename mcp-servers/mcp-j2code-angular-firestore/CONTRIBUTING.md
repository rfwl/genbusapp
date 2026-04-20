# Contributing to MCP J2Code Angular Firestore

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please treat all community members with respect.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/genbusapp.git
   cd genbusapp/mcp-j2code-angular-firestore
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. **Make your changes:**
   - Follow TypeScript best practices
   - Use meaningful commit messages
   - Keep changes focused and atomic

2. **Build and test:**
   ```bash
   npm run build
   npm start
   ```

3. **Test your changes locally:**
   - Ensure no console errors
   - Test with various JSON schemas
   - Verify API interactions work correctly

## Code Style

- Use TypeScript with strict mode enabled
- Follow ESNext conventions
- Add comments for complex logic
- Keep functions focused and concise

## Commit Messages

Use clear, descriptive commit messages:
- `fix: resolve issue with JSON validation`
- `feat: add support for custom API URLs`
- `docs: update README with new examples`
- `refactor: simplify error handling`

## Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure code compiles:**
   ```bash
   npm run build
   ```
4. **Create a descriptive PR** with:
   - Clear title and description
   - Reference to related issues
   - List of changes made

5. **Wait for review:**
   - Maintainers will review your changes
   - Address any feedback or questions
   - Be patient and respectful

## Reporting Issues

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Node version, etc.)
- Error messages or logs

## Feature Requests

When requesting features, please:
- Describe the use case
- Explain the benefit
- Provide examples if possible
- Suggest implementation approach if applicable

## Questions?

Feel free to:
- Open an issue with the `question` label
- Check existing documentation
- Contact the maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Acknowledgments

Thank you for contributing to make this project better!
