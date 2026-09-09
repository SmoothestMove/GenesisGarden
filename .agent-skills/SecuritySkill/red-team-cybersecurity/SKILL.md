---
name: red-team-cybersecurity
description: Comprehensive red team cybersecurity operations including reconnaissance, attack simulation, post-exploitation, and reporting. Use when conducting penetration testing, security assessments, phishing simulations, or adversarial threat emulation exercises.
---

# Red Team Cybersecurity

## Overview

Provides specialized knowledge, workflows, and tools for conducting effective red team cybersecurity operations including ethical hacking, penetration testing, and adversarial threat simulation.

## Core Capabilities

### 1. Reconnaissance and Intelligence Gathering
Conduct comprehensive reconnaissance to identify attack surfaces and gather intelligence:
```bash
# Generate reconnaissance commands
node scripts/recon_automation.cjs target.com subdomain
node scripts/recon_automation.cjs target.com port-scan
node scripts/recon_automation.cjs target.com tech-stack
```

### 2. Social Engineering and Phishing
Create and execute social engineering campaigns:
```bash
# Generate phishing templates
node scripts/phishing_template_generator.cjs credential-harvest "target-company"
node scripts/phishing_template_generator.cjs malware-delivery "target-department"
node scripts/phishing_template_generator.cjs recon-gathering "target-info"
```

### 3. Attack Simulation and Execution
Execute attack chains using MITRE ATT&CK framework techniques. See [references/mitre_attck.md](references/mitre_attck.md) for comprehensive technique mappings.

### 4. Post-Exploitation and Lateral Movement
Maintain persistence and move laterally through target networks using living-off-the-land techniques and custom tools.

### 5. Command and Control Infrastructure
Setup and maintain C2 infrastructure with proper operational security. See [references/tool_reference.md](references/tool_reference.md) for C2 framework configurations.

### 6. Reporting and Documentation
Generate comprehensive reports for stakeholders:
```bash
# Generate report templates
node scripts/report_formatter.cjs executive findings.json
node scripts/report_formatter.cjs technical findings.json
node scripts/report_formatter.cjs remediation findings.json
```

## Engagement Workflow

### Phase 1: Planning and Scoping
1. Define rules of engagement and scope boundaries
2. Conduct threat intelligence analysis
3. Select appropriate attack vectors and techniques
4. Prepare tools and infrastructure

### Phase 2: Reconnaissance
1. **Passive Reconnaissance**: OSINT gathering, public information collection
2. **Active Reconnaissance**: Network mapping, service enumeration, vulnerability scanning
3. **Social Engineering**: Target profiling and campaign planning

### Phase 3: Initial Access
1. Execute phishing campaigns or social engineering
2. Exploit identified vulnerabilities
3. Establish initial foothold in target environment
4. Document access methods and artifacts

### Phase 4: Execution and Lateral Movement
1. Escalate privileges and maintain persistence
2. Move laterally through network segments
3. Achieve defined objectives (data exfiltration, system compromise)
4. Collect evidence and maintain attack timeline

### Phase 5: Reporting and Remediation
1. Generate executive and technical reports
2. Provide specific remediation guidance
3. Conduct debrief with stakeholders
4. Support remediation validation

## Attack Methodology Reference

### MITRE ATT&CK Integration
Map all activities to MITRE ATT&CK techniques for consistent reporting and threat actor emulation. See [references/mitre_attck.md](references/mitre_attck.md) for complete technique library.

### Social Engineering Campaigns
Use structured approach for social engineering:
1. **Target Selection**: Identify high-value targets based on access and influence
2. **Information Gathering**: Collect organizational and personal intelligence
3. **Campaign Design**: Create contextually appropriate attack scenarios
4. **Execution**: Deliver phishing emails, vishing calls, or physical media
5. **Tracking**: Monitor campaign metrics and success rates

### Technical Exploitation
Follow systematic approach for technical attacks:
1. **Vulnerability Identification**: Scan for and validate security weaknesses
2. **Exploit Development**: Create or customize exploits for target environment
3. **Execution**: Deploy exploits with proper operational security
4. **Post-Exploitation**: Establish persistence and lateral movement capabilities

## Tool Selection and Configuration

### Reconnaissance Tools
- **Network Scanning**: Nmap, Masscan for port and service discovery
- **DNS Enumeration**: DNSenum, Subfinder for domain intelligence
- **Web Analysis**: WhatWeb, Dirb for application reconnaissance

### Exploitation Frameworks
- **Metasploit**: Comprehensive exploit framework with extensive module library
- **Empire**: PowerShell-based post-exploitation framework
- **Cobalt Strike**: Commercial C2 framework with advanced capabilities

### Custom Scripts
The skill includes custom scripts for common red team tasks:
- `scripts/phishing_template_generator.cjs` - Generate realistic phishing templates
- `scripts/recon_automation.cjs` - Automate reconnaissance command generation
- `scripts/report_formatter.cjs` - Format findings into professional reports

## Reporting Standards

### Executive Reporting
Focus on business impact and risk communication:
- Use [assets/report_templates/executive_summary.md](assets/report_templates/executive_summary.md) for consistent format
- Include financial impact analysis and compliance implications
- Provide clear, actionable recommendations with ROI analysis

### Technical Reporting
Provide detailed technical findings for security teams:
- Document step-by-step attack reproduction
- Include MITRE ATT&CK technique mappings
- Provide specific configuration changes and patch guidance

### Evidence Management
Maintain proper evidence collection and documentation:
- Preserve attack artifacts and logs
- Document timeline and attack chain
- Provide indicators of compromise for detection

## Operational Security Considerations

### Infrastructure Security
- Use dedicated infrastructure for red team operations
- Implement proper network segmentation and isolation
- Maintain operational security throughout engagement

### Legal and Compliance
- Ensure proper authorization and scope documentation
- Comply with relevant regulations and industry standards
- Maintain attorney-client privilege when applicable

### Team Coordination
- Establish clear communication protocols
- Define escalation procedures and emergency contacts
- Maintain proper chain of custody for evidence

## Resources

### scripts/
Executable code for red team automation and task execution:

- **phishing_template_generator.cjs** - Generates realistic phishing email templates for credential harvesting, malware delivery, and reconnaissance gathering campaigns
- **recon_automation.cjs** - Creates reconnaissance commands for subdomain enumeration, port scanning, technology stack identification, and DNS enumeration
- **report_formatter.cjs** - Formats red team findings into executive, technical, and remediation reports with professional templates

### references/
Comprehensive documentation and reference material:

- **mitre_attck.md** - Complete MITRE ATT&CK framework reference with technique mappings, tool integrations, and scoring matrices for red team operations
- **red_team_methodology.md** - Detailed red team engagement methodology covering planning, reconnaissance, execution, and reporting phases
- **tool_reference.md** - Comprehensive tool reference covering reconnaissance, exploitation, post-exploitation, and C2 frameworks with configuration templates

### assets/
Templates and resources for red team operations:

- **phishing_templates/** - Realistic phishing email templates including HTML credential harvest templates with professional styling and social engineering triggers
- **report_templates/** - Professional report templates including executive summary format with business impact analysis, risk assessment, and strategic recommendations
