# SolanaSwap API Documentation

## Overview

SolanaSwap APIs enable seamless querying of token swap prices, constructing swap transactions, and sending signed transactions. This document outlines the supported endpoints, parameter validation rules, and response formats.

---

## Endpoints

### 1. Query Price

**URL:**

```
GET /api/v1/query_price
```

**Description:**
Fetch the estimated swap price for a given token pair and amount. This endpoint is for querying purposes only and is not used for transaction execution.

**Parameters:**

| Parameter        | Type       | Required | Description                                                                 | Validation Rules                                                                                   |
|------------------|------------|----------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| `inputMint`      | `string`   | Yes      | Solana PublicKey of the input token mint.                                  | Must be a valid Solana PublicKey.                                                                  |
| `outputMint`     | `string`   | Yes      | Solana PublicKey of the output token mint.                                 | Must be a valid Solana PublicKey.                                                                  |
| `inputAmount`    | `string`   | Yes      | The amount of input tokens in base units.                                  | Must be a positive integer between 100 and 10^64.                                                  |
| `slippageBps`    | `number`   | Yes      | Allowed slippage in basis points (bps).                                    | Must be an integer between 1 and 5000.                                                             |
| `swapMode`       | `string`   | Yes      | Indicates whether the swap is "ExactIn" or "ExactOut".                    | Must be either `ExactIn` or `ExactOut`.                                                            |
| `userPublicKey`  | `string`   | Yes      | Solana PublicKey of the user initiating the query.                         | Must be a valid Solana PublicKey.                                                                  |
| `fastMode`       | `boolean`  | No       | Optional flag for faster transaction confirmation.                         | -                                                                                                   |

**Example Request:**

```
GET /api/v1/query_price?inputMint=So11111111111111111111111111111111111111112&outputMint=HDa3zJc12ahykSsBRvgiWzr6WLEByf36yzKKbVvy4gnF&inputAmount=100000000&slippageBps=50&swapMode=ExactIn&userPublicKey=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
```

**Response Format:**

```json
{
    "code": 200,
    "data": {
        "inputMint": "So11111111111111111111111111111111111111112",
        "outputMint": "HDa3zJc12ahykSsBRvgiWzr6WLEByf36yzKKbVvy4gnF",
        "inAmount": "100000000",
        "outAmount": "152463268",
        "slippageBps": 50,
        "userPublicKey": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "priceImpactPct": "0",
        "contextSlot": 295510172
    },
    "msg": ""
}
```

---

### 2. Construct Swap Transaction

**URL:**

```
GET /api/v1/make_swap
```

**Description:**
Generates a transaction for the given swap parameters.

**Parameters:**

| Parameter        | Type       | Required | Description                                                                 | Validation Rules                                                                                   |
|------------------|------------|----------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| `inputMint`      | `string`   | Yes      | Solana PublicKey of the input token mint.                                  | Must be a valid Solana PublicKey.                                                                  |
| `outputMint`     | `string`   | Yes      | Solana PublicKey of the output token mint.                                 | Must be a valid Solana PublicKey.                                                                  |
| `inputAmount`    | `string`   | Yes      | The amount of input tokens in base units.                                  | Must be a positive integer between 100 and 10^64.                                                  |
| `slippageBps`    | `number`   | Yes      | Allowed slippage in basis points (bps).                                    | Must be an integer between 1 and 5000.                                                             |
| `swapMode`       | `string`   | Yes      | Indicates whether the swap is "ExactIn" or "ExactOut".                    | Must be either `ExactIn` or `ExactOut`.                                                            |
| `userPublicKey`  | `string`   | Yes      | Solana PublicKey of the user initiating the swap.                          | Must be a valid Solana PublicKey.                                                                  |
| `fastMode`       | `boolean`  | No       | Optional flag for faster transaction confirmation.                         | -                                                                                                   |

**Example Request:**

```
GET /api/v1/make_swap?inputMint=So11111111111111111111111111111111111111112&outputMint=HDa3zJc12ahykSsBRvgiWzr6WLEByf36yzKKbVvy4gnF&inputAmount=100000000&slippageBps=50&swapMode=ExactIn&userPublicKey=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
```

**Response Format:**

```json
{
    "code": 200,
    "data": "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAHDcb6...",
    "msg": ""
}
```

---

### 3. Send Signed Transaction

**URL:**

```
POST /api/v1/send_swap
```

**Description:**
Submits a signed transaction to the blockchain.

**Parameters:**

| Parameter        | Type       | Required | Description                                                                 | Validation Rules                                                                                   |
|------------------|------------|----------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| `inputMint`      | `string`   | Yes      | Solana PublicKey of the input token mint.                                  | Must be a valid Solana PublicKey.                                                                  |
| `outputMint`     | `string`   | Yes      | Solana PublicKey of the output token mint.                                 | Must be a valid Solana PublicKey.                                                                  |
| `userPublicKey`  | `string`   | Yes      | Solana PublicKey of the user submitting the transaction.                   | Must be a valid Solana PublicKey.                                                                  |
| `signed`         | `string`   | Yes      | Base64-encoded signed transaction.                                         | -                                                                                                   |

**Example Request:**

```
POST /api/v1/send_swap
{
    "inputMint": "So11111111111111111111111111111111111111112",
    "outputMint": "HDa3zJc12ahykSsBRvgiWzr6WLEByf36yzKKbVvy4gnF",
    "userPublicKey": "5HUNFqdPCpvSUphp79kA9yxKu2PPN5tMfeViV248sVLM",
    "signed": "AXsU2C8ptufMEDH0q4OTe8SAlitxj4vMCqwl/0qJtBNN..."
}
```

**Response Format:**

```json
{
    "code": 200,
    "data": {
        "txid": "5NJt4q1...",
        "input": { "mint": "So11111111111111111111111111111111111111112", "amount": "100000000" },
        "output": { "mint": "HDa3zJc12ahykSsBRvgiWzr6WLEByf36yzKKbVvy4gnF", "amount": "152463268" },
        "status": true
    },
    "msg": ""
}
```
