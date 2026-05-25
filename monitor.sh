#!/bin/bash
# Monitor Stripe and Gmail for payments and abandoned checkouts

USER_EMAIL="mharshithsai123@gmail.com"
OUTREACH_PRO_ID="outreach-pro"

# Search Gmail for abandoned checkouts in the last 15 minutes
# Note: Gmail query "after:" only supports dates, so we just check recent messages
# and filter by time in the script or search query if supported.
# For simplicity, we search for 'abandoned' and check if any are new.

MESSAGES=$(accio-mcp-cli call search_gmail_messages --json "{\"query\": \"abandoned checkout\", \"user_google_email\": \"$USER_EMAIL\", \"page_size\": 5}")

# Logic to parse MESSAGES and check for $500 abandoned checkouts would go here.
# Since we need to run this periodically, we will log results.

echo "$(date): Checked Gmail for abandoned checkouts." >> monitor.log
