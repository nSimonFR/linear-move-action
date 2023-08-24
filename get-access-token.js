const client_id = "TODO";
const client_secret = "TODO";
const redirect_uri = "ANY_URL_YOU_OWN";
// TODO: Run, connect and get code then set it here and retry
const code = "";

const urlToHref = (baseurl, query) => {
  const url = new URL(baseurl);
  for (const [key, value] of Object.entries(query)) {
    url.searchParams.append(key, value);
  }
  return url.href;
};

if (!code) {
  const query = {
    client_id,
    redirect_uri,
    response_type: "code",
    scope: "read,write",
    actor: "application",
  };

  const href = urlToHref(`https://linear.app/oauth/authorize`, query);

  console.log("Please open:", href, "\nThen set code in code and re-run");
} else {
  const query = {
    code,
    client_id,
    client_secret,
    redirect_uri,
    grant_type: "authorization_code",
  };

  const href = urlToHref(`https://api.linear.app/oauth/token`, query);
  console.log(href);

  fetch(href, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((c) => c.json())
    .then(console.log);
}
