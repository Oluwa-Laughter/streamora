# Changelog

All notable changes to Streamora will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-10-26

### Added

- Initial MVP smart contract implementation with linear vesting
- Stream creation, withdrawal, and cancellation functions
- Soroban smart contract with comprehensive validation
- TypeScript SDK with client interface and utilities
- Complete React web application with all public and app pages
- Full documentation: architecture, protocol spec, SDK reference, deployment guide
- Responsive design system with Tailwind CSS
- Form validation and error handling
- Stream calculation utilities (vesting, withdrawable amounts)
- Token decimal conversion helpers
- Address validation functions
- Comprehensive test structure for contract and SDK

### Features

- ✅ Linear time-based vesting with integer arithmetic
- ✅ Stream creation with payer and recipient authorization
- ✅ Withdrawal mechanism with balance validation
- ✅ Stream cancellation with fund reallocation
- ✅ TypeScript SDK for contract interaction
- ✅ React dashboard for stream management
- ✅ Public landing page and documentation site
- ✅ Complete routing and navigation
- ✅ Responsive mobile design

### Documentation

- Architecture.md: System design and component overview
- Protocol-spec.md: Complete stream specification
- Deployment.md: Testnet and mainnet deployment guide
- Frontend.md: React application architecture
- SDK.md: TypeScript SDK API reference
- Security.md: Security assumptions and threat model

### Known Limitations

- Single recipient per stream (no multi-recipient)
- Linear vesting only (no curves or milestones)
- No stream pause/resume
- No multi-signature authorization
- Testnet only (mainnet requires audit)
- No real wallet integration yet
- No historical transaction data persistence

### Security

- All amounts use integer arithmetic (i128) to prevent rounding errors
- Authorization checks via Soroban require_auth()
- Time boundaries validated on all operations
- Token transfer failures cause transaction revert
- No private key storage in frontend

### Testing

- Contract unit tests for vesting formula
- SDK validation and calculation tests
- Frontend routing and component structure in place
- Integration test framework ready

---

## Unreleased (Roadmap)

### Planned for Beta

- Multi-recipient streams
- Batch stream creation
- Stream pause and resume
- Advanced vesting curves
- Historical transaction data
- Real Freighter wallet integration
- Enhanced dashboard analytics
- Mobile app

### Planned for Production

- Security audit completion
- Mainnet deployment
- Cross-chain bridges
- Decentralized governance
- Plugin ecosystem
- Institutional integrations

---

## Version Format

Versions follow [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

## Reporting Issues

Found a bug? [Report it on GitHub](https://github.com/Strea-mora/Streamora/issues)

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT. See LICENSE file.
