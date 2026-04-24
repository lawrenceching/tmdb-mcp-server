# Error Codes

This document defines machine-readable error codes returned by API endpoints.

## TVDB Proxy (`/api/tvdb/*`)

Only the missing `TVDB_API_KEY` case returns an explicit machine-readable error code.

When `TVDB_API_KEY` is missing, the response includes:

- `type`: `https://httpwg.org/http-spec/rfc7807.html`
- `title`: `Upstream Connection Failed`
- `status`: `502`
- `detail`: `TVDB proxy request failed. See errorCode for details.`
- `errorCode`: `TVDB_CONFIG_MISSING`

### Error Code Mapping

| errorCode | reason |
| --- | --- |
| `TVDB_CONFIG_MISSING` | Required TVDB config is missing (for example `TVDB_API_KEY` is not set). |

### Notes

- For upstream API responses (non-2xx returned by TVDB), the proxy forwards upstream status/body/headers and does not add `errorCode`.
- Only the missing `TVDB_API_KEY` case masks internal details and returns `errorCode`.
- Operators should use server logs for full root-cause diagnostics.
