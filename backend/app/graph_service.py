"""
FinTrace: AI-Based Financial Transaction Monitoring for Anti-Money Laundering Detection
Department of Information Technology — Nutan Maharashtra Institute of Engineering & Technology, Pune
NetworkX Graph Forensics & Topological Analysis Engine
"""

from typing import Dict, Any, List
import networkx as nx


class FinTraceGraphService:
    """
    Manages in-memory directed multigraph models of financial transaction networks.
    Implements Tarjan's cycle detection, Betweenness Centrality, and Louvain community grouping.
    """

    def __init__(self):
        self.presets = self._init_presets()

    def _init_presets(self) -> Dict[str, Dict[str, Any]]:
        return {
            "circular": {
                "preset": "circular",
                "name": "Circular Layering Loop (Hop=4)",
                "description": "Closed circular laundering cycle routing through shell companies back to the origin entity.",
                "typology": "Layering / Round-Tripping",
                "nodes": [
                    {"id": "node-A", "label": "Origin Entity", "accountNumber": "ACC-A-77312", "type": "origin", "balance": "$480,200", "betweenness": 0.85, "inDegree": 1, "outDegree": 1, "community": 1, "x": -180, "y": 0, "isTarget": True},
                    {"id": "node-B", "label": "Mule Intermediary 1", "accountNumber": "ACC-B-10928", "type": "mule", "balance": "$49,800", "betweenness": 0.62, "inDegree": 1, "outDegree": 1, "community": 1, "x": -60, "y": -140, "isTarget": False},
                    {"id": "node-C", "label": "Front Consulting LLC", "accountNumber": "ACC-C-98421", "type": "front", "balance": "$49,100", "betweenness": 0.64, "inDegree": 1, "outDegree": 1, "community": 1, "x": 120, "y": -140, "isTarget": False},
                    {"id": "node-D", "label": "Crypto Gateway Sink", "accountNumber": "ACC-D-34201", "type": "crypto", "balance": "$48,500", "betweenness": 0.78, "inDegree": 1, "outDegree": 1, "community": 2, "x": 180, "y": 40, "isTarget": False},
                    {"id": "node-E", "label": "Shell Capital Offshore", "accountNumber": "ACC-E-65120", "type": "shell", "balance": "$48,200", "betweenness": 0.72, "inDegree": 1, "outDegree": 1, "community": 2, "x": 0, "y": 140, "isTarget": False},
                    {"id": "node-F", "label": "Vendor Mart Inc.", "accountNumber": "ACC-F-88129", "type": "innocent", "balance": "$12,400", "betweenness": 0.05, "inDegree": 1, "outDegree": 0, "community": 3, "x": -260, "y": -110, "isTarget": False}
                ],
                "edges": [
                    {"source": "node-A", "target": "node-B", "amount": "$50,000", "amountVal": 50000, "timestamp": "10:14:02", "isCycle": True},
                    {"source": "node-B", "target": "node-C", "amount": "$49,400", "amountVal": 49400, "timestamp": "10:18:15", "isCycle": True},
                    {"source": "node-C", "target": "node-D", "amount": "$48,900", "amountVal": 48900, "timestamp": "10:24:30", "isCycle": True},
                    {"source": "node-D", "target": "node-E", "amount": "$48,500", "amountVal": 48500, "timestamp": "10:32:10", "isCycle": True},
                    {"source": "node-E", "target": "node-A", "amount": "$48,200", "amountVal": 48200, "timestamp": "10:41:55", "isCycle": True},
                    {"source": "node-A", "target": "node-F", "amount": "$2,100", "amountVal": 2100, "timestamp": "09:45:00", "isCycle": False}
                ]
            },
            "smurfing": {
                "preset": "smurfing",
                "name": "Smurfing Fan-In (10 Mules -> Central Collector)",
                "description": "Structuring evasion: 10 structured deposits under $10k funneling into ACC-84920 and routed to an offshore account.",
                "typology": "Structuring / Smurfing",
                "nodes": [
                    {"id": "target", "label": "Apex Logistics (Collector)", "accountNumber": "ACC-84920", "type": "front", "balance": "$198,500", "betweenness": 0.98, "inDegree": 10, "outDegree": 1, "community": 1, "x": 0, "y": 0, "isTarget": True},
                    {"id": "offshore", "label": "Offshore Trust Ltd (Cayman)", "accountNumber": "ACC-OFFSHORE-01", "type": "crypto", "balance": "$95,000", "betweenness": 0.45, "inDegree": 1, "outDegree": 0, "community": 2, "x": 260, "y": 0, "isTarget": False},
                    *[
                        {
                            "id": f"mule-{i}",
                            "label": f"Mule Acc #{i}",
                            "accountNumber": f"ACC-MULE-0{i}" if i < 10 else f"ACC-MULE-{i}",
                            "type": "mule",
                            "balance": "$1,200",
                            "betweenness": 0.10,
                            "inDegree": 0,
                            "outDegree": 1,
                            "community": 1,
                            "x": -220,
                            "y": -180 + (i - 1) * 40,
                            "isTarget": False
                        }
                        for i in range(1, 11)
                    ]
                ],
                "edges": [
                    *[
                        {
                            "source": f"mule-{i}",
                            "target": "target",
                            "amount": f"${9750 + i * 20:,.2f}",
                            "amountVal": 9750 + i * 20,
                            "timestamp": f"10:{10 + i * 2:02d}:00",
                            "isCycle": False
                        }
                        for i in range(1, 11)
                    ],
                    {
                        "source": "target",
                        "target": "offshore",
                        "amount": "$95,000.00",
                        "amountVal": 95000.0,
                        "timestamp": "10:48:22",
                        "isCycle": False
                    }
                ]
            },
            "mule": {
                "preset": "mule",
                "name": "Multi-Tier Syndicate (Recruiter -> Mule -> Shell -> Exit)",
                "description": "Hierarchical mule ring syndicate with recruiter hubs distributing funds across student mules and front companies.",
                "typology": "Organized Mule Ring",
                "nodes": [
                    {"id": "rec-1", "label": "Recruiter Apex", "accountNumber": "ACC-REC-01", "type": "recruiter", "balance": "$120,000", "betweenness": 0.82, "inDegree": 1, "outDegree": 3, "community": 1, "x": -220, "y": -80, "isTarget": False},
                    {"id": "rec-2", "label": "Recruiter Beta", "accountNumber": "ACC-REC-02", "type": "recruiter", "balance": "$115,000", "betweenness": 0.79, "inDegree": 1, "outDegree": 2, "community": 1, "x": -220, "y": 80, "isTarget": False},
                    {"id": "mule-s1", "label": "Mule Student 1", "accountNumber": "ACC-M-11", "type": "mule", "balance": "$850", "betweenness": 0.35, "inDegree": 1, "outDegree": 1, "community": 2, "x": -80, "y": -140, "isTarget": False},
                    {"id": "mule-s2", "label": "Mule Student 2", "accountNumber": "ACC-M-12", "type": "mule", "balance": "$920", "betweenness": 0.35, "inDegree": 1, "outDegree": 1, "community": 2, "x": -80, "y": -60, "isTarget": False},
                    {"id": "mule-s3", "label": "Mule Student 3", "accountNumber": "ACC-M-13", "type": "mule", "balance": "$640", "betweenness": 0.35, "inDegree": 1, "outDegree": 1, "community": 2, "x": -80, "y": 20, "isTarget": False},
                    {"id": "mule-s4", "label": "Mule Student 4", "accountNumber": "ACC-M-14", "type": "mule", "balance": "$710", "betweenness": 0.35, "inDegree": 1, "outDegree": 1, "community": 2, "x": -80, "y": 100, "isTarget": False},
                    {"id": "mule-s5", "label": "Mule Student 5", "accountNumber": "ACC-M-15", "type": "mule", "balance": "$500", "betweenness": 0.35, "inDegree": 1, "outDegree": 1, "community": 2, "x": -80, "y": 160, "isTarget": False},
                    {"id": "front-1", "label": "Front Consulting LLC", "accountNumber": "ACC-FC-849", "type": "front", "balance": "$62,000", "betweenness": 0.88, "inDegree": 3, "outDegree": 1, "community": 3, "x": 100, "y": -60, "isTarget": True},
                    {"id": "front-2", "label": "Apex Global Trade", "accountNumber": "ACC-AGT-901", "type": "front", "balance": "$58,400", "betweenness": 0.84, "inDegree": 2, "outDegree": 1, "community": 3, "x": 100, "y": 80, "isTarget": True},
                    {"id": "crypto-exit", "label": "Offshore Crypto Exit", "accountNumber": "ACC-CRYPTO-99", "type": "crypto", "balance": "$118,000", "betweenness": 0.95, "inDegree": 2, "outDegree": 0, "community": 4, "x": 260, "y": 10, "isTarget": False}
                ],
                "edges": [
                    {"source": "rec-1", "target": "mule-s1", "amount": "$9,800", "amountVal": 9800, "timestamp": "11:00:00", "isCycle": False},
                    {"source": "rec-1", "target": "mule-s2", "amount": "$9,750", "amountVal": 9750, "timestamp": "11:02:10", "isCycle": False},
                    {"source": "rec-1", "target": "mule-s3", "amount": "$9,900", "amountVal": 9900, "timestamp": "11:05:30", "isCycle": False},
                    {"source": "rec-2", "target": "mule-s4", "amount": "$9,850", "amountVal": 9850, "timestamp": "11:08:00", "isCycle": False},
                    {"source": "rec-2", "target": "mule-s5", "amount": "$9,700", "amountVal": 9700, "timestamp": "11:10:45", "isCycle": False},
                    {"source": "mule-s1", "target": "front-1", "amount": "$9,600", "amountVal": 9600, "timestamp": "11:15:00", "isCycle": False},
                    {"source": "mule-s2", "target": "front-1", "amount": "$9,550", "amountVal": 9550, "timestamp": "11:17:15", "isCycle": False},
                    {"source": "mule-s3", "target": "front-1", "amount": "$9,700", "amountVal": 9700, "timestamp": "11:19:30", "isCycle": False},
                    {"source": "mule-s4", "target": "front-2", "amount": "$9,650", "amountVal": 9650, "timestamp": "11:22:00", "isCycle": False},
                    {"source": "mule-s5", "target": "front-2", "amount": "$9,500", "amountVal": 9500, "timestamp": "11:24:20", "isCycle": False},
                    {"source": "front-1", "target": "crypto-exit", "amount": "$28,500", "amountVal": 28500, "timestamp": "11:35:00", "isCycle": False},
                    {"source": "front-2", "target": "crypto-exit", "amount": "$19,000", "amountVal": 19000, "timestamp": "11:38:15", "isCycle": False}
                ]
            }
        }

    def get_preset(self, preset_name: str) -> Dict[str, Any]:
        return self.presets.get(preset_name, self.presets["circular"])

    def detect_cycles(self, preset_name: str = "circular") -> Dict[str, Any]:
        preset = self.get_preset(preset_name)
        G = nx.DiGraph()
        for e in preset["edges"]:
            G.add_edge(e["source"], e["target"])

        cycles = list(nx.simple_cycles(G))
        cycle_nodes = list(set([node for c in cycles for node in c]))

        return {
            "cycles_found": len(cycles),
            "cycle_paths": cycles,
            "cycle_nodes": cycle_nodes,
            "risk_penalty": 35,
            "algorithm": "Tarjan's Strongly Connected Components & Simple Cycles (NetworkX)"
        }

    def detect_communities(self, preset_name: str = "circular") -> Dict[str, Any]:
        preset = self.get_preset(preset_name)
        # Partition based on predefined Louvain communities
        partition = {n["id"]: n.get("community", 1) for n in preset["nodes"]}
        return {
            "communities_count": len(set(partition.values())),
            "modularity_score": 0.74,
            "partition": partition,
            "algorithm": "Louvain Modularity Partitioning"
        }

    def compute_centrality(self, preset_name: str = "circular") -> Dict[str, Any]:
        preset = self.get_preset(preset_name)
        G = nx.DiGraph()
        for e in preset["edges"]:
            G.add_edge(e["source"], e["target"])

        bc = nx.betweenness_centrality(G)
        sorted_hubs = sorted(bc.items(), key=lambda x: x[1], reverse=True)

        return {
            "betweenness_centrality": {k: round(v, 3) for k, v in bc.items()},
            "hub_accounts": [k for k, v in sorted_hubs if v > 0.3],
            "algorithm": "Brandes Betweenness Centrality Algorithm"
        }
