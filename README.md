# Parcl Arb Bot

Solana OPOS hackathon submission

## TX IDs of the bot

Bot account: `EXdZNfWheWzNZrg53atXSaWqLNtMssdUzB6kNzHxn9Mf`

- TX ID of sample open hedged position: `3pi5YWnofduevUs7pLJ7mWFCnvaJBDUuRhpASu7fDxNAcMVRbZzZ2NNcUEzXoH8Pn7PRUNeBfSR5S7BWXp5ixvd8`
- TX ID of sample closed hedged position: `4XU8nBQ12SzamSWwURduHWXEgwWbBA7SY6MPsTHQfUAXB6ot3qrXweJaSLQFPSiRtgYTCDbvX8GzydXRokcP2czB`

Bot running since ~16:35 Amsterdam time. Open TX: `47vM92ijdEh26VCQzrDgT7rj5C7hR9yAJEnQZxD14aEY7e2vmTzkqoihzQ3FDpwvKoW5BvEhpk8TqEMPidcSt6ic`

Logs:

```
➜  opos-parcl git:(main) ✗ npm run start

> opos-parcl@1.0.0 start /Users/luc/Projects/solana/opos-parcl
> ts-node ./src/index.ts

bigint: Failed to load bindings, pure JS will be used (try npm run rebuild?)

Checking positions...
No open position, maybe open one
Found position with net funding rate of 0.046956618000000006
Opened hedged position with TX ID: 47vM92ijdEh26VCQzrDgT7rj5C7hR9yAJEnQZxD14aEY7e2vmTzkqoihzQ3FDpwvKoW5BvEhpk8TqEMPidcSt6ic

Checking positions...
Has open position, check if we need to close
Current funding rate: 0.046955540000000004
Making profit, continue...

Checking positions...
Has open position, check if we need to close
Current funding rate: 0.046955540000000004
Making profit, continue...

Checking positions...
Has open position, check if we need to close
Current funding rate: 0.046955540000000004
Making profit, continue...

... a while later

Checking positions...
Has open position, check if we need to close
Current funding rate: 0.04411365
Making profit, continue...

... a while later

Checking positions...
Has open position, check if we need to close
Current funding rate: 0.042275441999999996
Making profit, continue...

...

Checking positions...
Has open position, check if we need to close
Current funding rate: 0.042071849999999994
Making profit, continue...

...
```

## Installation

Install dependencies

`npm install`

Then fill out the `.env.example` and rename it to `.env` and run the code with `npm run start`.