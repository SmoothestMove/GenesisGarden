#!/usr/bin/env node

/**
 * Phishing Template Generator - Creates realistic phishing email templates
 * 
 * Usage: node phishing_template_generator.cjs <template-type> <target-info>
 * 
 * Template types: credential-harvest, malware-delivery, recon-gathering
 */

async function main() {
  try {
    const args = process.argv.slice(2);
    if (args.length < 2) {
      process.stderr.write("Usage: node phishing_template_generator.cjs <template-type> <target-info>\n");
      process.exit(1);
    }

    const [templateType, targetInfo] = args;
    
    const templates = {
      'credential-harvest': generateCredentialHarvestTemplate(targetInfo),
      'malware-delivery': generateMalwareDeliveryTemplate(targetInfo),
      'recon-gathering': generateReconTemplate(targetInfo)
    };

    if (!templates[templateType]) {
      process.stderr.write(`Error: Unknown template type '${templateType}'\n`);
      process.exit(1);
    }

    process.stdout.write(`Success: Generated ${templateType} phishing template\n`);
    process.stdout.write("=== EMAIL TEMPLATE ===\n");
    process.stdout.write(templates[templateType]);
    process.stdout.write("=======================\n");
    
  } catch (err) {
    process.stderr.write(`Failure: ${err.message}\n`);
    process.exit(1);
  }
}

function generateCredentialHarvestTemplate(targetInfo) {
  return `Subject: Urgent: Account Security Verification Required

Dear User,

We have detected suspicious activity on your account associated with ${targetInfo}. 
For your protection, we require immediate verification of your credentials.

Please click here to verify your account: [PHISHING_LINK]

This verification is required within 24 hours to prevent account suspension.

Best regards,
Security Team`;
}

function generateMalwareDeliveryTemplate(targetInfo) {
  return `Subject: Important: Updated Security Policy Document

Dear Team,

Please find attached the updated security policy document for ${targetInfo}.
This document contains critical changes that require immediate review.

Download the document here: [MALWARE_LINK]

This update affects all team members and must be reviewed by end of business.

Regards,
IT Security Department`;
}

function generateReconTemplate(targetInfo) {
  return `Subject: Survey: IT Infrastructure Assessment

Dear Administrator,

We are conducting a comprehensive IT infrastructure assessment for ${targetInfo}.
Your participation in this brief survey will help us improve security measures.

Complete the assessment here: [RECON_LINK]

The survey takes approximately 5 minutes and your responses are confidential.

Thank you for your cooperation,
External Audit Team`;
}

main();
