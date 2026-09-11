// Step 2 of Decap CMS's GitHub OAuth flow: GitHub redirects here with a
// short-lived ?code=. We exchange it server-side for an access token (the
// client secret never reaches the browser) and hand the token back to the
// Decap popup via postMessage, matching the protocol Decap's GitHub
// backend expects from a "netlify-cms-style" OAuth provider.
export default async function handler(req, res) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  const { code, error, error_description: errorDescription } = req.query;

  if (!clientId || !clientSecret) {
    res.status(500).send('Missing GITHUB_OAUTH_CLIENT_ID / GITHUB_OAUTH_CLIENT_SECRET environment variables');
    return;
  }

  if (error) {
    res.status(400).send(renderMessage('error', JSON.stringify({ error, error_description: errorDescription })));
    return;
  }

  if (!code) {
    res.status(400).send('Missing code parameter');
    return;
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      res.status(400).send(renderMessage('error', JSON.stringify(tokenData)));
      return;
    }

    const payload = JSON.stringify({ token: tokenData.access_token, provider: 'github' });
    res.status(200).send(renderMessage('success', payload));
  } catch (err) {
    res.status(500).send(renderMessage('error', JSON.stringify({ error: 'token_exchange_failed', error_description: err.message })));
  }
}

// Decap listens for a "authorizing:github" handshake message, then a
// message beginning with "authorization:github:success:" or ":error:"
// carrying the JSON payload, sent from a popup back to its opener.
//
// This page shows its progress in plain text instead of staying blank,
// because a truly blank popup is impossible to debug remotely: if
// window.opener is null (e.g. GitHub's login pages set a
// Cross-Origin-Opener-Policy header that severs it) or the main window
// never replies, the person looking at the popup can just read why.
function renderMessage(status, payload) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { font: 14px/1.5 system-ui, sans-serif; padding: 24px; color: #1a1a1a; }
      #log div { margin-bottom: 4px; }
      .ok { color: #1a7f37; }
      .err { color: #cf222e; font-weight: 600; }
    </style>
  </head>
  <body>
    <p>Completing GitHub sign-in&hellip;</p>
    <div id="log"></div>
    <script>
      (function() {
        var log = document.getElementById('log');
        function line(text, cls) {
          var div = document.createElement('div');
          if (cls) div.className = cls;
          div.textContent = text;
          log.appendChild(div);
        }

        if (!window.opener) {
          line('window.opener is missing, so this window has no way to send the login result back to the main tab.', 'err');
          line('This usually means the browser cut the connection between this popup and the main window during the redirect through GitHub (a Cross-Origin-Opener-Policy restriction) rather than anything wrong with the token exchange itself, which succeeded.', 'err');
          line('Close this window and reload /admin to try again.');
          return;
        }
        line('window.opener found.', 'ok');

        var replied = false;
        function receiveMessage(message) {
          replied = true;
          line('Received reply from main window at origin ' + message.origin + '. Sending result back...', 'ok');
          try {
            window.opener.postMessage(
              'authorization:github:${status}:${payload.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',
              message.origin
            );
            line('Sent. This window should close automatically.', 'ok');
          } catch (e) {
            line('Failed to post back to the main window: ' + e.message, 'err');
          }
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);

        try {
          window.opener.postMessage('authorizing:github', '*');
          line('Sent handshake to main window, waiting for reply...');
        } catch (e) {
          line('Failed to send handshake to main window: ' + e.message, 'err');
        }

        setTimeout(function() {
          if (!replied) {
            line('No reply from the main window after 5 seconds. It may not be listening, or may have lost track of this popup.', 'err');
          }
        }, 5000);
      })();
    </script>
  </body>
</html>`;
}
