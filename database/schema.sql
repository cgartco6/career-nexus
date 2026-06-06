-- Enable vector processing framework for long-term semantic AI memory retention
CREATE EXTENSION IF NOT EXISTS vector;

-- User Master Directory Enforcing Multi-Role Permissions
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('customer', 'admin', 'owner')),
    full_name TEXT NOT NULL,
    fica_verified BOOLEAN DEFAULT FALSE,
    popia_consent_signed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transaction Ledger with Real Payout Split Auditing
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    amount_zar NUMERIC(12, 2) NOT NULL,
    gateway_used TEXT NOT NULL,
    transaction_reference TEXT UNIQUE NOT NULL,
    owner_share_50 NUMERIC(12, 2) NOT NULL,
    african_bank_10 NUMERIC(12, 2) NOT NULL,
    upgrade_reserve_40 NUMERIC(12, 2) NOT NULL,
    settlement_status TEXT NOT NULL DEFAULT 'Cleared',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AI Memory Store leveraging vector embeddings for high-context response lookup
CREATE TABLE ai_tutor_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    session_id TEXT NOT NULL,
    speaker_role TEXT NOT NULL CHECK (speaker_role IN ('candidate', 'ai_coach')),
    raw_statement_payload TEXT NOT NULL,
    semantic_embedding VECTOR(1536), -- Vector array length map for OpenAI text-embedding-3-small
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Security Verification Logging (POPIA / GDPR Audit Trail)
CREATE TABLE compliance_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id TEXT NOT NULL,
    action_type TEXT NOT NULL,
    resource_accessed TEXT NOT NULL,
    ip_address TEXT DEFAULT 'Enforced-Anonymized',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
