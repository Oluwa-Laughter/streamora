# Security

## Security Disclosure

If you discover a security vulnerability, please email security@streamora.dev instead of using the issue tracker. We will respond promptly and work with you to resolve the issue responsibly.

## Known Limitations

**Streamora is in alpha. Do not use with real funds or on mainnet without extensive auditing.**

### Current Assumptions

1. **No independent security audit** has been conducted. The code has not been reviewed by professional security researchers.
2. **Stellar/Soroban is evolving**. We track the official toolchain but recommend validating against the latest documentation.
3. **Token handling assumes standard 7-decimal tokens**. Non-standard decimals may require contract adjustments.
4. **No multi-signature or complex authorization** in the MVP.
5. **Stream cancellation policy** is defined in the contract spec but may change.

## Best Practices for Users

- **Test on testnet first** before deploying to mainnet.
- **Review the contract code** before authorizing large streams.
- **Keep seed phrases secure**. Never share or paste them into applications.
- **Monitor transactions** closely, especially on mainnet.

## Reporting Security Issues

1. Do not open a public issue for security vulnerabilities.
2. Email: security@streamora.dev
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if applicable)

Thank you for helping keep Streamora secure.
