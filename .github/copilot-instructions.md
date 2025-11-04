# GitHub Copilot Instructions

## Project Overview

This is a research project focused on character research functionality (人物リサーチ機能). The repository serves as a foundation for agent-based research tools.

## Technology Stack

- **Language**: JavaScript/Node.js
- **Environment**: Node.js runtime
- **Package Manager**: npm (or yarn)

## Coding Standards and Best Practices

### General Guidelines

1. **Code Style**
   - Follow JavaScript standard style conventions
   - Use consistent indentation (2 spaces recommended for JavaScript)
   - Use meaningful variable and function names
   - Add JSDoc comments for functions and complex logic

2. **File Organization**
   - Keep files focused and single-purpose
   - Use clear, descriptive file names
   - Organize code into logical directories

3. **Error Handling**
   - Always handle errors appropriately
   - Use try-catch blocks for async operations
   - Provide meaningful error messages
   - Don't silently swallow errors

4. **Security**
   - Never commit secrets, API keys, or credentials
   - Use environment variables for sensitive data
   - Follow security best practices for dependencies
   - Keep dependencies up to date

### JavaScript/Node.js Specific

1. **Modern JavaScript**
   - Use ES6+ features where appropriate
   - Prefer `const` and `let` over `var`
   - Use arrow functions for callbacks
   - Utilize async/await for asynchronous operations

2. **Modules**
   - Use ES modules or CommonJS consistently
   - Keep imports organized and grouped
   - Avoid circular dependencies

3. **Dependencies**
   - Only add dependencies when necessary
   - Prefer well-maintained packages
   - Check for security vulnerabilities before adding new dependencies

## Testing Requirements

1. **Test Coverage**
   - Write tests for new functionality
   - Follow existing test patterns in the repository
   - Test both happy paths and edge cases

2. **Test Organization**
   - Keep tests close to the code they test
   - Use descriptive test names
   - Follow AAA pattern (Arrange, Act, Assert)

## Documentation

1. **Code Comments**
   - Comment complex logic or non-obvious decisions
   - Keep comments up to date with code changes
   - Avoid obvious comments

2. **README Updates**
   - Update README.md when adding new features
   - Document setup and usage instructions
   - Include examples where helpful

3. **Commit Messages**
   - Use clear, descriptive commit messages
   - Follow conventional commit format when possible
   - Reference issue numbers when applicable

## Pull Request Guidelines

1. **Before Creating a PR**
   - Ensure code follows the style guidelines
   - Run linters and fix any issues
   - Run tests and ensure they pass
   - Update documentation if needed

2. **PR Description**
   - Clearly describe what changes were made and why
   - Include any relevant context
   - Reference related issues
   - List any breaking changes

## Agent-Specific Instructions

When working with GitHub Copilot coding agent:

1. **Scope of Work**
   - Focus on the specific issue assigned
   - Make minimal, targeted changes
   - Don't refactor unrelated code unless necessary

2. **Validation**
   - Always test changes before submitting
   - Verify existing functionality still works
   - Check for potential side effects

3. **Communication**
   - Ask for clarification if requirements are unclear
   - Report any blockers or issues encountered
   - Provide context in PR comments

## Common Patterns

1. **Async Operations**
   ```javascript
   // Prefer async/await
   async function fetchData() {
     try {
       const response = await api.getData();
       return response;
     } catch (error) {
       console.error('Failed to fetch data:', error);
       throw error;
     }
   }
   ```

2. **Error Handling**
   ```javascript
   // Always handle errors appropriately
   try {
     const result = await operation();
     return result;
   } catch (error) {
     logger.error('Operation failed', { error, context });
     throw new CustomError('Operation failed', { cause: error });
   }
   ```

## Resources

- Follow Node.js best practices
- Refer to JavaScript style guides (e.g., Airbnb, Standard)
- Keep security in mind with every change
- When in doubt, ask for review or clarification
