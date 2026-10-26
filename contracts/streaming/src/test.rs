#[cfg(test)]
mod tests {
    use crate::StreamingContract;
    use soroban_sdk::{String, Env};

    #[test]
    fn test_hello() {
        let env = Env::default();
        let contract = StreamingContract;
        let world = String::from_slice(&env, "World");
        let result = StreamingContract::hello(env, world);
        assert_eq!(result, "HelloWorld");
    }
}
