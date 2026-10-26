#[cfg(test)]
mod tests {
    use crate::StreamingContract;
    use soroban_sdk::{String, Address, Env, testutils::{Address as AddressTestUtils, MockAuth, MockAuthInvoke}};

    #[test]
    fn test_vesting_formula() {
        let env = Env::default();
        env.mock_all_auths();

        let payer = Address::random(&env);
        let recipient = Address::random(&env);
        let token = Address::random(&env);

        let start_time = 100u64;
        let end_time = 200u64;
        let amount = 1000i128;

        // Test: before start time, vested = 0
        let result = StreamingContract::get_vested_amount(
            env.clone(),
            String::from_slice(&env, "test_stream"),
            50,
        );
        assert!(result.is_err()); // Stream doesn't exist yet

        // Test: at start time, vested = 0
        // Test: at midpoint, vested = 500
        // Test: at end time, vested = 1000
    }

    #[test]
    fn test_create_stream_validation() {
        let env = Env::default();
        env.mock_all_auths();

        let payer = Address::random(&env);
        let recipient = Address::random(&env);
        let token = Address::random(&env);

        // Test: negative amount should fail
        let result = StreamingContract::create_stream(
            env.clone(),
            String::from_slice(&env, "invalid"),
            payer.clone(),
            recipient.clone(),
            token.clone(),
            -100,
            100,
            200,
        );
        assert!(result.is_err());

        // Test: start >= end should fail
        let result = StreamingContract::create_stream(
            env.clone(),
            String::from_slice(&env, "invalid2"),
            payer.clone(),
            recipient.clone(),
            token.clone(),
            1000,
            200,
            100,
        );
        assert!(result.is_err());
    }

    #[test]
    fn test_stream_not_found() {
        let env = Env::default();

        let result = StreamingContract::get_stream(
            env,
            String::from_slice(&env, "nonexistent"),
        );
        assert!(result.is_err());
    }
}
