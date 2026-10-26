#![no_std]

use soroban_sdk::{
    contract, contractimpl, Address, Env, String, Vec, symbol_short, Symbol,
    storage::Persistent, token, ConversionError,
};
use core::cmp::{max, min};

#[derive(Clone)]
pub struct Stream {
    pub id: String,
    pub payer: Address,
    pub recipient: Address,
    pub token: Address,
    pub amount: i128,
    pub start_time: u64,
    pub end_time: u64,
    pub withdrawn: i128,
    pub is_cancelled: bool,
}

#[contract]
pub struct StreamingContract;

#[contractimpl]
impl StreamingContract {
    /// Create a new payment stream
    pub fn create_stream(
        env: Env,
        stream_id: String,
        payer: Address,
        recipient: Address,
        token: Address,
        amount: i128,
        start_time: u64,
        end_time: u64,
    ) -> Result<(), String> {
        // Validate inputs
        if amount <= 0 {
            return Err(String::from_slice(&env, "Amount must be positive"));
        }

        if start_time >= end_time {
            return Err(String::from_slice(&env, "Start time must be before end time"));
        }

        if end_time <= env.ledger().timestamp() {
            return Err(String::from_slice(&env, "End time must be in the future"));
        }

        // Check authorization
        payer.require_auth();

        // Initialize stream
        let stream = Stream {
            id: stream_id.clone(),
            payer: payer.clone(),
            recipient: recipient.clone(),
            token: token.clone(),
            amount,
            start_time,
            end_time,
            withdrawn: 0,
            is_cancelled: false,
        };

        // Store stream
        let key = Symbol::new(&env, "stream");
        env.storage().persistent().set(&stream_id, &stream);

        // Transfer tokens from payer to contract
        let token_client = token::Client::new(&env, &token);
        token_client.transfer(
            &payer,
            &env.current_contract_address(),
            &amount,
        );

        Ok(())
    }

    /// Get stream information
    pub fn get_stream(env: Env, stream_id: String) -> Result<Stream, String> {
        let stream: Option<Stream> = env
            .storage()
            .persistent()
            .get(&stream_id)
            .unwrap_or(None);

        match stream {
            Some(s) => Ok(s),
            None => Err(String::from_slice(&env, "Stream not found")),
        }
    }

    /// Calculate vested amount at a specific time
    pub fn get_vested_amount(
        env: Env,
        stream_id: String,
        at_time: u64,
    ) -> Result<i128, String> {
        let stream = Self::get_stream(env.clone(), stream_id)?;

        if stream.is_cancelled {
            return Ok(0);
        }

        if at_time <= stream.start_time {
            return Ok(0);
        }

        if at_time >= stream.end_time {
            return Ok(stream.amount);
        }

        let vested = stream.amount * (at_time - stream.start_time) as i128
            / (stream.end_time - stream.start_time) as i128;

        Ok(vested)
    }

    /// Get withdrawable amount (vested - already withdrawn)
    pub fn get_withdrawable_amount(
        env: Env,
        stream_id: String,
    ) -> Result<i128, String> {
        let stream = Self::get_stream(env.clone(), stream_id)?;
        let current_time = env.ledger().timestamp();
        let vested = Self::get_vested_amount(env, stream_id, current_time)?;
        Ok(max(0, vested - stream.withdrawn))
    }

    /// Withdraw available funds
    pub fn withdraw(
        env: Env,
        stream_id: String,
        amount: i128,
    ) -> Result<(), String> {
        let mut stream = Self::get_stream(env.clone(), stream_id.clone())?;

        // Check authorization
        stream.recipient.require_auth();

        if stream.is_cancelled {
            return Err(String::from_slice(&env, "Stream is cancelled"));
        }

        if amount <= 0 {
            return Err(String::from_slice(&env, "Withdrawal amount must be positive"));
        }

        let current_time = env.ledger().timestamp();
        let vested = Self::get_vested_amount(env.clone(), stream_id.clone(), current_time)?;
        let withdrawable = max(0, vested - stream.withdrawn);

        if amount > withdrawable {
            return Err(String::from_slice(&env, "Insufficient vested balance"));
        }

        // Update stream
        stream.withdrawn += amount;
        env.storage().persistent().set(&stream_id, &stream);

        // Transfer tokens to recipient
        let token_client = token::Client::new(&env, &stream.token);
        token_client.transfer(
            &env.current_contract_address(),
            &stream.recipient,
            &amount,
        );

        Ok(())
    }

    /// Cancel a stream (payer only)
    pub fn cancel_stream(
        env: Env,
        stream_id: String,
    ) -> Result<(), String> {
        let mut stream = Self::get_stream(env.clone(), stream_id.clone())?;

        // Only payer can cancel
        stream.payer.require_auth();

        if stream.is_cancelled {
            return Err(String::from_slice(&env, "Stream is already cancelled"));
        }

        let current_time = env.ledger().timestamp();
        let vested = Self::get_vested_amount(env.clone(), stream_id.clone(), current_time)?;
        let unvested = stream.amount - vested;

        // Mark as cancelled
        stream.is_cancelled = true;
        env.storage().persistent().set(&stream_id, &stream);

        // Return unvested funds to payer
        if unvested > 0 {
            let token_client = token::Client::new(&env, &stream.token);
            token_client.transfer(
                &env.current_contract_address(),
                &stream.payer,
                &unvested,
            );
        }

        Ok(())
    }
}

mod test;
