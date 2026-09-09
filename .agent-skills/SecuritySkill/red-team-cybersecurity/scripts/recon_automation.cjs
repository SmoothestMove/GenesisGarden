#!/usr/bin/env node

/**
 * Reconnaissance Automation - Automates common red team reconnaissance tasks
 * 
 * Usage: node recon_automation.cjs <target-domain> <recon-type>
 * 
 * Recon types: subdomain, port-scan, tech-stack, dns-enum
 */

async function main() {
  try {
    const args = process.argv.slice(2);
    if (args.length < 2) {
      process.stderr.write("Usage: node recon_automation.cjs <target-domain> <recon-type>\n");
      process.exit(1);
    }

    const [targetDomain, reconType] = args;
    
    const commands = {
      'subdomain': `subfinder -d ${targetDomain} -o subdomains.txt`,
      'port-scan': `nmap -sS -sV -oN ports.txt ${targetDomain}`,
      'tech-stack': `whatweb ${targetDomain} --log-verbose=techstack.txt`,
      'dns-enum': `dnsenum ${targetDomain} -f dns.txt`
    };

    if (!commands[reconType]) {
      process.stderr.write(`Error: Unknown recon type '${reconType}'\n`);
      process.exit(1);
    }

    process.stdout.write(`Success: Generated ${reconType} reconnaissance command\n`);
    process.stdout.write("=== RECONNAISSANCE COMMAND ===\n");
    process.stdout.write(`${commands[reconType]}\n`);
    process.stdout.write("==============================\n");
    process.stdout.write("Note: Execute in controlled environment with proper authorization\n");
    
  } catch (err) {
    process.stderr.write(`Failure: ${err.message}\n`);
    process.exit(1);
  }
}

main();
