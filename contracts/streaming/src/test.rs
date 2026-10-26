use super::*;
use soroban_sdk::{
    testutils::{Address as _, Ledger},
    token::{StellarAssetClient, TokenClient},
    vec, Address, Env,
};

struct Ctx<'a> {
    env: Env,
    client: StreamingContractClient<'a>,
    token: TokenClient<'a>,
    payer: Address,
    alice: Address,
    bob: Address,
}

fn setup<'a>() -> Ctx<'a> {
    let env = Env::default();
    env.mock_all_auths();
    env.ledger().set_timestamp(1000);
    let admin = Address::generate(&env);
    let sac = env.register_stellar_asset_contract_v2(admin);
    let payer = Address::generate(&env);
    StellarAssetClient::new(&env, &sac.address()).mint(&payer, &10_000);
    let id = env.register_contract(None, StreamingContract);
    let client = StreamingContractClient::new(&env, &id);
    let token = TokenClient::new(&env, &sac.address());
    let alice = Address::generate(&env);
    let bob = Address::generate(&env);
    Ctx { env, client, token, payer, alice, bob }
}

fn create(c: &Ctx) -> u64 {
    c.client.create_stream(
        &c.payer,
        &vec![&c.env, (c.alice.clone(), 60u32), (c.bob.clone(), 40u32)],
        &c.token.address,
        &1000,
        &1000,
        &2000,
    )
}

#[test]
fn vesting_boundaries() {
    assert_eq!(vested_at(1000, 100, 200, 50), 0);
    assert_eq!(vested_at(1000, 100, 200, 100), 0);
    assert_eq!(vested_at(1000, 100, 200, 150), 500);
    assert_eq!(vested_at(1000, 100, 200, 200), 1000);
    assert_eq!(vested_at(1000, 100, 200, 999), 1000);
    assert_eq!(vested_at(10, 0, 3, 1), 3); // floor(10/3)
}

#[test]
fn create_escrows_funds() {
    let c = setup();
    let id = create(&c);
    assert_eq!(id, 1);
    assert_eq!(c.token.balance(&c.payer), 9_000);
    assert_eq!(c.token.balance(&c.client.address), 1_000);
}

#[test]
fn create_rejects_invalid_inputs() {
    let c = setup();
    let t = &c.token.address;
    let one = vec![&c.env, (c.alice.clone(), 100u32)];
    let bad_sum = vec![&c.env, (c.alice.clone(), 60u32), (c.bob.clone(), 30u32)];
    let empty: Vec<(Address, u32)> = vec![&c.env];
    assert_eq!(c.client.try_create_stream(&c.payer, &one, t, &0, &1000, &2000), Err(Ok(Error::InvalidAmount)));
    assert_eq!(c.client.try_create_stream(&c.payer, &one, t, &-5, &1000, &2000), Err(Ok(Error::InvalidAmount)));
    assert_eq!(c.client.try_create_stream(&c.payer, &one, t, &10, &2000, &1000), Err(Ok(Error::InvalidTimes)));
    assert_eq!(c.client.try_create_stream(&c.payer, &one, t, &10, &500, &900), Err(Ok(Error::InvalidTimes)));
    assert_eq!(c.client.try_create_stream(&c.payer, &bad_sum, t, &10, &1000, &2000), Err(Ok(Error::InvalidRecipients)));
    assert_eq!(c.client.try_create_stream(&c.payer, &empty, t, &10, &1000, &2000), Err(Ok(Error::InvalidRecipients)));
}

#[test]
fn create_requires_payer_auth() {
    let env = Env::default(); // no mock_all_auths
    let id = env.register_contract(None, StreamingContract);
    let client = StreamingContractClient::new(&env, &id);
    let p = Address::generate(&env);
    let t = Address::generate(&env);
    let r = vec![&env, (Address::generate(&env), 100u32)];
    assert!(client.try_create_stream(&p, &r, &t, &10, &1000, &2000).is_err());
}

#[test]
fn withdraw_over_time_and_no_double_spend() {
    let c = setup();
    let id = create(&c);
    c.env.ledger().set_timestamp(1500); // 50% vested => alice 300, bob 200
    assert_eq!(c.client.get_withdrawable(&id, &c.alice), 300);
    assert_eq!(c.client.get_withdrawable(&id, &c.bob), 200);
    c.client.withdraw(&id, &c.alice, &300);
    assert_eq!(c.token.balance(&c.alice), 300);
    assert_eq!(c.client.try_withdraw(&id, &c.alice, &1), Err(Ok(Error::NothingToWithdraw)));
    assert_eq!(c.client.try_withdraw(&id, &c.bob, &201), Err(Ok(Error::AmountExceedsWithdrawable)));
    c.env.ledger().set_timestamp(2500);
    c.client.withdraw(&id, &c.alice, &300);
    c.client.withdraw(&id, &c.bob, &400);
    assert_eq!(c.token.balance(&c.alice), 600);
    assert_eq!(c.token.balance(&c.bob), 400);
    assert_eq!(c.token.balance(&c.client.address), 0);
}

#[test]
fn withdraw_before_start_and_non_recipient() {
    let c = setup();
    let id = create(&c);
    assert_eq!(c.client.try_withdraw(&id, &c.alice, &1), Err(Ok(Error::NothingToWithdraw)));
    let stranger = Address::generate(&c.env);
    assert_eq!(c.client.try_withdraw(&id, &stranger, &1), Err(Ok(Error::NotRecipient)));
    assert_eq!(c.client.try_withdraw(&id, &c.alice, &0), Err(Ok(Error::InvalidAmount)));
    assert_eq!(c.client.try_withdraw(&99, &c.alice, &1), Err(Ok(Error::StreamNotFound)));
}

#[test]
fn cancel_refunds_unvested_and_recipients_keep_vested() {
    let c = setup();
    let id = create(&c);
    c.env.ledger().set_timestamp(1250); // 25% vested = 250
    assert_eq!(c.client.cancel_stream(&id), 750);
    assert_eq!(c.token.balance(&c.payer), 9_750);
    assert_eq!(c.client.try_cancel_stream(&id), Err(Ok(Error::AlreadyCancelled)));
    c.env.ledger().set_timestamp(9999); // vesting stays frozen
    assert_eq!(c.client.get_withdrawable(&id, &c.alice), 150);
    c.client.withdraw(&id, &c.alice, &150);
    c.client.withdraw(&id, &c.bob, &100);
    assert_eq!(c.token.balance(&c.client.address), 0);
}
