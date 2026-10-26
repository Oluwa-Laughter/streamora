#![no_std]

use soroban_sdk::{contract, contractimpl, Address, Env, String, Vec};

#[contract]
pub struct StreamingContract;

#[contractimpl]
impl StreamingContract {
    pub fn hello(env: Env, world: String) -> String {
        ["Hello", world.as_str()].concat()
    }
}

mod test;
