"""
FinTrace: AI-Based Financial Transaction Monitoring for Anti-Money Laundering Detection
Department of Information Technology — Nutan Maharashtra Institute of Engineering & Technology, Pune
Pydantic Schema & Data Contract Models
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class DashboardMetrics(BaseModel):
    monitored_tx_24h: int = 1482910
    flagged_alerts_total: int = 142
    flagged_alerts_breakdown: Dict[str, int] = {"critical": 18, "high": 42, "medium": 82}
    false_positive_reduction_pct: float = -41.4
    detection_recall_pct: float = 92.4
    auc_roc: float = 0.941
    mule_networks_uncovered: int = 7
    accounts_restrained_today: int = 24
    prevented_illicit_volume_usd: float = 14800000.0
    prevented_illicit_volume_inr_crore: float = 123.5
    ingestion_rate_tx_per_sec: int = 45
    avg_scoring_latency_ms: float = 74.2


class StreamControlRequest(BaseModel):
    action: str = Field(..., description="'pause' or 'resume'")


class StreamRateLimitRequest(BaseModel):
    rate: int = Field(..., ge=1, le=200, description="Rate multiplier or transactions per interval")


class PatternInjectionRequest(BaseModel):
    typology: str = Field(..., description="'structuring', 'mule', or 'circular'")
    target_account: Optional[str] = "ACC-84920"


class AlertItem(BaseModel):
    id: str
    account: str
    customer: str
    typology: str
    amount: str
    amount_numeric: float
    score: int
    severity: str
    status: str
    time: str
    flags: List[str]
    txCount: int
    counterparties: int
    kycLevel: str


class CaseActionResponse(BaseModel):
    status: str
    case_id: str
    message: str
    action_timestamp: str
    updated_state: Dict[str, Any]


class AdministrativeHoldRequest(BaseModel):
    account_id: str
    reason: str = "Suspicion of money laundering under Section 12 PMLA"
    hold_type: str = "DEBIT_BLOCK"


class GraphNode(BaseModel):
    id: str
    label: str
    accountNumber: str
    type: str  # origin, mule, front, crypto, innocent, recruiter, shell
    balance: str
    betweenness: float
    inDegree: int
    outDegree: int
    community: int
    x: float
    y: float
    isTarget: bool = False


class GraphEdge(BaseModel):
    source: str
    target: str
    amount: str
    amountVal: float
    timestamp: str
    isCycle: bool = False


class GraphPresetResponse(BaseModel):
    preset: str
    name: str
    description: str
    nodes: List[GraphNode]
    edges: List[GraphEdge]
    typology: str


class CycleDetectionResult(BaseModel):
    cycles_found: int
    cycle_paths: List[List[str]]
    cycle_nodes: List[str]
    risk_penalty: int = 35
    algorithm: str = "Tarjan's Strongly Connected Components & Simple Cycles (NetworkX)"


class CommunityDetectionResult(BaseModel):
    communities_count: int
    modularity_score: float = 0.74
    partition: Dict[str, int]
    algorithm: str = "Louvain Modularity Partitioning"


class CentralityResult(BaseModel):
    betweenness_centrality: Dict[str, float]
    hub_accounts: List[str]
    algorithm: str = "Brandes Betweenness Centrality Algorithm"


class WhatIfRequest(BaseModel):
    amount: float = 9850.0
    velocity: int = 14
    counterparties: int = 12
    dormancy_days: int = 180


class ShapFeatureContribution(BaseModel):
    name: str
    phi: float
    val_str: str
    is_positive: bool


class ShapResponse(BaseModel):
    tx_id: str
    account_id: str
    customer_name: str
    base_value: float = 12.4
    features: List[ShapFeatureContribution]
    calibrated_risk_score: int
    risk_tier: str
    model_version: str = "XGBoost v1.4 + Graph Feature Preprocessor"
    decision_formula: str = "Score = round(100 * (0.40 * P_XGB + 0.35 * S_IF + 0.25 * S_Graph))"


class StrGenerateNarrativeRequest(BaseModel):
    case_id: str = "ALT-2026-9042"
    account_id: str = "ACC-84920"
    customer_name: str = "Apex Logistics Global Pvt Ltd"


class StrValidationResponse(BaseModel):
    is_compliant: bool = True
    validated_checks: List[str]
    schema_version: str = "FIU-IND XML Schema v3.2 / FinCEN SAR 2.0"
    compliance_officer_id: str = "AML-9910"


class FiuGatewaySubmissionResponse(BaseModel):
    status: str = "ACCEPTED"
    acknowledgement_token: str
    filing_timestamp: str
    mTLS_fingerprint: str
    digital_signature_hmac: str


class BenchmarkMetricsResponse(BaseModel):
    recall_pct: float = 92.4
    precision_pct: float = 88.6
    f1_score: float = 0.904
    auc_roc: float = 0.941
    false_positive_reduction_pct: float = 41.1
    false_positive_rate_pct: float = 7.1
    scoring_latency_ms: float = 74.0
    testset_transactions: int = 50000
    comparison_models: List[Dict[str, Any]]
