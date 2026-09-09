# Red Team Methodology Reference

## Engagement Lifecycle

### Phase 1: Planning and Preparation
- **Rules of Engagement (ROE) Definition**
  - Scope boundaries and exclusions
  - Time windows and notification procedures
  - Stop conditions and emergency contacts
- **Threat Intelligence Gathering**
  - Industry-specific threat actors
  - Recent attack campaigns and techniques
  - Target organization security posture
- **Team Composition and Tools**
  - Red team member roles and responsibilities
  - Tool selection and preparation
  - Infrastructure setup and testing

### Phase 2: Reconnaissance
- **Passive Reconnaissance**
  - OSINT gathering from public sources
  - Social media and employee information
  - Organizational structure and key personnel
- **Active Reconnaissance**
  - Network mapping and service enumeration
  - Vulnerability scanning and assessment
  - Third-party integrations and dependencies

### Phase 3: Initial Access
- **External Attack Vectors**
  - Phishing campaigns and social engineering
  - Web application exploitation
  - Network perimeter attacks
- **Internal Attack Vectors**
  - Physical security testing
  - Insider threat simulation
  - Supply chain attacks

### Phase 4: Execution
- **Attack Chain Development**
  - Multi-vector attack planning
  - Lateral movement path identification
  - Persistence mechanism selection
- **Objective Achievement**
  - Data exfiltration simulation
  - System compromise demonstration
  - Business disruption testing

### Phase 5: Post-Engagement
- **Evidence Collection**
  - Attack path documentation
  - Artifact preservation
  - Timeline reconstruction
- **Reporting and Debrief**
  - Executive summary preparation
  - Technical findings documentation
  - Remediation recommendations

## Attack Simulation Frameworks

### Kill Chain Integration
- **Reconnaissance**: Target identification and vulnerability discovery
- **Weaponization**: Exploit development and payload preparation
- **Delivery**: Attack vector execution and initial compromise
- **Exploitation**: Vulnerability exploitation and code execution
- **Installation**: Persistence mechanisms and backdoor deployment
- **Command & Control**: Communications channel establishment
- **Actions on Objectives**: Mission accomplishment and data exfiltration

### Cyber Kill Chain vs MITRE ATT&CK Mapping
| Kill Chain Phase | ATT&CK Tactics | Key Techniques |
|------------------|----------------|---------------|
| Reconnaissance | Discovery | T1018, T1082, T1046 |
| Weaponization | Resource Development | T1587, T1588, T1593 |
| Delivery | Initial Access | T1190, T1566, T1078 |
| Exploitation | Execution | T1059, T1203, T1055 |
| Installation | Persistence | T1053, T1543, T1136 |
| C2 | Command and Control | T1071, T1095, T1105 |
| Actions | Collection, Impact | T1113, T1005, T1485 |

## Social Engineering Methodology

### Information Gathering
- **Employee Profiling**
  - Job roles and responsibilities
  - Social media presence and connections
  - Organizational hierarchy and relationships
- **Organizational Analysis**
  - Business processes and workflows
  - Communication patterns and platforms
  - Security awareness training status

### Attack Vector Development
- **Phishing Campaigns**
  - Spear phishing targeting key personnel
  - Bulk phishing for broad testing
  - Vishing and smishing alternatives
- **Physical Social Engineering**
  - Tailgating and piggybacking
  - Pretexting and impersonation
  - USB drop attacks

### Campaign Execution
- **Template Development**
  - Contextually relevant messaging
  - Brand impersonation and legitimacy
  - Urgency and authority triggers
- **Delivery Methods**
  - Email phishing with tracking
  - SMS and voice phishing
  - Physical media distribution

## Technical Attack Methodology

### Network Penetration Testing
- **Network Mapping**
  - Subnet enumeration and topology discovery
  - Firewall rule analysis and bypass
  - VPN and remote access testing
- **Host Enumeration**
  - Service fingerprinting and version detection
  - OS identification and configuration analysis
  - Patch level assessment and vulnerability scanning

### Application Security Testing
- **Web Application Testing**
  - OWASP Top 10 vulnerability assessment
  - Authentication and authorization testing
  - API security and parameter manipulation
- **Mobile Application Testing**
  - Binary analysis and reverse engineering
  - Data storage and transmission security
  - Authentication bypass and privilege escalation

### Active Directory Security
- **Domain Enumeration**
  - User and group discovery
  - Service account identification
  - Group policy analysis
- **Privilege Escalation**
  - Kerberos attacks (Golden/Silver tickets)
  - NTLM relay and SMB attacks
  - ACL abuse and delegation exploitation

## Evasion and Stealth Techniques

### Anti-Forensics
- **Log Manipulation**
  - Event log clearing and modification
  - Timestamp alteration and file wiping
  - Process and network connection hiding
- **Memory Protection**
  - In-memory execution and fileless malware
  - Process hollowing and code injection
  - Anti-debugging and sandbox evasion

### Defense Evasion
- **Signature Bypass**
  - Polymorphic and metamorphic code
  - Encryption and encoding techniques
  - Living off the land tactics
- **Behavioral Evasion**
  - Time-based delays and triggers
  - User activity detection and pausing
  - Geolocation and system checks

## Reporting Standards

### Executive Reporting
- **Risk Assessment**
  - Business impact analysis
  - Financial and reputational risk
  - Compliance and regulatory implications
- **Strategic Recommendations**
  - Security program improvements
  - Investment priorities and ROI
  - Long-term security roadmap

### Technical Reporting
- **Detailed Findings**
  - Step-by-step attack reproduction
  - Technical evidence and artifacts
  - Vulnerability details and CVSS scores
- **Remediation Guidance**
  - Specific configuration changes
  - Patch management procedures
  - Monitoring and detection improvements

### Metrics and KPIs
- **Detection Time**: Mean time to detection (MTTD)
- **Response Time**: Mean time to response (MTTR)
- **Coverage**: Percentage of attack paths tested
- **Success Rate**: Percentage of objectives achieved
