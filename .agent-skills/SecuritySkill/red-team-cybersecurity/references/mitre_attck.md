# MITRE ATT&CK Framework Reference for Red Team Operations

## Overview
MITRE ATT&CK is a globally-accessible knowledge base of adversary tactics and techniques based on real-world observations.

## Key Tactics for Red Team Operations

### TA0001 - Initial Access
- **T1190 - Exploit Public-Facing Application**: Take advantage of vulnerabilities in web applications
- **T1078 - Valid Accounts**: Use credentials to access systems
- **T1566 - Phishing**: Target users through deceptive emails
- **T1095 - Non-Application Layer Protocol**: Use non-standard protocols for C2

### TA0002 - Execution
- **T1059 - Command and Scripting Interpreter**: Use command-line interfaces
- **T1203 - Exploitation for Client Execution**: Exploit software vulnerabilities
- **T1055 - Process Injection**: Inject code into legitimate processes

### TA0003 - Persistence
- **T1053 - Scheduled Task/Job**: Maintain access through scheduled tasks
- **T1543 - Create or Modify System Service**: Install malicious services
- **T1136 - Create Account**: Create new user accounts

### TA0004 - Privilege Escalation
- **T1068 - Exploitation for Privilege Escalation**: Exploit system vulnerabilities
- **T1548 - Abuse Elevation Control Mechanism**: Bypass UAC and other controls

### TA0005 - Defense Evasion
- **T1027 - Obfuscated Files or Information**: Hide malicious code
- **T1112 - Modify Registry**: Modify system registry settings
- **T1140 - Deobfuscate/Decode Files or Information**: Decode hidden payloads

### TA0006 - Credential Access
- **T1003 - OS Credential Dumping**: Extract credentials from system memory
- **T1555 - Credentials from Password Stores**: Extract saved passwords
- **T1557 - Adversary-in-the-Middle**: Intercept network traffic

### TA0007 - Discovery
- **T1018 - Remote System Discovery**: Map network infrastructure
- **T1082 - System Information Discovery**: Gather system details
- **T1046 - Network Service Scanning**: Identify open ports and services

### TA0008 - Lateral Movement
- **T1021 - Remote Services**: Use remote administration tools
- **T1570 - Lateral Tool Transfer**: Move tools between systems
- **T1550 - Use Alternate Authentication Material**: Use stolen tickets or certificates

### TA0009 - Collection
- **T1113 - Screen Capture**: Capture screenshots
- **T1005 - Data from Local System**: Collect files from local storage
- **T1041 - Exfiltration Over C2 Channel**: Transfer data via C2

### TA0011 - Command and Control
- **T1071 - Application Layer Protocol**: Use standard protocols for C2
- **T1095 - Non-Application Layer Protocol**: Use custom protocols
- **T1105 - Ingress Tool Transfer**: Download additional tools

### TA0040 - Impact
- **T1485 - Data Destruction**: Destroy or manipulate data
- **T1491 - Defacement**: Modify web content
- **T1496 - Resource Hijacking**: Use system resources for cryptocurrency mining

## Red Team Mapping Guidelines

### Technique Selection
- Choose techniques relevant to target environment
- Consider threat actor emulation requirements
- Align with defensive capabilities being tested

### Detection Opportunities
- Document expected artifacts and logs
- Identify potential detection points
- Note false positive considerations

### Reporting Standards
- Include ATT&CK technique IDs in findings
- Map techniques to business impact
- Provide remediation guidance per technique

## Common Red Team Tool Mappings

### Cobalt Strike
- **T1059**: Command execution through beacon
- **T1071**: HTTP/HTTPS C2 communications
- **T1105**: Download additional tools

### Metasploit Framework
- **T1190**: Exploit modules for initial access
- **T1068**: Privilege escalation exploits
- **T1055**: Meterpreter process injection

### Empire
- **T1059**: PowerShell execution
- **T1086**: PowerShell execution without powershell.exe
- **T1028**: Windows Remote Management

## Scoring and Prioritization

### Criticality Matrix
- **Critical**: Direct path to domain compromise
- **High**: Privilege escalation or persistence opportunities
- **Medium**: Lateral movement or data collection
- **Low**: Information gathering or low-impact techniques

### Business Impact Assessment
- **Financial**: Potential revenue loss or remediation costs
- **Reputational**: Brand damage or customer trust impact
- **Operational**: Business process disruption
- **Compliance**: Regulatory violation risks
