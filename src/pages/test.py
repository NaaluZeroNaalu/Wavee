import requests
from time import monotonic

API_KEY = "azE6dXNyXzdhNTFjMGM3LTQzM2QtM2YyNS04NjViLWM2YTAyNDY4NDUyZDp1SXBON05pNmlLMVMxQjJhNG05SkV5Q2M3dThDbzJ0Yk1ZQ3pJOUoxK2M0PTp5czRT"
TOKEN_ENDPOINT = "https://iam.platform.saas.ibm.com/siusermgr/api/1.0/apikeys/token"
TOKEN_TTL_SECONDS = 3600


_cached_token = None
_token_expiration = 0

def get_token(token_endpoint: str, api_key: str, token_ttl_seconds: int = 3600) -> str:
    """Fetches and caches a short-lived token."""
    global _cached_token, _token_expiration
    
    now = monotonic()
    if _cached_token and now < _token_expiration:
        return _cached_token
    
    # Choose headers based on endpoint
    if "iam.cloud.ibm.com" in token_endpoint:
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        }
        data = {
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
            "apikey": API_KEY,
        }
        r = requests.post(token_endpoint, data=data, headers=headers)
    else:
        headers = {"Accept": "application/json"}
        r = requests.post(token_endpoint, json={"apikey": API_KEY}, headers=headers)
    
    r.raise_for_status()
    data = r.json()
    tok = data.get("token") or data.get("access_token")
    
    if not tok:
        raise Exception("Auth server did not return a token.")
    
    _cached_token = tok
    _token_expiration = now + token_ttl_seconds
    return tok

def chat_non_stream(query, agent_id, thread_endpoint, token):
    """Send a chat request and get the response."""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    
    body = {
        "message": {
            "role": "user",
            "content": query
        },
        "agent_id": agent_id
    }
    
    params = {
        "stream": "false",
        "multiple_content": "true"
    }
    
    response = requests.post(
        thread_endpoint,
        headers=headers,
        params=params,
        json=body
    )
    
    response.raise_for_status()
    return response.json()


token = get_token(TOKEN_ENDPOINT, API_KEY, TOKEN_TTL_SECONDS)

result = chat_non_stream("What is the biggest planet in solar system", "82319559-e048-44e0-9fb5-02913815e5ca", "https://api.dl.watson-orchestrate.ibm.com/instances/20251006-0640-3363-0052-69324f3d9fa8", token)
print(result)